import { Fragment, useState, useRef, forwardRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ReactMapGl, {
  Marker,
  FlyToInterpolator,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import useSupercluster from "use-supercluster";

import { getMediaUrl } from "@/lib/getMediaUrl";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const navControlStyle = {
  right: 10,
  top: 10,
  zIndex: 100,
};

const FestivalMap = ({ festivals }) => {
  const router = useRouter();
  const mapRef = useRef();
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 51.974077,
    longitude: 19.451946,
    width: "100vw",
    height: "93vh",
    zoom: 5,
  });

  const points = festivals.map((fest) => ({
    type: "Feature",
    properties: {
      cluster: false,
      festId: fest.id,
      festName: fest.name,
      festSlug: fest.slug,
      festDesc: fest.description,
      festImage: fest.image,
      festCity: fest.location.city,
      festPlace: fest.location.place,
      nextEvent: fest.next_event,
    },
    geometry: {
      type: "Point",
      coordinates: [fest.location.longitude, fest.location.latitude],
    },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 50, maxZoom: 20 },
  });

  return (
    <Fragment>
      <ReactMapGl
        attributionControl
        minZoom={5}
        maxZoom={20}
        {...viewport}
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
        onViewportChange={(viewport) => setViewport(viewport)}
        ref={mapRef}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      >
        <NavigationControl style={navControlStyle} />
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  style={{
                    width: `${15 + (pointCount / points.length) * 30}px`,
                    height: `${15 + (pointCount / points.length) * 30}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );
                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 3,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                  className={classes.pointCount}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={cluster.properties.festId}
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <button
                className="marker-btn"
                onClick={() => {
                  setSelected(cluster);
                  setIsOpen(true);
                }}
              >
                <Image
                  width={20}
                  height={20}
                  alt={`${cluster.properties.festName}`}
                  src="/icons8-metal-music-96.png"
                />
              </button>
            </Marker>
          );
        })}
        {selected && (
          <Dialog
            open={isOpen}
            scroll="body"
            onClose={() => setIsOpen(false)}
            TransitionComponent={Transition}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={classes.closeButton}
            >
              X
            </button>
            <Image
              quality={100}
              alt={selected.properties.festName}
              aria-label="festival-image"
              layout="responsive"
              objectFit="cover"
              objectPosition="center"
              width={833}
              height={469}
              src={getMediaUrl(selected.properties.festImage)}
            />

            <div className={classes.head}>
              <h2
                onClick={() =>
                  router.push(`/tags/${selected.properties.festSlug}`)
                }
              >
                {selected.properties.festName}
              </h2>

              <Typography component="small">
                {selected.properties.festCity}

                {selected.properties.festPlace &&
                  ` - ${selected.properties.festPlace}`}

                <br />
              </Typography>
              {selected.properties.nextEvent ? (
                <Fragment>
                  {selected.properties.nextEvent.date ? (
                    <Typography>
                      <Moment format="DD.MM.YYYY">
                        {selected.properties.nextEvent.date}
                      </Moment>
                    </Typography>
                  ) : (
                    <Typography>
                      <Moment format="DD">
                        {selected.properties.nextEvent.from_date}
                      </Moment>
                      -
                      <Moment format="DD.MM.YYYY">
                        {selected.properties.nextEvent.to_date}
                      </Moment>
                    </Typography>
                  )}
                </Fragment>
              ) : (
                <Typography>Brak daty</Typography>
              )}
            </div>

            <DialogContent dividers className={classes.content}>
              <DialogContentText className={classes.desc}>
                {selected.properties.festDesc}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </ReactMapGl>
    </Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  markerHeading: {
    cursor: "pointer",
  },
  head: {
    padding: "16px 24px",
    "& > h2": {
      cursor: "pointer",
      margin: 0,
      color: theme.palette.primary.main,
    },
    "& > h6": {
      margin: 0,
    },
  },
  desc: {
    marginBottom: 0,
  },
  location: {
    color: theme.palette.text.secondary,
  },
  event: {
    padding: "16px 24px",
  },
  button: {
    margin: "24px 0",
  },
  pointCount: {
    cursor: "pointer",
    color: theme.palette.black.main,
    background: theme.palette.primary.main,
    borderRadius: "50%",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "1.2em",
  },
  event: {
    padding: "16px 24px",
  },
  eventName: {
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "5px 10px",
    fontSize: "1rem",
    zIndex: 100,
    cursor: "pointer",
    background: theme.palette.background.paper,
    border: "none",
    color: theme.palette.primary.main,
  },
}));

export default FestivalMap;

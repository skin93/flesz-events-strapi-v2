import React, { Fragment, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactMapGl, { Marker, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useSupercluster from 'use-supercluster';

import { getMediaUrl } from '@/lib/getMediaUrl';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />;
});

const FestivalMap = ({ festivals }) => {
  const router = useRouter();
  const mapRef = useRef();
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 51.974077,
    longitude: 19.451946,
    width: '100vw',
    height: '93vh',
    zoom: 5,
  });

  const points = festivals.map((fest) => ({
    type: 'Feature',
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
      type: 'Point',
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
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <React.Fragment>
      <ReactMapGl
        minZoom={5}
        maxZoom={20}
        {...viewport}
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        ref={mapRef}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}>
        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;
          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}>
                <div
                  style={{
                    width: `${25 + (pointCount / points.length) * 50}px`,
                    height: `${25 + (pointCount / points.length) * 50}px`,
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
                      transitionDuration: 'auto',
                    });
                  }}
                  className={classes.pointCount}>
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
              offsetLeft={-40}
              offsetTop={-20}>
              <button
                className='marker-btn'
                onClick={() => {
                  setSelected(cluster);
                  setIsOpen(true);
                }}>
                <Image
                  width={40}
                  height={40}
                  alt={`${cluster.properties.festName}`}
                  src='/icons8-metal-music-96.png'
                />
              </button>
            </Marker>
          );
        })}
        {selected && (
          <Dialog
            open={isOpen}
            scroll='body'
            onClose={() => setIsOpen(false)}
            TransitionComponent={Transition}>
            <Image
              quality={100}
              alt={selected.properties.festName}
              aria-label='festival-image'
              layout='responsive'
              objectFit='fill'
              objectPosition='center center'
              width={600}
              height={400}
              src={getMediaUrl(selected.properties.festImage)}
            />

            <div className={classes.head}>
              <h2
                onClick={() =>
                  router.push(`/tags/${selected.properties.festSlug}`)
                }>
                {selected.properties.festName}
              </h2>
              <Typography variant='subtitle2'>
                {selected.properties.festCity} - {selected.properties.festPlace}
              </Typography>
            </div>

            <DialogContent dividers className={classes.content}>
              <DialogContentText className={classes.desc}>
                {selected.properties.festDesc}
              </DialogContentText>
            </DialogContent>
            {selected.properties.nextEvent && (
              <div className={classes.event}>
                <Typography variant='subtitle2'>
                  Najbliższe wydarzenie:
                </Typography>
                <h2>
                  {selected.properties.nextEvent.name} <br />{' '}
                  {selected.properties.nextEvent.date ? (
                    <Fragment>{selected.properties.nextEvent.date}</Fragment>
                  ) : (
                    <Fragment>
                      <Moment format='DD'>
                        {selected.properties.nextEvent.from_date}
                      </Moment>
                      -
                      <Moment format='DD.MM.YYYY'>
                        {selected.properties.nextEvent.to_date}
                      </Moment>
                    </Fragment>
                  )}
                </h2>
                <div className='date'></div>
              </div>
            )}
          </Dialog>
        )}
      </ReactMapGl>
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme) => ({
  markerHeading: {
    cursor: 'pointer',
  },
  head: {
    '& > h2': {
      cursor: 'pointer',
      color: theme.palette.primary.main,
    },
  },
  desc: {
    color: theme.palette.light.main,
  },
  location: {
    color: theme.palette.text.secondary,
  },
  event: {
    padding: '16px 24px',
  },
  button: {
    margin: '24px 0',
  },
  pointCount: {
    cursor: 'pointer',
    color: theme.palette.light.main,
    background: theme.palette.primary.dark,
    borderRadius: '50%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '600',
    fontSize: '1.3em',
  },
}));

export default FestivalMap;

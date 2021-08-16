import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactMapGl, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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

  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 51.973077,
    longitude: 19.451946,
    width: '100vw',
    height: '93vh',
    zoom: 5,
  });

  return (
    <React.Fragment>
      <ReactMapGl
        minZoom={5}
        {...viewport}
        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}>
        {festivals.map((fest) => (
          <Marker
            key={fest.id}
            latitude={fest.location.latitude}
            longitude={fest.location.longitude}
            offsetLeft={-25}
            offsetTop={-12.5}>
            <button
              className='marker-btn'
              onClick={() => {
                setSelected(fest);
                setIsOpen(true);
              }}>
              <Image
                width={25}
                height={25}
                alt={`${fest.name}`}
                src='/icons8-metal-music-96.png'
              />
            </button>
          </Marker>
        ))}
        {selected && (
          <Dialog
            open={isOpen}
            scroll='body'
            onClose={() => setIsOpen(false)}
            TransitionComponent={Transition}>
            <Image
              quality={100}
              alt={selected.name}
              aria-label='festival-image'
              layout='responsive'
              objectFit='fill'
              objectPosition='center center'
              width={600}
              height={400}
              src={getMediaUrl(selected.image)}
            />

            <div className={classes.head}>
              <h2 onClick={() => router.push(`/tags/${selected.slug}`)}>
                {selected.name}
              </h2>
              <Typography variant='subtitle2'>
                {selected.location.city} - {selected.location.place}
              </Typography>
            </div>

            <DialogContent dividers className={classes.content}>
              <DialogContentText className={classes.desc}>
                {selected.description}
              </DialogContentText>
            </DialogContent>
            {selected.next_event && (
              <div className={classes.event}>
                <Typography variant='subtitle2'>
                  Najbliższe wydarzenie:
                </Typography>
                <h2>
                  {selected.next_event.name} <br />{' '}
                  {selected.next_event.date ? (
                    <Fragment>{selected.next_event.date}</Fragment>
                  ) : (
                    <Fragment>
                      <Moment format='DD'>
                        {selected.next_event.from_date}
                      </Moment>
                      -
                      <Moment format='DD.MM.YYYY'>
                        {selected.next_event.to_date}
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
}));

export default FestivalMap;

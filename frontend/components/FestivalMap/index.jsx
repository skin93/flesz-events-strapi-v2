import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactMapGl, { Marker } from 'react-map-gl';

import { getMediaUrl } from '@/lib/getMediaUrl';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Button } from '@material-ui/core';


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
    zoom: 6,
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
            longitude={fest.location.longitude}>
            <button
              className='marker-btn'
              onClick={() => {
                setSelected(fest);
                setIsOpen(true);
              }}>
              <img src='/icons8-metal-music-96.png' />
            </button>
          </Marker>
        ))}
        {selected && (
          <Dialog
            className={classes.container}
            open={isOpen}
            onClose={() => setIsOpen(false)}>
            <Image
              quality={100}
              alt={selected.name}
              aria-label='festival-image'
              layout='responsive'
              objectFit='cover'
              objectPosition='center bottom'
              width={300}
              height={200}
              src={getMediaUrl(selected.image)}
            />
            <div className={classes.body}>
              <h2 className={classes.heading}>{selected.name}</h2>
              <small className={classes.location}>
                {selected.location.city} - {selected.location.place}
              </small>
              <p className={classes.desc}>{selected.description}</p>
              <Button
                onClick={() => router.push(`/tags/${selected.slug}`)}
                className={classes.button}
                color='primary'
                variant='contained'>
                CZYTAJ WIĘCEJ
              </Button>
            </div>
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
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  body: {
    display: 'block',
    padding: '16px 24px',
  },
  heading: {
    margin: 0,
  },
  desc: {
    fontSize: '1rem',
    color: theme.palette.light.main,
  },
  location: {
    color: theme.palette.primary.main,
    fontSize: '.9rem',
    marginBottom: '24px',
  },
  button: {
    margin: '24px 0',
  },
}));

export default FestivalMap;

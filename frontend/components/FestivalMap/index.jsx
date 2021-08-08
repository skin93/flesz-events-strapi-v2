import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Button } from '@material-ui/core';
import { getMediaUrl } from '@/lib/getMediaUrl';

const ICON = icon({
  iconUrl: '/icons8-metal-music-96.png',
  iconSize: [50, 50],
});

const FestivalMap = ({ festivals }) => {
  const router = useRouter();
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  return (
    <React.Fragment>
      <MapContainer
        style={{ width: '100%', height: '100%' }}
        center={[51.973077054179456, 19.451946876844065]}
        zoom={7}
        minZoom={6}
        maxBounds={[
          [48.852449627947756, 14.101818103638223],
          [55.4650129920098, 24.423182822981925],
        ]}>
        <TileLayer
          subdomains='abcd'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
        />
        <ZoomControl position='bottomright' />

        {festivals.map((fest) => (
          <Marker
            eventHandlers={{
              click: () => {
                setSelected(fest);
                setIsOpen(true);
              },
            }}
            key={fest.id}
            icon={ICON}
            position={[fest.location.latitude, fest.location.longitude]}
            animate={true}
          />
        ))}
      </MapContainer>
      <Dialog
        className={classes.container}
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <Image
          layout='responsive'
          objectFit='cover'
          objectPosition='center bottom'
          width={300}
          height={200}
          src={getMediaUrl(selected?.image)}
        />
        <div className={classes.body}>
          <h2 className={classes.heading}>{selected?.name}</h2>
          <small className={classes.location}>
            {selected?.location.city} - {selected?.location.place}
          </small>
          <p className={classes.desc}>{selected?.description}</p>
          <Button
            onClick={() => router.push(`/tags/${selected.slug}`)}
            className={classes.button}
            color='primary'
            variant='contained'>
            CZYTAJ WIĘCEJ
          </Button>
        </div>
      </Dialog>
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

import React from 'react';
import { useRouter } from 'next/router';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { makeStyles } from '@material-ui/core/styles';

const ICON = icon({
  iconUrl: '/icons8-metal-music-96.png',
  iconSize: [50, 50],
});

const FestivalMap = ({ festivals }) => {
  const router = useRouter();
  const classes = useStyles();
  return (
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
          key={fest.id}
          icon={ICON}
          position={[fest.location.latitude, fest.location.longitude]}
          animate={true}>
          <Popup>
            <h1
              className={classes.markerHeading}
              onClick={() => router.push(`/tags/${fest.slug}`)}>
              {fest.name}
            </h1>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

const useStyles = makeStyles({
  markerHeading: {
    cursor: 'pointer',
  },
});

export default FestivalMap;

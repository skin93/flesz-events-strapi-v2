import React from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('@/components/FestivalMap'), {
  ssr: false,
});

import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';

import useSWR from 'swr';
import { ALL_FESTIVALS_QUERY } from '@/lib/queries/festivals/allFestivalsQuery';
import { client } from '@/lib/requestClient';
import { CircularProgress } from '@material-ui/core';

const FestivalMapPage = (props) => {
  const fetcher = async (query) => await client.request(query);

  const q = ALL_FESTIVALS_QUERY;

  const { error, data } = useSWR(q, fetcher, {
    initialData: props.data,
  });

  if (error) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <p>Coś poszło nie tak...</p>
      </div>
    );
  }

  if (!data) {
    return <CircularProgress />;
  }

  return (
    <React.Fragment>
      <Fade in timeout={200}>
        <section
          aria-label='festival-map'
          style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}>
          <div
            id='map'
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
            }}>
            <MapWithNoSSR festivals={data?.festivals} />
          </div>
        </section>
      </Fade>
    </React.Fragment>
  );
};

export async function getServerSideProps() {
  const data = await client.request(ALL_FESTIVALS_QUERY);

  return {
    props: { data },
  };
}

export default FestivalMapPage;

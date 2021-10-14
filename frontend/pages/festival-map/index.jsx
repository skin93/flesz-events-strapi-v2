import React from 'react';
import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('@/components/FestivalMap'), {
  ssr: false,
});

import Fade from '@material-ui/core/Fade';

import useSWR from 'swr';
import { ALL_FESTIVALS_QUERY } from '@/lib/queries/festivals/allFestivalsQuery';
import { fetcher } from '@/lib/fetcher';

import { CircularProgress } from '@material-ui/core';
import SEO from '@/components/SEO';

const FestivalMapPage = (props) => {
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

  if (data) {
    return (
      <React.Fragment>
        <SEO
          meta_title='Festiwalowa mapa Polski'
          meta_description='Sprawdź, czy w Twojej okolicy nie gra coś ciekawego!'
          follow={false}
          keywords='festiwale, mapa, Polska, eventy'
          index={true}
        />
        <Fade in timeout={200}>
          <section aria-label='festival-map'>
            <MapWithNoSSR festivals={data.festivals} />
          </section>
        </Fade>
      </React.Fragment>
    );
  }
};

export async function getServerSideProps() {
  const data = await fetcher(ALL_FESTIVALS_QUERY);

  return {
    props: { data },
  };
}

export default FestivalMapPage;

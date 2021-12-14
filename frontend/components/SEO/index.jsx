import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getMediaUrl } from '@/lib/getMediaUrl';

const SEO = ({
  meta_title,
  og_title,
  meta_description,
  og_description,
  og_type,
  og_locale,
  share_image,
  index,
  follow,
  keywords,
}) => {
  const router = useRouter();
  // const robots = [
  //   index === false ? 'noindex' : '',
  //   follow === false ? 'nofollow' : '',
  // ];
  return (
    <Head>
      <title>
        {meta_title
          ? `${meta_title} | ${process.env.NEXT_PUBLIC_APP_NAME}`
          : process.env.NEXT_PUBLIC_APP_NAME}
      </title>
      <link rel='icon' type='image/png' href='/favicon.ico' />
      <link rel='apple-touch-icon' href='/favicon.ico' />
      <meta
        name='viewport'
        content='minimum-scale=1, initial-scale=1, width=device-width'
      />
      {index && !follow ? <meta name='robots' content='nofollow'/> : <meta name='robots' content='noindex,nofollow'/>  }
      {keywords && <meta name='keywords' content={keywords} />}
      <meta
        name='description'
        content={
          meta_description
            ? meta_description
            : 'Jesteśmy sKoncertowani na muzyce!'
        }
      />
      <link
        rel='canonical'
        href={`${process.env.NEXT_PUBLIC_APP_DOMAIN}${router.asPath}`}
      />
      <meta
        property='og:title'
        content={
          og_title
            ? `${og_title} | ${process.env.NEXT_PUBLIC_APP_NAME}`
            : `${meta_title} | ${process.env.NEXT_PUBLIC_APP_NAME}`
        }
      />
      <meta
        property='og:description'
        content={og_description ? og_description : meta_description}
      />
      <meta property='og:type' content={og_type ? og_type : 'website'} />
      <meta property='og:locale' content={og_locale ? og_locale : 'pl_PL'} />
      <meta
        property='og:url'
        content={`${process.env.NEXT_PUBLIC_APP_DOMAIN}${router.asPath}`}
      />
      <meta
        property='og:site_name'
        content={`${process.env.NEXT_PUBLIC_APP_NAME}`}
      />
      <meta
        property='og:image'
        content={
          share_image
            ? getMediaUrl(share_image.media)
            : 'https://flesz.events/logo-publikacja.png'
        }
      />
      <meta
        property='og:image:secure_url'
        content={
          share_image
            ? getMediaUrl(share_image.media)
            : 'https://flesz.events/logo-publikacja.png'
        }
      />
      <meta property='og:image:type' content='image/png' />
      <meta property='fb:app_id' content={`${process.env.NEXT_PUBLIC_FB_ID}`} />
    </Head>
  );
};

export default SEO;

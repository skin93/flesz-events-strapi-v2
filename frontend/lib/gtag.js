export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING;

export const pageview = (url) => {
  if (process.env.NODE_ENV === 'production') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const event = ({ action, category, label, value }) => {
  if (process.env.NODE_ENV === 'production') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value,
    });
  }
};

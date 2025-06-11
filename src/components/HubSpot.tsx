import Script from 'next/script';

const HUBSPOT_ID = process.env.NEXT_PUBLIC_HUBSPOT_ID;

export const HubSpot = () => {
  if (!HUBSPOT_ID) return;

  return (
    <Script
      id="hubspot"
      src={`//js-eu1.hs-scripts.com/${HUBSPOT_ID}.js`}
      type="text/javascript"
      async
      defer
    />
  );
};

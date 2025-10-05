// lib/ga.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export function makeGaClient() {
  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: process.env.GA4_CLIENT_EMAIL,
      private_key: (process.env.GA4_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
  });
  const property = `properties/${process.env.GA4_PROPERTY_ID}`;
  return { client, property };
}

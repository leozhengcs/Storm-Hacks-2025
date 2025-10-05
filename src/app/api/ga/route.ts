// app/api/ga/route.ts
export const runtime = "nodejs"; // GA SDK needs Node (not Edge)
export const dynamic = "force-dynamic"; // optional, avoid caching in dev

import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

function getClient() {
  const client_email = process.env.GA4_CLIENT_EMAIL;
  const private_key = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const propertyId = process.env.GA4_PROPERTY_ID;

  if (!client_email || !private_key || !propertyId) {
    throw new Error(
      "Missing GA env vars (GA4_CLIENT_EMAIL, GA4_PRIVATE_KEY, GA4_PROPERTY_ID)"
    );
  }

  return {
    client: new BetaAnalyticsDataClient({
      credentials: { client_email, private_key },
    }),
    property: `properties/${propertyId}`,
  };
}

export async function GET() {
  try {
    const { client, property } = getClient();

    const [report] = await client.runReport({
      property,
      dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    });

    const [realtime] = await client.runRealtimeReport({
      property,
      metrics: [{ name: "activeUsers" }],
      dimensions: [{ name: "country" }],
      limit: 5,
    });

    return NextResponse.json({ report, realtime });
  } catch (err: any) {
    // Return JSON error (so your caller never tries to parse HTML)
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}

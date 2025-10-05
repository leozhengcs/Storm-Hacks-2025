import Papa from "papaparse";

/**
 * Convert CSV analytics dataset into chart-ready JSON.
 * @param view 'monthly' | 'weekly'
 * @returns Promise<{ name: string; uv: number; pv: number; amt: number; }[]>
 */
export async function getRevenueData(view: "monthly" | "weekly" = "monthly") {
  const response = await fetch("/data.csv");
  const text = await response.text();

  // Parse CSV
  const { data } = Papa.parse(text, { header: true, dynamicTyping: true });

  // Helper to get time key
  function getKey(ts: string) {
    const date = new Date(ts);
    if (view === "monthly") {
      return date.toLocaleString("default", { month: "short", year: "numeric" }); // e.g. "Jan 2025"
    } else {
      const week = Math.ceil(date.getDate() / 7);
      const month = date.toLocaleString("default", { month: "short" });
      return `${month} W${week}`;
    }
  }

  // Aggregate revenue
  const revenueMap: Record<string, number> = {};
  data.forEach((row: any) => {
    if (row.conversion_action == 'Purchased') {
      const key = getKey(row.timestamp);
      const value = parseFloat(row.cart_value) || 0;
      revenueMap[key] = (revenueMap[key] || 0) + value;
    }
  });

  // Format for Recharts
  const chartData = Object.entries(revenueMap).map(([name, total]) => ({
    name,
    revenue: total,
  }));

  // Sort chronologically
  chartData.sort(
    (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()
  );
  const fixedChartData = chartData.slice(1)
  console.log(fixedChartData)
  return fixedChartData;
}

/**
 * Summarize traffic sources for a pie chart.
 * @returns Promise<{ name: string; value: number; description: string; }[]>
 */
export async function getTrafficSourceData(): Promise<
  { name: string; value: number; description: string }[]
> {
  const response = await fetch("/data.csv"); // or correct path
  const text = await response.text();
  const { data } = Papa.parse(text, { header: true, dynamicTyping: true });

  const sourceMap: Record<string, { total: number; count: number }> = {};

  data.forEach((row: any) => {
    const src = row.traffic_source || "Unknown";
    const val = parseFloat(row.cart_value) || 0;

    if (!sourceMap[src]) sourceMap[src] = { total: 0, count: 0 };
    sourceMap[src].total += val;
    sourceMap[src].count += 1;
  });

  return Object.entries(sourceMap).map(([name, { total, count }]) => ({
    name,
    value: total,
    description: `${name} | $${total.toFixed(
      2
    )} \nSessions: ${count.toLocaleString()}`,
  }));
}

type FunnelDatum = { name: string; value: number; fill: string };

/**
 * Build conversion funnel from CSV analytics data.
 * @returns Promise<FunnelDatum[]>
 */
export async function getFunnelData(): Promise<FunnelDatum[]> {
  const response = await fetch("/data.csv");
  const text = await response.text();
  const { data } = Papa.parse(text, { header: true, dynamicTyping: true });

  const stages = {
    viewed: 0,
    added: 0,
    checkout: 0,
    purchased: 0,
    abandoned: 0,
  };

  data.forEach((row: any) => {
    const action = (row.conversion_action || "").toLowerCase();
    if (action === "viewed product") stages.viewed++;
    else if (action === "added to cart") stages.added++;
    else if (action === "initiated checkout") stages.checkout++;
    else if (action === "purchased") stages.purchased++;
    else if (action === "abandoned cart") stages.abandoned++;
  });

  const base = stages.viewed + stages.added + stages.checkout + stages.purchased + stages.abandoned || 1; // avoid divide by zero

  const funnelData: FunnelDatum[] = [
    { name: "Viewed Product", value: 100, fill: "#8884d8" },
    { name: "Added to Cart", value: ((base - stages.added) / base) * 100, fill: "#83a6ed" },
    { name: "Abandoned Cart", value: ((base - stages.added - stages.abandoned) / base) * 100, fill: "#8dd1e1" },
    { name: "Initiated Checkout", value: ((base - stages.added - stages.abandoned - stages.checkout) / base) * 100, fill: "#82ca9d" },
    { name: "Purchased", value: ((base - stages.added - stages.abandoned - stages.checkout - stages.purchased) / base) * 100, fill: "#a4de6c" },
    
  ];

  return funnelData;
}

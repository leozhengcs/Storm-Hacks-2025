async function getGa() {
  const res = await fetch(`http://localhost:3000/api/ga`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function GA() {
  const data = await getGa();
  {console.log(data)}
  const rows = data.report?.rows ?? [];
  return (
    <main>
      <h1>Top Pages (7 days)</h1>
      <ul>
        {rows.map((r: any) => (
          <li key={r.dimensionValues[0].value}>
            {r.dimensionValues[0].value} — Users: {r.metricValues[0].value},
            Views: {r.metricValues[1].value}
          </li>
        ))}
      </ul>

      <h2>Realtime active users (top countries)</h2>
      <ul>
        {(data.realtime?.rows ?? []).map((r: any, i: number) => (
          <li key={i}>
            {r.dimensionValues[0].value}: {r.metricValues[0].value}
          </li>
        ))}
      </ul>
    </main>
  );
}

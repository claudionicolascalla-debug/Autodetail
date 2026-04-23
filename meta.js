export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const TOKEN = process.env.META_TOKEN;
  const AD_ACCOUNT = process.env.AD_ACCOUNT_ID;
  const SERVICIOS_ID = process.env.CAMPAIGN_SERVICIOS_ID;
  const ACCESORIOS_ID = process.env.CAMPAIGN_ACCESORIOS_ID;
  const BASE = 'https://graph.facebook.com/v25.0';

  const { since, until } = req.query;
  if (!since || !until) {
    return res.status(400).json({ error: 'Faltan parámetros since y until' });
  }

  const timeRange = `{'since':'${since}','until':'${until}'}`;
  const fields = 'adset_name,campaign_name,spend,impressions,clicks,ctr,actions';

  try {
    const [serviciosRes, accesoriosRes, budgetRes] = await Promise.all([
      fetch(`${BASE}/${SERVICIOS_ID}/insights?fields=${fields}&level=adset&time_range=${timeRange}&access_token=${TOKEN}`),
      fetch(`${BASE}/${ACCESORIOS_ID}/insights?fields=${fields}&level=adset&time_range=${timeRange}&access_token=${TOKEN}`),
      fetch(`${BASE}/act_${AD_ACCOUNT}/campaigns?fields=name,status,daily_budget&access_token=${TOKEN}`)
    ]);

    const [serviciosData, accesoriosData, budgetData] = await Promise.all([
      serviciosRes.json(),
      accesoriosRes.json(),
      budgetRes.json()
    ]);

    res.status(200).json({
      servicios: serviciosData.data || [],
      accesorios: accesoriosData.data || [],
      campaigns: budgetData.data || []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

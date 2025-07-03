// 新建 OSM API 代理，支持 lat/lng 查询2公里内主流餐饮店铺
import type { NextApiRequest, NextApiResponse } from 'next';

const OVERPASS_URLS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.fr/api/interpreter',
  'https://overpass.osm.ch/api/interpreter',
];
const AMENITIES = ['cafe', 'restaurant', 'bar', 'pub', 'fast_food', 'bakery'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    return res.status(400).json({ error: 'Missing lat/lng' });
  }
  const query = `
    [out:json];
    (
      node["amenity"~"${AMENITIES.join('|')}"](around:2000,${lat},${lng});
      way["amenity"~"${AMENITIES.join('|')}"](around:2000,${lat},${lng});
      relation["amenity"~"${AMENITIES.join('|')}"](around:2000,${lat},${lng});
    );
    out center;
  `;
  let lastError = null;
  for (const url of OVERPASS_URLS) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      if (data && data.elements) {
        return res.status(200).json(data);
      }
    } catch (e) {
      lastError = e;
      // 尝试下一个节点
    }
  }
  res.status(500).json({ error: 'Failed to fetch OSM data from all endpoints.' });
} 
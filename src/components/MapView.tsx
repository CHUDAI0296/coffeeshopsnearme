'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { shops } from '@/data/shops';

// 修复默认 marker 图标不显示问题
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView() {
  // 只显示有经纬度的店铺
  const validShops = shops.filter(shop => shop.latitude && shop.longitude);
  // 默认中心点（圣何塞市中心）
  const center: [number, number] = [37.335480, -121.893028];
  return (
    <div style={{ width: '100%', height: 650, marginBottom: 32, borderRadius: 12, overflow: 'hidden' }}>
      <MapContainer center={center} zoom={13} style={{ width: '100%', height: '100%' }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {validShops.map(shop => (
          <Marker key={shop.slug} position={[shop.latitude!, shop.longitude!]}> 
            <Popup>
              <strong>{shop.name}</strong><br />
              {shop.address}<br />
              {shop.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 
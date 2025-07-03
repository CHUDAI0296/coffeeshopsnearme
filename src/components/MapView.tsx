'use client';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { shops } from '@/data/shops';
import { useEffect, useRef } from 'react';

// 修复默认 marker 图标不显示问题
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapView({ center, userLocation }: { center?: [number, number], userLocation?: { lat: number, lng: number } }) {
  const validShops = shops.filter(shop => shop.latitude && shop.longitude);
  const defaultCenter: [number, number] = [37.335480, -121.893028];

  // 动态居中组件
  function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center, map]);
    return null;
  }

  return (
    <div className="w-full h-64 md:h-[650px] mb-8 rounded-xl overflow-hidden">
      <MapContainer center={center || defaultCenter} zoom={13} style={{ width: '100%', height: '100%' }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {center && <ChangeView center={center} />}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>You are here</Popup>
          </Marker>
        )}
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
'use client';

import { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { shops, Shop } from '@/data/shops';

const containerStyle = {
  width: '100%',
  height: '100%',
};

interface NearbyShop {
  id: number;
  lat?: number;
  lon?: number;
  center?: {
    lat: number;
    lon: number;
  };
  tags: {
    [key: string]: string;
  };
}

export default function MapView({ 
  center, 
  userLocation,
  nearbyShops,
}: { 
  center?: [number, number]; 
  userLocation?: { lat: number; lng: number };
  nearbyShops?: NearbyShop[],
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  const validShops = shops.filter(shop => shop.latitude && shop.longitude);
  const defaultCenter = { lat: 37.335480, lng: -121.893028 };
  const mapCenter = center ? { lat: center[0], lng: center[1] } : defaultCenter;

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-64 md:h-[650px] mb-8 rounded-xl overflow-hidden flex items-center justify-center bg-gray-200">
        <p>Loading Map...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-64 md:h-[650px] mb-8 rounded-xl overflow-hidden">
      <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={13}>
        {userLocation && (
          <MarkerF
            position={userLocation}
            title="You are here"
            icon={{
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        )}

        {validShops.map(shop => (
          <MarkerF
            key={shop.slug}
            position={{ lat: shop.latitude!, lng: shop.longitude! }}
            title={shop.name}
            onClick={() => {
              setSelectedShop(shop);
            }}
          />
        ))}

        {nearbyShops && nearbyShops.map(shop => {
          const position = {
            lat: shop.lat || shop.center!.lat,
            lng: shop.lon || shop.center!.lon,
          };
          return (
            <MarkerF
              key={`osm-${shop.id}`}
              position={position}
              title={shop.tags.name || 'Nearby Place'}
              icon={{
                url: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png',
                scaledSize: new window.google.maps.Size(32, 32),
              }}
              onClick={() => {
                // Future implementation: show InfoWindow for OSM shops
              }}
            />
          );
        })}

        {selectedShop && selectedShop.latitude && selectedShop.longitude && (
          <InfoWindowF
            position={{ lat: selectedShop.latitude, lng: selectedShop.longitude }}
            onCloseClick={() => {
              setSelectedShop(null);
            }}
            options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
          >
            <div>
              <h3 className="font-bold">{selectedShop.name}</h3>
              <p>{selectedShop.address}</p>
              <p className="text-gray-500">{selectedShop.type}</p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
} 
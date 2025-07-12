"use client";
import { useState } from 'react';
import KeywordFilter from '@/components/KeywordFilter';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function Explore() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyShops, setNearbyShops] = useState<any[]>([]);

  return (
    <>
      <MapView 
        center={userLocation ? [userLocation.lat, userLocation.lng] : undefined} 
        userLocation={userLocation || undefined}
        nearbyShops={nearbyShops}
      />
      <KeywordFilter 
        onUserLocation={setUserLocation} 
        onNearbyShopsFound={setNearbyShops} 
      />
    </>
  );
} 
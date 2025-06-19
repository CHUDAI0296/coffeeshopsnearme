"use client";
import { useState } from 'react';
import { shops, Shop } from '@/data/shops';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

// Haversine 计算两点距离（单位：米）
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371e3; // 地球半径（米）
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const KEYWORDS = [
  'espresso', 'breakfast', 'milk', 'dessert', 'cafe', 'latte', 'cake', 'sandwich', 'bar', 'pub', 'restaurant', 'pastry', 'fruit', 'chocolate', 'beer', 'nightlife', 'lunch', 'dinner', 'fresh', 'bagel', 'bacon', 'choice', 'americano', 'drip', 'ice cream', 'art', 'mocha', 'cappuccino', 'coffee'
];

export default function KeywordFilter() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [onlyNearby, setOnlyNearby] = useState(false);

  // 过滤并排序
  type ShopWithDistance = Shop & { distance?: number | null };
  let filteredShops: ShopWithDistance[] = selectedKeyword
    ? shops.filter(shop =>
        shop.tags.includes(selectedKeyword!) ||
        shop.name.toLowerCase().includes(selectedKeyword!.toLowerCase()) ||
        shop.description.toLowerCase().includes(selectedKeyword!.toLowerCase())
      )
    : shops;

  // 按距离排序
  if (userLocation) {
    filteredShops = filteredShops
      .map(shop => {
        if (shop.latitude && shop.longitude) {
          const distance = getDistance(userLocation.lat, userLocation.lng, shop.latitude, shop.longitude);
          return { ...shop, distance };
        }
        return { ...shop, distance: null };
      })
      .sort((a, b) => {
        if (a.distance == null) return 1;
        if (b.distance == null) return -1;
        return a.distance - b.distance;
      });
  }

  // 附近店铺区块和只看附近逻辑
  const NEARBY_RADIUS = 2000; // 2公里
  let nearbyShops: ShopWithDistance[] = [];
  if (userLocation) {
    nearbyShops = filteredShops.filter(shop => shop.distance != null && shop.distance <= NEARBY_RADIUS);
  }
  let displayShops = filteredShops;
  if (onlyNearby && userLocation) {
    displayShops = nearbyShops;
  }

  // 获取定位
  const handleLocate = () => {
    setLocating(true);
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
      },
      (err) => {
        setLocationError('Failed to get location. Please allow location access.');
        setLocating(false);
      }
    );
  };

  return (
    <>
      {/* 定位按钮区块 */}
      <section className="mb-4 flex items-center gap-4">
        <button
          onClick={handleLocate}
          className="px-4 py-2 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition"
          disabled={locating}
        >
          {locating ? 'Locating...' : 'Find Nearby Shops'}
        </button>
        <label className="flex items-center gap-1 text-sm">
          <input
            type="checkbox"
            checked={onlyNearby}
            onChange={e => setOnlyNearby(e.target.checked)}
            disabled={!userLocation}
          />
          Only Nearby (within 2km)
        </label>
        {userLocation && <span className="text-green-700 font-medium">Location acquired!</span>}
        {locationError && <span className="text-red-600">{locationError}</span>}
      </section>
      {/* 关键词卡片区块 */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-2">Popular Keywords</h2>
        <div className="flex flex-wrap gap-2">
          {KEYWORDS.map(keyword => (
            <button
              key={keyword}
              className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${selectedKeyword === keyword ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
              onClick={() => setSelectedKeyword(selectedKeyword === keyword ? null : keyword)}
            >
              {keyword}
            </button>
          ))}
        </div>
      </section>
      {/* 附近咖啡店区块 */}
      {userLocation && nearbyShops.length > 0 && !onlyNearby && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-green-700">Nearby Coffee Shops (within 2km)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nearbyShops.slice(0, 5).map(shop => (
              <div key={shop.slug} className="bg-green-50 rounded-lg shadow p-4 flex flex-col border border-green-200">
                <img src={shop.image} alt={shop.name} className="rounded mb-3 h-40 object-cover" />
                <h3 className="text-lg font-bold mb-1">{shop.name}</h3>
                <div className="flex items-center mb-1">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-gray-700 font-medium">{shop.rating}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 capitalize">{shop.type}</span>
                </div>
                <div className="text-gray-600 mb-1 flex items-center">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{shop.address}</span>
                  {userLocation && shop.distance != null && (
                    <span className="ml-2 text-xs text-green-700">{shop.distance < 1000 ? `${shop.distance.toFixed(0)} m` : `${(shop.distance/1000).toFixed(2)} km`} away</span>
                  )}
                </div>
                <div className="text-gray-600 mb-1 flex items-center">
                  <FaClock className="mr-1" />
                  <span>{shop.hours}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {shop.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{tag}</span>
                  ))}
                </div>
                <p className="text-gray-700 flex-1">{shop.description}</p>
                <Link href={`/shop/${shop.slug}`} className="mt-3 inline-block text-blue-600 hover:underline font-medium">View Details</Link>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* 店铺列表 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Cafés, Sandwich & Dessert Shops in San Jose</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayShops.map(shop => (
            <div key={shop.slug} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <img src={shop.image} alt={shop.name} className="rounded mb-3 h-40 object-cover" />
              <h3 className="text-lg font-bold mb-1">{shop.name}</h3>
              <div className="flex items-center mb-1">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-gray-700 font-medium">{shop.rating}</span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 capitalize">{shop.type}</span>
              </div>
              <div className="text-gray-600 mb-1 flex items-center">
                <FaMapMarkerAlt className="mr-1" />
                <span>{shop.address}</span>
                {/* 显示距离 */}
                {userLocation && shop.distance != null && (
                  <span className="ml-2 text-xs text-green-700">{shop.distance < 1000 ? `${shop.distance.toFixed(0)} m` : `${(shop.distance/1000).toFixed(2)} km`} away</span>
                )}
              </div>
              <div className="text-gray-600 mb-1 flex items-center">
                <FaClock className="mr-1" />
                <span>{shop.hours}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {shop.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{tag}</span>
                ))}
              </div>
              <p className="text-gray-700 flex-1">{shop.description}</p>
              <Link href={`/shop/${shop.slug}`} className="mt-3 inline-block text-blue-600 hover:underline font-medium">View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
} 
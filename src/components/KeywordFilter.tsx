"use client";
import { useState, useEffect } from 'react';
import { shops, Shop } from '@/data/shops';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Highlight from './Highlight';
import ShopImage from './ShopImage';

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

interface KeywordFilterProps {
  onUserLocation?: (loc: { lat: number; lng: number }) => void;
}

export default function KeywordFilter({ onUserLocation }: KeywordFilterProps) {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [onlyNearby, setOnlyNearby] = useState(false);
  const [search, setSearch] = useState('');
  const [osmShops, setOsmShops] = useState<any[]>([]);
  const [osmLoading, setOsmLoading] = useState(false);
  const [osmError, setOsmError] = useState<string | null>(null);

  // 过滤并排序
  type ShopWithDistance = Shop & { distance?: number | null };
  let filteredShops: ShopWithDistance[] = shops.filter(shop => {
    const searchMatch = search
      ? (
          shop.name.toLowerCase().includes(search.toLowerCase()) ||
          shop.description.toLowerCase().includes(search.toLowerCase()) ||
          shop.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
        )
      : true;
    return searchMatch;
  });

  // 按距离排序
  if (userLocation) {
    filteredShops = filteredShops
      .map(shop => {
        if (shop.latitude && shop.longitude) {
          const distance = getDistance(userLocation.lat, userLocation.lng, shop.latitude, shop.longitude);
          return { ...shop, distance };
        }
        // 不传递distance字段，避免类型冲突
        return { ...shop };
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
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        if (onUserLocation) onUserLocation(loc);
        setLocating(false);
      },
      (err) => {
        setLocationError('Failed to get location. Please allow location access.');
        setLocating(false);
      }
    );
  };

  // 定位后自动请求 OSM 附近店铺
  useEffect(() => {
    if (userLocation) {
      setOsmLoading(true);
      setOsmError(null);
      fetch(`/api/osm?lat=${userLocation.lat}&lng=${userLocation.lng}`)
        .then(res => res.json())
        .then(data => {
          if (data.elements) {
            setOsmShops(data.elements);
          } else {
            setOsmShops([]);
            setOsmError('No shops found nearby.');
          }
          setOsmLoading(false);
        })
        .catch(() => {
          setOsmError('Failed to fetch OSM data.');
          setOsmLoading(false);
        });
    } else {
      setOsmShops([]);
    }
  }, [userLocation]);

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
      {/* 搜索框 */}
      <section className="mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for coffee shops, desserts, bars..."
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </section>
      {/* 附近咖啡店区块 */}
      {userLocation && nearbyShops.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3 text-green-700">Nearby Coffee Shops (within 2km)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyShops.slice(0, 5).map(shop => (
              <div key={shop.slug} className="bg-white rounded-2xl shadow flex flex-col group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl overflow-hidden">
                <div className="flex-1 flex flex-col p-4">
                  <h3 className="text-lg font-bold truncate group-hover:text-green-700 transition-colors mb-1">{shop.name}</h3>
                  <div className="text-gray-500 text-sm mb-1 truncate">{shop.subtitle || shop.tags.join('、')}</div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {shop.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mt-auto">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>{shop.address}</span>
                    {userLocation && shop.distance != null && (
                      <span className="ml-auto">{shop.distance < 1000 ? `${shop.distance.toFixed(0)} m` : `${(shop.distance/1000).toFixed(2)} km`}</span>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <FaClock className="mr-1" />
                    <span>{shop.hours}</span>
                  </div>
                  <a href={`/shop/${shop.slug}`} className="mt-3 inline-block text-green-700 hover:underline font-medium group-hover:text-green-900 transition-colors">View Details</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* 店铺列表 */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4 sm:mb-6">{userLocation ? 'Shops, Cafés & Restaurants Near You' : 'Shops, Cafés & Restaurants in San Jose'}</h2>
        {userLocation && (
          <div className="mb-2 sm:mb-4">
            {osmLoading && <span className="text-gray-500">Loading nearby shops...</span>}
            {osmError && <span className="text-red-600">{osmError}</span>}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {(userLocation ? osmShops : displayShops).map((shop: any) => (
            <div key={shop.id || shop.slug} className="bg-white rounded-2xl shadow flex flex-col group transition-all duration-200 hover:-translate-y-1 hover:shadow-xl overflow-hidden p-3 sm:p-4">
              <div className="flex-1 flex flex-col">
                <h3 className="text-base sm:text-lg font-bold truncate group-hover:text-green-700 transition-colors mb-1">{shop.tags?.name || shop.name || 'Unnamed'}</h3>
                <div className="text-gray-500 text-xs sm:text-sm mb-1 truncate">{shop.tags?.amenity || shop.subtitle || ''}</div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {shop.tags && Object.entries(shop.tags).filter(([k]) => ['cuisine','amenity','shop','category'].includes(k)).map(([k, v]) => (
                    <span key={k} className="bg-gray-100 px-2 py-0.5 rounded text-[10px] sm:text-xs">{String(v)}</span>
                  ))}
                </div>
                <div className="flex items-center text-[11px] sm:text-xs text-gray-400 mt-auto">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{shop.tags?.addr_full || shop.tags?.['addr:street'] || shop.address || ''}</span>
                </div>
                <div className="flex items-center text-[11px] sm:text-xs text-gray-400 mt-1">
                  <FaClock className="mr-1" />
                  <span>{shop.tags?.opening_hours || shop.hours || ''}</span>
                </div>
                {/* 详情按钮优化 */}
                {!userLocation && shop.slug && (
                  <Link href={`/shop/${shop.slug}`} className="mt-2 sm:mt-3 inline-block text-green-700 hover:underline font-medium group-hover:text-green-900 transition-colors text-sm sm:text-base">
                    View Details
                  </Link>
                )}
                {userLocation && (
                  shop.tags?.website ? (
                    <a href={shop.tags.website} target="_blank" rel="noopener noreferrer" className="mt-2 sm:mt-3 inline-block text-green-700 hover:underline font-medium group-hover:text-green-900 transition-colors text-sm sm:text-base">
                      View Details
                    </a>
                  ) : (
                    <span className="mt-2 sm:mt-3 inline-block text-gray-400 cursor-not-allowed text-sm sm:text-base">No Details</span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
} 
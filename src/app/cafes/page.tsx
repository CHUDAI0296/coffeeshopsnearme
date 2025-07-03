import { shops, Shop } from '@/data/shops';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import ShopImage from '@/components/ShopImage';

export default function CafesPage() {
  const cafes = shops.filter((shop: Shop) => shop.type === 'cafe');
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cafés in San Jose</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cafes.map((shop: Shop) => (
          <div
            key={shop.slug}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="relative">
              <ShopImage
                src={shop.image}
                alt={shop.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute bottom-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                {shop.rating.toFixed(1)}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold truncate group-hover:text-green-700 transition-colors">{shop.name}</h3>
                {shop.priceLevel && (
                  <span className="text-gray-500 text-sm ml-2">{shop.priceLevel}</span>
                )}
              </div>
              <div className="text-gray-500 text-sm mb-2 truncate group-hover:text-green-700 transition-colors">
                {shop.subtitle || shop.tags.join('、')}
              </div>
              {shop.features && shop.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {shop.features.map(f => (
                    <span key={f} className="bg-gray-100 px-2 py-0.5 rounded text-xs group-hover:bg-green-100 transition-colors">{f}</span>
                  ))}
                </div>
              )}
              <div className="flex items-center text-xs text-gray-400 mt-auto">
                <span>{shop.address}</span>
                {shop.distance && (
                  <span className="ml-auto">{shop.distance >= 1000 ? `${(shop.distance/1000).toFixed(1)} km` : `${shop.distance} m`}</span>
                )}
              </div>
              <Link
                href={`/shop/${shop.slug}`}
                className="mt-3 inline-block text-green-700 hover:underline font-medium group-hover:text-green-900 transition-colors"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 
import { shops, Shop } from '@/data/shops';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function SandwichShopsPage() {
  const sandwiches = shops.filter((shop: Shop) => shop.type === 'sandwich');
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Sandwich Shops in San Jose</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sandwiches.map((shop: Shop) => (
          <div key={shop.slug} className="bg-white rounded-lg shadow p-4 flex flex-col">
            <img src={shop.image} alt={shop.name} className="rounded mb-3 h-40 object-cover" />
            <h3 className="text-lg font-bold mb-1">{shop.name}</h3>
            <div className="flex items-center mb-1">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-gray-700 font-medium">{shop.rating}</span>
            </div>
            <div className="text-gray-600 mb-1 flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              <span>{shop.address}</span>
            </div>
            <div className="text-gray-600 mb-1 flex items-center">
              <FaClock className="mr-1" />
              <span>{shop.hours}</span>
            </div>
            <p className="text-gray-700 flex-1">{shop.description}</p>
            <Link href={`/shop/${shop.slug}`} className="mt-3 inline-block text-blue-600 hover:underline font-medium">View Details</Link>
          </div>
        ))}
      </div>
    </main>
  );
} 
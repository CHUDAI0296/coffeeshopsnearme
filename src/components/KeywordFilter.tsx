"use client";
import { useState } from 'react';
import { shops, Shop } from '@/data/shops';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const KEYWORDS = [
  'delhi', 'indian', 'flat', 'north', 'beverages',
  ...Array.from(new Set(shops.flatMap(shop => shop.tags)))
];

export default function KeywordFilter() {
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);
  const filteredShops = selectedKeyword
    ? shops.filter(shop =>
        shop.tags.includes(selectedKeyword!) ||
        shop.name.toLowerCase().includes(selectedKeyword!.toLowerCase()) ||
        shop.description.toLowerCase().includes(selectedKeyword!.toLowerCase())
      )
    : shops;

  return (
    <>
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
      {/* Nearby Shops List */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Nearby Cafés, Sandwich & Dessert Shops in San Jose</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShops.map(shop => (
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
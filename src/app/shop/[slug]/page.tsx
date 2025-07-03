import { notFound } from 'next/navigation';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Link from 'next/link';
import { shops } from '@/data/shops';
import ShopImage from '@/components/ShopImage';

export async function generateStaticParams() {
  return shops.map(shop => ({ slug: shop.slug }));
}

export default function ShopDetail({ params }: { params: { slug: string } }) {
  const shop = shops.find(s => s.slug === params.slug);
  if (!shop) return notFound();

  // 菜单数据可选
  const menu = (shop as any).menu || [];

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <ShopImage src={shop.image} alt={shop.name} className="rounded mb-4 w-full h-64 object-cover" />
          <h1 className="text-3xl font-bold mb-2">{shop.name}</h1>
          <div className="flex items-center mb-2">
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
          <div className="flex flex-wrap gap-1 mb-2">
            {shop.tags.map(tag => (
              <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-xs">{tag}</span>
            ))}
          </div>
          <p className="text-gray-700 mb-4">{shop.description}</p>
          {menu.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-2">Menu</h2>
              <ul className="mb-2">
                {menu.map((item: any) => (
                  <li key={item.name} className="mb-1 flex justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-600">{item.price}</span>
                    <span className="text-gray-500 ml-2">{item.desc}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  );
} 
import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel';
import dynamic from 'next/dynamic';
import { shops } from '@/data/shops';
import ShopImage from '@/components/ShopImage';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export const metadata = {
  title: 'San Jose Coffee Shop Guide | Breakfast, Coffee, Sandwiches & Specialty Drinks - Coffee Shops Near Me',
  description: 'Discover the most popular coffee shops, breakfast spots, sandwiches, milk drinks, specialty coffee beans, and local coffee culture in San Jose. Browse menus, user reviews, business hours, and transportation info to find your ideal café nearby.',
  keywords: 'San Jose coffee shop, café guide, breakfast, sandwiches, milk drinks, specialty coffee, coffee beans, coffee culture, nearby coffee, coffee map',
};

export default function Home() {
  // 取评分最高的6家咖啡店（type为cafe，按rating降序）
  const topCafes = shops.filter(s => s.type === 'cafe').sort((a, b) => b.rating - a.rating).slice(0, 6);
  return (
    <main className="min-h-screen bg-gray-50">
      {/* 导航栏 */}
      <nav className="w-full bg-white shadow px-4 py-3 flex items-center justify-between mb-6">
        <Link href="/" className="text-2xl font-bold text-blue-700">Coffee Shops Near Me</Link>
        <Link href="/explore" className="text-blue-600 hover:underline font-medium">Explore</Link>
      </nav>
      {/* 两栏布局：仅轮播+介绍和地图 */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* 左侧：轮播+介绍 */}
        <section>
          <ImageCarousel />
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-2">Find the Best Coffee Shops, Breakfast & Sandwiches in San Jose</h2>
            <p className="text-gray-700">
              Looking for a cozy café, a quick breakfast, or the best espresso and bacon sandwiches in San Jose? Coffee Shops Near Me helps you discover and compare local coffee shops, read reviews, browse menus, and find the perfect spot for your next coffee break. Whether you want milk-based drinks, a hearty breakfast, or a new choice for your daily coffee, we have you covered.
            </p>
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-2">About San Jose Coffee Culture</h2>
            <p className="text-gray-700">
              San Jose boasts a vibrant and diverse coffee culture. Whether you love specialty coffee, third-wave cafés, or classic breakfast with hand-brewed coffee, you'll find your perfect cup here. Many local cafés focus on the origin and roasting of their beans, offering unique flavors and a cozy atmosphere—ideal for friends, business meetings, or relaxing alone.
            </p>
          </section>
        </section>
        {/* 右侧：地图展示 */}
        <section>
          <h2 className="text-xl font-bold mb-4">Coffee Shop Map</h2>
          <MapView />
        </section>
      </div>
      {/* 地图下方内容：单列全宽 */}
      <div className="max-w-7xl mx-auto px-4">
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">Top Rated Coffee Shops</h2>
          <div className="space-y-4">
            {topCafes.map(shop => (
              <div key={shop.slug} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <ShopImage src={shop.image} alt={shop.name} className="rounded mb-3 h-40 object-cover" />
                <h3 className="text-lg font-bold mb-1">{shop.name}</h3>
                <div className="flex items-center mb-1">
                  <span className="text-yellow-500 font-bold mr-2">★ {shop.rating}</span>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 capitalize">{shop.type}</span>
                </div>
                <div className="text-gray-600 mb-1 flex items-center">
                  <span>{shop.address}</span>
                </div>
                <div className="text-gray-600 mb-1 flex items-center">
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
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold">What are some featured coffee shops in San Jose?</h3>
              <p className="text-gray-700">San Jose is home to many cafés specializing in specialty coffee, breakfast sandwiches, and local drinks, such as Choice Café, Milk & Beans, and Bacon Brew.</p>
            </div>
            <div>
              <h3 className="font-semibold">What are the typical opening hours for coffee shops?</h3>
              <p className="text-gray-700">Most coffee shops open from 6:30 AM to 6:00 PM, but hours may vary by location. Please check with the specific shop for details.</p>
            </div>
            <div>
              <h3 className="font-semibold">Can I view menus and reviews online?</h3>
              <p className="text-gray-700">Yes, Coffee Shops Near Me provides online menus and user reviews to help you make the best choice quickly.</p>
            </div>
            <div>
              <h3 className="font-semibold">Are San Jose coffee shops easy to access?</h3>
              <p className="text-gray-700">Most coffee shops are located downtown or in convenient areas, with nearby public transportation such as buses and metro.</p>
            </div>
          </div>
        </section>
        <div className="mt-10 flex justify-center">
          <Link href="/explore" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition">Explore Cafés & More</Link>
        </div>
      </div>
    </main>
  );
} 
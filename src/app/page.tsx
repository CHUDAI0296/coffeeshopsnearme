import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaClock, FaPhone, FaGlobe, FaInstagram, FaFacebook } from 'react-icons/fa';
import ImageCarousel from '@/components/ImageCarousel';

const coffeeShops = [
  {
    name: 'Choice Café',
    slug: 'choice-cafe',
    rating: 4.7,
    address: '123 Main St, San Jose, CA',
    hours: '7:00 AM - 6:00 PM',
    tags: ['espresso', 'breakfast', 'milk', 'bacon'],
    description: 'A popular spot in San Jose for espresso, breakfast, and fresh milk-based drinks. Try our bacon sandwiches!',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop',
  },
  {
    name: 'Milk & Beans',
    slug: 'milk-beans',
    rating: 4.5,
    address: '456 Coffee Ave, San Jose, CA',
    hours: '8:00 AM - 5:00 PM',
    tags: ['milk', 'espresso', 'breakfast'],
    description: 'Known for creamy milk drinks and classic espresso. Perfect for a quick breakfast in San Jose.',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&h=400&fit=crop',
  },
  {
    name: 'Bacon Brew',
    slug: 'bacon-brew',
    rating: 4.8,
    address: '789 Market St, San Jose, CA',
    hours: '6:30 AM - 4:00 PM',
    tags: ['bacon', 'breakfast', 'choice'],
    description: "San Jose's favorite for bacon breakfast sandwiches and specialty coffee. Your best choice for a hearty start!",
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop',
  },
];

export const metadata = {
  title: 'Find Coffee Shops Near You | Best Cafés, Sandwiches & Breakfast in San Jose',
  description: 'Discover the best coffee shops, cafés, sandwiches, milk drinks, breakfast, espresso, and bacon spots near you in San Jose. Compare menus, reviews, and locations to find your perfect coffee experience.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Coffee Shops Near Me - San Jose</h1>
            <nav className="space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/menu" className="text-gray-600 hover:text-gray-900">Menu</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Image Carousel */}
        <ImageCarousel />

        {/* SEO Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">Find the Best Coffee Shops, Breakfast & Sandwiches in San Jose</h2>
          <p className="text-gray-700">
            Looking for a cozy café, a quick breakfast, or the best espresso and bacon sandwiches in San Jose? Coffee Shops Near Me helps you discover and compare local coffee shops, read reviews, browse menus, and find the perfect spot for your next coffee break. Whether you want milk-based drinks, a hearty breakfast, or a new choice for your daily coffee, we have you covered.
          </p>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">Popular Searches</h2>
          <ul className="flex flex-wrap gap-2">
            <li className="bg-gray-100 px-3 py-1 rounded">Coffee near me</li>
            <li className="bg-gray-100 px-3 py-1 rounded">San Jose coffee</li>
            <li className="bg-gray-100 px-3 py-1 rounded">Choice café</li>
            <li className="bg-gray-100 px-3 py-1 rounded">Milk drinks</li>
            <li className="bg-gray-100 px-3 py-1 rounded">Breakfast</li>
            <li className="bg-gray-100 px-3 py-1 rounded">Espresso</li>
            <li className="bg-gray-100 px-3 py-1 rounded">Bacon sandwich</li>
          </ul>
        </section>

        {/* Nearby Coffee Shops List */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Nearby Coffee Shops in San Jose</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coffeeShops.map(shop => (
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
      </div>
    </main>
  );
} 
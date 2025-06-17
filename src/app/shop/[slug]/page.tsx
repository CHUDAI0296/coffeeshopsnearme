import { notFound } from 'next/navigation';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Link from 'next/link';

const coffeeShops = [
  {
    name: 'Choice Café',
    slug: 'choice-cafe',
    rating: 4.7,
    address: '123 Main St, San Jose, CA',
    hours: '7:00 AM - 6:00 PM',
    tags: ['espresso', 'breakfast', 'milk', 'bacon'],
    description: 'A popular spot in San Jose for espresso, breakfast, and fresh milk-based drinks. Try our bacon sandwiches!',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop',
    menu: [
      { name: 'Espresso', price: '$3.50', desc: 'Rich and concentrated coffee shot' },
      { name: 'Bacon Sandwich', price: '$6.00', desc: 'Crispy bacon with fresh bread' },
      { name: 'Milk Latte', price: '$4.00', desc: 'Smooth milk and espresso' },
      { name: 'Breakfast Plate', price: '$8.00', desc: 'Eggs, bacon, toast, and more' },
    ],
  },
  {
    name: 'Milk & Beans',
    slug: 'milk-beans',
    rating: 4.5,
    address: '456 Coffee Ave, San Jose, CA',
    hours: '8:00 AM - 5:00 PM',
    tags: ['milk', 'espresso', 'breakfast'],
    description: 'Known for creamy milk drinks and classic espresso. Perfect for a quick breakfast in San Jose.',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&h=500&fit=crop',
    menu: [
      { name: 'Milk Cappuccino', price: '$4.50', desc: 'Foamy milk and espresso' },
      { name: 'Breakfast Wrap', price: '$7.00', desc: 'Egg, cheese, and ham' },
      { name: 'Espresso', price: '$3.50', desc: 'Classic espresso shot' },
    ],
  },
  {
    name: 'Bacon Brew',
    slug: 'bacon-brew',
    rating: 4.8,
    address: '789 Market St, San Jose, CA',
    hours: '6:30 AM - 4:00 PM',
    tags: ['bacon', 'breakfast', 'choice'],
    description: 'San Jose's favorite for bacon breakfast sandwiches and specialty coffee. Your best choice for a hearty start!',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&h=500&fit=crop',
    menu: [
      { name: 'Bacon Breakfast', price: '$8.50', desc: 'Bacon, eggs, toast, and coffee' },
      { name: 'Choice Espresso', price: '$3.75', desc: 'Signature espresso blend' },
      { name: 'Milk Toast', price: '$4.00', desc: 'Toasted bread with milk' },
    ],
  },
];

export default function ShopDetail({ params }: { params: { slug: string } }) {
  const shop = coffeeShops.find(s => s.slug === params.slug);
  if (!shop) return notFound();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        <div className="bg-white rounded-lg shadow p-6 mt-4">
          <img src={shop.image} alt={shop.name} className="rounded mb-4 w-full h-64 object-cover" />
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
          <h2 className="text-xl font-bold mb-2">Menu</h2>
          <ul className="mb-2">
            {shop.menu.map(item => (
              <li key={item.name} className="mb-1 flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600">{item.price}</span>
                <span className="text-gray-500 ml-2">{item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
} 
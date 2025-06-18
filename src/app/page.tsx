import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel';

export const metadata = {
  title: 'San Jose Coffee Shop Guide | Breakfast, Coffee, Sandwiches & Specialty Drinks - Coffee Shops Near Me',
  description: 'Discover the most popular coffee shops, breakfast spots, sandwiches, milk drinks, specialty coffee beans, and local coffee culture in San Jose. Browse menus, user reviews, business hours, and transportation info to find your ideal café nearby.',
  keywords: 'San Jose coffee shop, café guide, breakfast, sandwiches, milk drinks, specialty coffee, coffee beans, coffee culture, nearby coffee, coffee map',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
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
        {/* San Jose Coffee Culture Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-2">About San Jose Coffee Culture</h2>
          <p className="text-gray-700">
            San Jose boasts a vibrant and diverse coffee culture. Whether you love specialty coffee, third-wave cafés, or classic breakfast with hand-brewed coffee, you'll find your perfect cup here. Many local cafés focus on the origin and roasting of their beans, offering unique flavors and a cozy atmosphere—ideal for friends, business meetings, or relaxing alone.
          </p>
        </section>
        {/* FAQ Section */}
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
        {/* Explore Button */}
        <div className="mt-10 flex justify-center">
          <Link href="/explore" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition">Explore Cafés & More</Link>
        </div>
      </div>
    </main>
  );
} 
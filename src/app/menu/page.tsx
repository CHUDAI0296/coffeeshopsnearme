import { FaCoffee, FaCookie, FaBreadSlice } from 'react-icons/fa';

export default function Menu() {
  const menuItems = {
    coffee: [
      { name: 'Espresso', price: '$3.50', description: 'Rich and concentrated coffee shot' },
      { name: 'Americano', price: '$4.00', description: 'Espresso with hot water' },
      { name: 'Cappuccino', price: '$4.50', description: 'Espresso with steamed milk and foam' },
      { name: 'Latte', price: '$4.75', description: 'Espresso with steamed milk' },
      { name: 'Cold Brew', price: '$4.75', description: 'Slow-steeped cold coffee' },
      { name: 'Pour Over', price: '$5.00', description: 'Hand-brewed single origin coffee' },
    ],
    tea: [
      { name: 'Green Tea', price: '$3.50', description: 'Japanese sencha green tea' },
      { name: 'Earl Grey', price: '$3.50', description: 'Classic black tea with bergamot' },
      { name: 'Chai Latte', price: '$4.50', description: 'Spiced tea with steamed milk' },
      { name: 'Matcha Latte', price: '$5.00', description: 'Japanese green tea powder with milk' },
    ],
    food: [
      { name: 'Avocado Toast', price: '$8.95', description: 'Smashed avocado on artisan bread' },
      { name: 'Breakfast Sandwich', price: '$7.95', description: 'Egg, cheese, and bacon on croissant' },
      { name: 'Quiche', price: '$6.95', description: 'Daily selection of savory quiche' },
      { name: 'Croissant', price: '$3.95', description: 'Buttery, flaky pastry' },
      { name: 'Muffin', price: '$3.50', description: 'Daily selection of fresh-baked muffins' },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Menu</h1>
        
        {/* Coffee Section */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <FaCoffee className="text-2xl text-brown-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Coffee</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.coffee.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <span className="text-gray-600">{item.price}</span>
                </div>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tea Section */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <FaCoffee className="text-2xl text-green-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Tea</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.tea.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <span className="text-gray-600">{item.price}</span>
                </div>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Food Section */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <FaBreadSlice className="text-2xl text-yellow-600 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-900">Food</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.food.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <span className="text-gray-600">{item.price}</span>
                </div>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 
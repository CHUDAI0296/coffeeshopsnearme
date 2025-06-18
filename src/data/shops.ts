export type Shop = {
  name: string;
  slug: string;
  type: string;
  rating: number;
  address: string;
  hours: string;
  tags: string[];
  description: string;
  image: string;
};

export const shops: Shop[] = [
  {
    name: 'Choice Café',
    slug: 'choice-cafe',
    type: 'cafe',
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
    type: 'cafe',
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
    type: 'cafe',
    rating: 4.8,
    address: '789 Market St, San Jose, CA',
    hours: '6:30 AM - 4:00 PM',
    tags: ['bacon', 'breakfast', 'choice'],
    description: "San Jose's favorite for bacon breakfast sandwiches and specialty coffee. Your best choice for a hearty start!",
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&h=400&fit=crop',
  },
  {
    name: 'Sandwich Express',
    slug: 'sandwich-express',
    type: 'sandwich',
    rating: 4.6,
    address: '321 Deli Rd, San Jose, CA',
    hours: '9:00 AM - 7:00 PM',
    tags: ['sandwich', 'lunch', 'fresh'],
    description: 'Freshly made sandwiches with a variety of fillings. Great for a quick lunch or snack.',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=600&h=400&fit=crop',
  },
  {
    name: 'Sweet Moments',
    slug: 'sweet-moments',
    type: 'dessert',
    rating: 4.9,
    address: '555 Dessert Ln, San Jose, CA',
    hours: '10:00 AM - 10:00 PM',
    tags: ['dessert', 'cake', 'pastry', 'coffee'],
    description: 'A dessert shop offering cakes, pastries, and specialty coffee. Perfect for an afternoon treat.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop',
  },
  {
    name: 'Bagel Bros',
    slug: 'bagel-bros',
    type: 'sandwich',
    rating: 4.4,
    address: '888 Bagel St, San Jose, CA',
    hours: '6:00 AM - 2:00 PM',
    tags: ['bagel', 'breakfast', 'sandwich'],
    description: 'Bagel sandwiches and breakfast specials. A local favorite for morning bites.',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?w=600&h=400&fit=crop',
  },
  {
    name: 'Choco Dream',
    slug: 'choco-dream',
    type: 'dessert',
    rating: 4.7,
    address: '777 Chocolate Ave, San Jose, CA',
    hours: '11:00 AM - 11:00 PM',
    tags: ['dessert', 'chocolate', 'cake'],
    description: 'Chocolate cakes, pastries, and drinks. Heaven for chocolate lovers.',
    image: 'https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?w=600&h=400&fit=crop',
  },
  {
    name: 'Night Owl Bar',
    slug: 'night-owl-bar',
    type: 'bar',
    rating: 4.8,
    address: '101 Nightlife Blvd, San Jose, CA',
    hours: '5:00 PM - 2:00 AM',
    tags: ['bar', 'cocktails', 'nightlife'],
    description: 'Trendy bar with creative cocktails and live music. Perfect for a night out in San Jose.',
    image: 'https://images.unsplash.com/photo-1514361892635-cebb9b6c7ca5?w=600&h=400&fit=crop',
  },
  {
    name: 'The Pub House',
    slug: 'the-pub-house',
    type: 'pub',
    rating: 4.5,
    address: '202 Pub St, San Jose, CA',
    hours: '4:00 PM - 1:00 AM',
    tags: ['pub', 'beer', 'nightlife'],
    description: 'Classic pub with a wide selection of beers and a cozy atmosphere. Great for groups and late-night snacks.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop',
  },
  {
    name: 'Midnight Dine',
    slug: 'midnight-dine',
    type: 'restaurant',
    rating: 4.6,
    address: '303 Late Ave, San Jose, CA',
    hours: '6:00 PM - 3:00 AM',
    tags: ['restaurant', 'dinner', 'nightlife'],
    description: 'Late-night restaurant serving dinner, snacks, and drinks. Open until 3 AM for night owls.',
    image: 'https://images.unsplash.com/photo-1504674900247-eca47b84c8e8?w=600&h=400&fit=crop',
  },
]; 
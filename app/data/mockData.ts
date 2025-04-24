import { Order } from '~/types';

// Users data
export const users = [
  {
    id: '1',
    name: 'Nick Fury',
    role: 'Admin',
    region: null, // Global access
  },
  {
    id: '2',
    name: 'Captain Marvel',
    role: 'Manager',
    region: 'India',
  },
  {
    id: '3',
    name: 'Captain America',
    role: 'Manager',
    region: 'America',
  },
  {
    id: '4',
    name: 'Thanos',
    role: 'Member',
    region: 'India',
  },
  {
    id: '5',
    name: 'Thor',
    role: 'Member',
    region: 'India',
  },
  {
    id: '6',
    name: 'Travis',
    role: 'Member',
    region: 'America',
  },
];

// Restaurants data
export const restaurants = [
  // Indian Restaurants
  {
    id: '1',
    name: 'Spice Garden',
    cuisine: 'North Indian',
    region: 'India',
    imageUrl: '/images/restaurants/spice-garden.jpg',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Dosa House',
    cuisine: 'South Indian',
    region: 'India',
    imageUrl: '/images/restaurants/dosa-house.jpg',
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Mumbai Street Food',
    cuisine: 'Street Food',
    region: 'India',
    imageUrl: '/images/restaurants/mumbai-street.jpg',
    rating: 4.3,
  },

  // American Restaurants
  {
    id: '4',
    name: 'Burger Kingdom',
    cuisine: 'Fast Food',
    region: 'America',
    imageUrl: '/images/restaurants/burger-kingdom.jpg',
    rating: 4.1,
  },
  {
    id: '5',
    name: 'Texas BBQ',
    cuisine: 'Barbecue',
    region: 'America',
    imageUrl: '/images/restaurants/texas-bbq.jpg',
    rating: 4.6,
  },
  {
    id: '6',
    name: 'Manhattan Pizza',
    cuisine: 'Italian-American',
    region: 'America',
    imageUrl: '/images/restaurants/manhattan-pizza.jpg',
    rating: 4.0,
  },
];

// Menu items data
export const menuItems = [
  // Spice Garden (Indian Restaurant) - ID 1
  {
    id: '101',
    restaurantId: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a creamy tomato sauce.',
    price: 14.99,
    imageUrl: '/images/menu/butter-chicken.jpg',
  },
  {
    id: '102',
    restaurantId: '1',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection.',
    price: 12.99,
    imageUrl: '/images/menu/paneer-tikka.jpg',
  },
  {
    id: '103',
    restaurantId: '1',
    name: 'Vegetable Biryani',
    description: 'Fragrant rice cooked with mixed vegetables and spices.',
    price: 11.99,
    imageUrl: '/images/menu/veg-biryani.jpg',
  },

  // Dosa House (Indian Restaurant) - ID 2
  {
    id: '201',
    restaurantId: '2',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato filling.',
    price: 9.99,
    imageUrl: '/images/menu/masala-dosa.jpg',
  },
  {
    id: '202',
    restaurantId: '2',
    name: 'Idli Sambar',
    description: 'Steamed rice cakes served with lentil soup and chutney.',
    price: 8.99,
    imageUrl: '/images/menu/idli-sambar.jpg',
  },
  {
    id: '203',
    restaurantId: '2',
    name: 'Uttapam',
    description: 'Thick rice pancake topped with vegetables.',
    price: 10.99,
    imageUrl: '/images/menu/uttapam.jpg',
  },

  // Mumbai Street Food (Indian Restaurant) - ID 3
  {
    id: '301',
    restaurantId: '3',
    name: 'Pav Bhaji',
    description: 'Spiced vegetable mash served with buttered bread rolls.',
    price: 8.99,
    imageUrl: '/images/menu/pav-bhaji.jpg',
  },
  {
    id: '302',
    restaurantId: '3',
    name: 'Vada Pav',
    description: 'Spicy potato fritter in a bun with chutneys.',
    price: 5.99,
    imageUrl: '/images/menu/vada-pav.jpg',
  },
  {
    id: '303',
    restaurantId: '3',
    name: 'Bhel Puri',
    description: 'Puffed rice with vegetables and tangy tamarind sauce.',
    price: 6.99,
    imageUrl: '/images/menu/bhel-puri.jpg',
  },

  // Burger Kingdom (American Restaurant) - ID 4
  {
    id: '401',
    restaurantId: '4',
    name: 'Classic Cheeseburger',
    description: 'Beef patty with cheese, lettuce, tomato, and special sauce.',
    price: 12.99,
    imageUrl: '/images/menu/cheeseburger.jpg',
  },
  {
    id: '402',
    restaurantId: '4',
    name: 'BBQ Bacon Burger',
    description: 'Burger with bacon, cheddar, and BBQ sauce.',
    price: 14.99,
    imageUrl: '/images/menu/bbq-burger.jpg',
  },
  {
    id: '403',
    restaurantId: '4',
    name: 'Loaded Fries',
    description: 'Crispy fries topped with cheese, bacon, and sour cream.',
    price: 7.99,
    imageUrl: '/images/menu/loaded-fries.jpg',
  },

  // Texas BBQ (American Restaurant) - ID 5
  {
    id: '501',
    restaurantId: '5',
    name: 'Smoked Brisket',
    description: 'Slow-smoked beef brisket with house BBQ sauce.',
    price: 18.99,
    imageUrl: '/images/menu/brisket.jpg',
  },
  {
    id: '502',
    restaurantId: '5',
    name: 'Rack of Ribs',
    description: 'Fall-off-the-bone pork ribs with dry rub.',
    price: 22.99,
    imageUrl: '/images/menu/ribs.jpg',
  },
  {
    id: '503',
    restaurantId: '5',
    name: 'Mac and Cheese',
    description: 'Creamy four-cheese macaroni with a crispy top.',
    price: 8.99,
    imageUrl: '/images/menu/mac-cheese.jpg',
  },

  // Manhattan Pizza (American Restaurant) - ID 6
  {
    id: '601',
    restaurantId: '6',
    name: 'New York Cheese Pizza',
    description: 'Classic thin-crust pizza with tomato sauce and mozzarella.',
    price: 15.99,
    imageUrl: '/images/menu/cheese-pizza.jpg',
  },
  {
    id: '602',
    restaurantId: '6',
    name: 'Pepperoni Supreme',
    description: 'Pizza loaded with pepperoni, bell peppers, and onions.',
    price: 17.99,
    imageUrl: '/images/menu/pepperoni-pizza.jpg',
  },
  {
    id: '603',
    restaurantId: '6',
    name: 'Garlic Knots',
    description: 'Baked dough knots brushed with garlic butter and herbs.',
    price: 6.99,
    imageUrl: '/images/menu/garlic-knots.jpg',
  },
];

// Payment methods data
export const paymentMethods = [
  {
    id: 'pm1',
    userId: '1', // Nick Fury (Admin)
    type: 'Credit Card',
    lastFour: '1234',
    default: true,
  },
  {
    id: 'pm2',
    userId: '1', // Nick Fury (Admin)
    type: 'Debit Card',
    lastFour: '5678',
    default: false,
  },
  {
    id: 'pm3',
    userId: '2', // Captain Marvel (Manager-India)
    type: 'Credit Card',
    lastFour: '2468',
    default: true,
  },
  {
    id: 'pm4',
    userId: '3', // Captain America (Manager-America)
    type: 'Credit Card',
    lastFour: '1357',
    default: true,
  },
  {
    id: 'pm5',
    userId: '4', // Thanos (Member-India)
    type: 'Debit Card',
    lastFour: '9876',
    default: true,
  },
  {
    id: 'pm6',
    userId: '5', // Thor (Member-India)
    type: 'Credit Card',
    lastFour: '4321',
    default: true,
  },
  {
    id: 'pm7',
    userId: '6', // Travis (Member-America)
    type: 'Debit Card',
    lastFour: '8765',
    default: true,
  },
];

// Orders data (initial empty state)
export const orders: Order[] = [];

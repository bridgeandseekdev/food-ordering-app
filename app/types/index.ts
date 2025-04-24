export type UserRole = 'Admin' | 'Manager' | 'Member';
export type Region = 'India' | 'America';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  region: Region;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  region: Region;
  imageUrl: string;
  rating: number;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: string;
  lastFour: string;
  default: boolean;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  region: Region;
  items: OrderItem[];
  status: 'pending' | 'completed' | 'cancelled';
  total: number;
  paymentMethodId: string;
  createdAt: string;
}

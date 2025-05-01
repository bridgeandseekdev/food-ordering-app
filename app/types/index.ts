export type UserRole = 'Admin' | 'Manager' | 'Member';
export type Region = 'India' | 'America' | null;

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

export interface CartItem {
  menuItemId: string;
  quantity: number;
  menuItem: MenuItem;
}

export interface PaymentMethod {
  id: string;
  userId: string;
  type: string;
  lastFour: string;
  default: boolean;
}

interface OrderItem {
  menuItemId: string;
  quantity: number;
  menuItem: MenuItem;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  items: OrderItem[];
  status: 'pending' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentMethodId: string;
  createdAt: string;
  region: Region;
}

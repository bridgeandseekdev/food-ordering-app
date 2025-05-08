// src/routes/home/orders/index.tsx
import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { useUser } from '~/context/UserContext';
import { orders, restaurants } from '~/data/mockData';
import { Order, Restaurant } from '~/types';

export default function OrdersList() {
  const { currentUser, canAccessRegion } = useUser();
  const [filteredOrders, setFilteredOrders] = useState<
    (Order & { restaurant: Restaurant })[]
  >([]);

  useEffect(() => {
    if (!currentUser) return;

    // Filter orders based on user's access
    const userOrders = orders
      .filter((order) => {
        // Admin can see all orders
        if (currentUser.role === 'Admin') return true;

        // Others can only see orders from their region
        const restaurant = restaurants.find((r) => r.id === order.restaurantId);
        if (!restaurant) return false;

        return canAccessRegion(restaurant.region);
      })
      .map((order) => {
        const restaurant = restaurants.find((r) => r.id === order.restaurantId);
        return {
          ...order,
          restaurant: restaurant!,
        };
      });

    setFilteredOrders(userOrders);
  }, [currentUser, canAccessRegion]);

  if (!currentUser) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

      {filteredOrders.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-foreground/50">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Link
              key={order.id}
              to={`/home/orders/${order.id}`}
              className="block bg-card border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium mb-2">
                    Order from {order.restaurant.name}
                  </div>
                  <div className="text-sm text-foreground/70 mb-1">
                    {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                  <div className="text-sm text-foreground/70">
                    {order.items.length} items • ${order.totalAmount.toFixed(2)}
                  </div>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

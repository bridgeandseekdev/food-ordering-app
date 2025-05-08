import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@remix-run/react';
import { useUser } from '~/context/UserContext';
import { orders, restaurants, paymentMethods } from '~/data/mockData';
import { Order, Restaurant, PaymentMethod } from '~/types';

export default function OrderDetails() {
  const { id } = useParams();
  const { currentUser, canAccessRegion, hasPermission } = useUser();
  const navigate = useNavigate();

  const [order, setOrder] = useState<Order | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !currentUser) return;
    const foundOrder = orders.find((order) => order.id === id);
    if (!foundOrder) {
      setError('Order not found');
      return;
    }

    const foundRestaurant = restaurants.find(
      (restaurant) => restaurant.id === foundOrder.restaurantId,
    );
    if (!foundRestaurant) {
      setError('Restaurant not found');
      return;
    }

    if (foundRestaurant.region && !canAccessRegion(foundRestaurant.region)) {
      setError('You do not have access to this restaurant');
      return;
    }

    setOrder(foundOrder);
    setRestaurant(foundRestaurant);

    const foundPaymentMethod = paymentMethods.find(
      (method) => method.id === foundOrder.paymentMethodId,
    );
    if (foundPaymentMethod) {
      setPaymentMethod(foundPaymentMethod);
    }
  }, [id, currentUser, canAccessRegion]);

  const handleCancelOrder = () => {
    if (!order || !hasPermission('cancel')) return;

    // Update order status in the mock data
    const orderIndex = orders.findIndex((o) => o.id === order.id);
    if (orderIndex >= 0) {
      orders[orderIndex] = {
        ...orders[orderIndex],
        status: 'cancelled',
      };

      // Update local state
      setOrder({
        ...order,
        status: 'cancelled',
      });
    }
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-destructive text-lg">{error}</div>
        <button
          onClick={() => navigate('/home/orders')}
          className="mt-4 px-4 py-2 bg-primary text-on-primary rounded-md"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  if (!order || !restaurant) {
    return (
      <div className="tech-center py-10">
        <div className=" text-foreground/50">Loading...</div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">Order Details</h1>

        <div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              order.status === 'pending'
                ? 'bg-secondary text-on-secondary'
                : order.status === 'completed'
                ? 'bg-success text-on-success'
                : 'bg-destructive text-on-destructive'
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Restaurant</h2>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
            <span>Img</span>
          </div>
          <div>
            <div className="font-medium">{restaurant.name}</div>
            <div className="text-sm text-foreground/70">
              {restaurant.cuisine}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Items</h2>

        <div className="space-y-4 mb-6">
          {order.items.map((item) => (
            <div key={item.menuItemId} className="flex justify-between">
              <div>
                <div className="font-medium">{item.menuItem.name}</div>
                <div className="text-sm text-foreground/70">
                  {item.quantity} × ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>

        {paymentMethod ? (
          <div>
            <div className="font-medium">{paymentMethod.type}</div>
            <div className="text-sm text-foreground/70">
              Ending in {paymentMethod.lastFour}
            </div>
          </div>
        ) : (
          <div className="text-foreground/50">
            Payment method details not found
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Information</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-foreground/70">Order ID</span>
            <span>{order.id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-foreground/70">Order Date</span>
            <span>
              {new Date(order.createdAt).toLocaleDateString()} at{' '}
              {new Date(order.createdAt).toLocaleTimeString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-foreground/70">Status</span>
            <span>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {order.status === 'pending' && hasPermission('cancel') && (
        <div className="flex justify-end">
          <button
            onClick={handleCancelOrder}
            className="px-6 py-3 bg-destructive text-on-destructive rounded-lg font-medium"
          >
            Cancel Order
          </button>
        </div>
      )}
    </div>
  );
}

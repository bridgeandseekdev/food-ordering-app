import { useNavigate } from '@remix-run/react';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '~/context/CartContext';
import { useUser } from '~/context/UserContext';
import { restaurants, orders, paymentMethods } from '~/data/mockData';
import { PaymentMethod, Order } from '~/types';

export default function CheckoutLayout() {
  const { currentUser, hasPermission } = useUser();
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [userPaymentMethods, setUSerPaymentMethods] = useState<PaymentMethod[]>(
    [],
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [orderProcessing, setOrderProcessing] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    if (!hasPermission('place')) {
      navigate('/home/restaurants');
      return;
    }

    const methods = paymentMethods.filter(
      (method) => method.userId === currentUser.id,
    );

    setUSerPaymentMethods(methods);

    const defaultMethod = methods.find((method) => method.default);

    if (defaultMethod) {
      setSelectedPaymentMethod(defaultMethod.id);
    } else if (methods.length > 0) {
      setSelectedPaymentMethod(methods[0].id);
    }
  }, [currentUser, hasPermission, navigate]);

  useEffect(() => {
    if (items.length === 0 && !orderProcessing) {
      navigate('/home/restaurants');
    }
  }, [items, orderProcessing, navigate]);

  const handlePlaceOrder = () => {
    if (!currentUser || !selectedPaymentMethod || items.length === 0) return;

    setOrderProcessing(true);

    // Find restaurant for the first item (assuming single restaurant orders)
    const firstItem = items[0];
    const restaurant = restaurants.find(
      (restaurant) => restaurant.id === firstItem.menuItem.restaurantId,
    );
    if (!restaurant) return;

    //Create new order
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: currentUser.id,
      restaurantId: restaurant.id,
      items: items.map((item) => ({
        menuItemId: item.menuItemId,
        menuItem: item.menuItem,
        quantity: item.quantity,
        price: item.menuItem.price,
      })),
      totalAmount: getTotalPrice(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentMethodId: selectedPaymentMethod,
      region: restaurant.region,
    };

    orders.push(newOrder);

    //navigate first, then clear the cart
    setTimeout(() => {
      navigate(`/home/orders/${newOrder.id}`);
      setTimeout(() => {
        clearCart();
        setOrderProcessing(false);
      }, 100);
    }, 1000);
  };

  if (items.length === 0 && !orderProcessing) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Checkout screen</h1>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.menuItemId} className="flex justify-between">
              <div>
                <span className="font-medium">{item.menuItem.name}</span> x{' '}
                {item.quantity}
              </div>
              <div>${(item.menuItem.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 my-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          {userPaymentMethods.length === 0 ? (
            <p className="text-foreground/50">No payment methods available</p>
          ) : (
            <div className="space-y-4">
              {userPaymentMethods.map((method) => (
                <div key={method.id}>
                  <div className={`flex justify-between items-center`}>
                    <div>
                      <div className="font-medium">{method.type}</div>
                      <div className="text-sm text-foreground/70">
                        Ending in {method.lastFour}
                      </div>
                    </div>

                    <div>
                      {selectedPaymentMethod === method.id && (
                        <span className="text-primary">
                          <CheckIcon />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={handlePlaceOrder}
            disabled={!selectedPaymentMethod || orderProcessing}
            className={`px-6 py-3 rounded-lg font-medium ${
              !selectedPaymentMethod || orderProcessing
                ? 'bg-muted text-foreground/40 cursor-not-allowed'
                : 'bg-primary text-on-primary'
            }`}
          >
            {orderProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

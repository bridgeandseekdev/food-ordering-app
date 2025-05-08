import { useNavigate } from '@remix-run/react';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '~/context/CartContext';
import { useUser } from '~/context/UserContext';
import { restaurants, orders, paymentMethods } from '~/data/mockData';
import { PaymentMethod, Order } from '~/types';

export default function CheckoutLayout() {
  const { currentUser, hasPermission, canAccessRegion } = useUser();
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [userPaymentMethods, setUSerPaymentMethods] = useState<PaymentMethod[]>(
    [],
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');
  const [orderProcessing, setOrderProcessing] = useState(false);

  // Get the restaurant region for the first item in cart
  const getCartRestaurantRegion = () => {
    if (items.length === 0) return null;
    const firstItem = items[0];
    const restaurant = restaurants.find(
      (r) => r.id === firstItem.menuItem.restaurantId,
    );
    return restaurant?.region || null;
  };

  // Check if user can place order based on region access and permissions
  const canPlaceOrder = () => {
    if (!currentUser) return false;

    // Admin can always place order
    if (currentUser.role === 'Admin') return true;

    const region = getCartRestaurantRegion();
    if (!region) return false;

    return hasPermission('place') && canAccessRegion(region);
  };

  // Get message explaining why order cannot be placed
  const getDisabledMessage = () => {
    if (!currentUser) return 'Please log in to place order';
    if (!hasPermission('place'))
      return 'You do not have permission to place orders';
    if (!canAccessRegion(getCartRestaurantRegion()))
      return "You do not have access to this restaurant's region";
    if (!selectedPaymentMethod) return 'Please select a payment method';
    if (orderProcessing) return 'Order is being processed';
    return '';
  };

  useEffect(() => {
    if (!currentUser) return;

    // if (!hasPermission('place')) {
    //   navigate('/home/restaurants');
    //   return;
    // }

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

  // useEffect(() => {
  //   if (items.length === 0) {
  //     navigate('/home/restaurants');
  //   }
  // }, [items, orderProcessing, navigate]);

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
          <div className="relative inline-block">
            <button
              onClick={handlePlaceOrder}
              disabled={
                !canPlaceOrder() || !selectedPaymentMethod || orderProcessing
              }
              className={`px-6 py-3 rounded-lg font-medium ${
                !canPlaceOrder() || !selectedPaymentMethod || orderProcessing
                  ? 'bg-muted text-foreground/40 cursor-not-allowed'
                  : 'bg-primary text-on-primary'
              }`}
              title={getDisabledMessage()}
            >
              {orderProcessing ? 'Processing...' : 'Place Order'}
            </button>
            {(!canPlaceOrder() ||
              !selectedPaymentMethod ||
              orderProcessing) && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-foreground text-background text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {getDisabledMessage()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from '@remix-run/react';
import { XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '~/context/CartContext';
import { useUser } from '~/context/UserContext';
import CartControls from './CartControls';

export const CartDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const { items } = useCart();
  const { hasPermission } = useUser();

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      role="button"
      tabIndex={0}
      className="fixed inset-0 bg-background/50 pt-16 z-50 cursor-default"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Enter' && onClose()}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === 'Enter' && e.stopPropagation()}
        className={`absolute cursor-default rounded-lg right-0 top-16 shadow-xl p-4 h-full w-full max-w-xs md:max-w-sm border border-border flex flex-col bg-secondary text-on-secondary transition-transform duration-300 ${
          isOpen ? 'animate-slide-in' : 'animate-slide-out'
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button className="p-2 rounded-full hover:bg-muted" onClick={onClose}>
            <XCircle />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-on-secondary/50">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6 overflow-y-auto max-h-[80%]">
              {items.map((item) => (
                <div
                  key={item.menuItemId}
                  className="flex flex-col items-center gap-4 p-3 bg-card text-card-foreground rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center shrink-0">
                      <span>Image</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h3 className="font-medium">
                            {item.menuItem.name}:{' '}
                          </h3>
                          <span className="ml-2">
                            ${(item.menuItem.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-foreground/70">
                        ${item.menuItem.price.toFixed(2)} each
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2  w-full">
                    <CartControls menuItem={item.menuItem} />
                  </div>
                </div>
              ))}
            </div>

            <div
              className={`w-full py-3 rounded-lg text-center font-medium ${
                hasPermission('place')
                  ? 'bg-primary text-on-primary'
                  : 'bg-muted text-foreground/40 cursor-not-allowed'
              }`}
            >
              <Link
                to="/home/checkout"
                className={`${
                  !hasPermission('place') && 'pointer-events-none'
                }`}
                onClick={(e) => {
                  if (!hasPermission('place')) {
                    e.preventDefault();
                  }
                  onClose();
                }}
              >
                {hasPermission('place')
                  ? 'Proceed to Checkout'
                  : 'Only Admin and Managers can checkout'}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
{
  /* <h2 className="text-xl font-bold">Cart Sidebar</h2>
<button onClick={onClose}>Close drawer</button> */
}
{
  /* Cart items will be displayed here */
}
{
  /* <Link to="/home/checkout" onClick={onClose}>
  <p>Proceed to Checkout</p>
</Link> */
}

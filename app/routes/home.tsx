import { Outlet, useNavigate } from '@remix-run/react';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '~/context/UserContext';
import { useCart } from '~/context/CartContext';

export const CartDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed right-0 top-16 inset-y-0 z-50 bg-secondary text-on-secondary">
      <div className="rounded-lg shadow-lg p-4 h-full w-72 border border-red-800 flex flex-col">
        {/* w-full for mobile, md:w-80 for desktop */}
        <h2 className="text-xl font-bold">Cart Sidebar</h2>
        <button onClick={onClose}>Close drawer</button>
        {/* Cart items will be displayed here */}
      </div>
    </div>
  );
};

export default function HomeLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { currentUser } = useUser();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="bg-muted border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="md:text-xl font-bold text-primary">FOA</h1>
          </div>
          <div className="flex items-center gap-6">
            <button
              className="relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="h-6 w-6 text-primary" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-on-destructive rounded-full px-1 text-xs">
                  {getTotalItems()}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-xs md:text-base">
                {currentUser.name}
              </span>
              <span className="text-xs md:text-sm px-2 py-2 md:px-4 md:py-1 bg-accent rounded-full text-on-accent">
                {currentUser.role}
                {currentUser.region && ` - ${currentUser.region}`}
              </span>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 bg-background">
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-foreground/50">
          &copy; {new Date().getFullYear()} Food Ordering App
        </div>
      </footer>
    </div>
  );
}

import { Link, Outlet, useNavigate } from '@remix-run/react';
import { ClipboardList, ShoppingCart, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '~/context/UserContext';
import { useCart } from '~/context/CartContext';
import { CartDrawer } from '~/components/CartDrawer';
import { users } from '~/data/mockData';

export default function HomeLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { currentUser, hasPermission, setUser } = useUser();
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

  const handleUserChange = (userId: string) => {
    setUser(userId);
    // navigate('/home/restaurants');
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="bg-muted border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/home/restaurants">
              <h1 className="md:text-xl font-bold text-primary">FOA</h1>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <Link
                to="/home/orders"
                className="relative hover:text-primary transition-colors"
                title="Orders"
              >
                <ClipboardList className="h-6 w-6" />
              </Link>

              {hasPermission('update') && (
                <Link
                  to="/home/payment-methods"
                  className="relative hover:text-primary transition-colors"
                  title="Payment Methods"
                >
                  <CreditCard className="h-6 w-6" />
                </Link>
              )}
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
            </nav>

            <select
              value={currentUser.id}
              onChange={(e) => handleUserChange(e.target.value)}
              className="px-2 py-1 rounded-lg bg-accent text-on-accent border-none text-xs md:text-sm cursor-pointer"
            >
              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                  className="bg-background text-foreground"
                >
                  {user.name} ({user.role}){user.region && ` - ${user.region}`}
                </option>
              ))}
            </select>

            {/* <div className="flex items-center space-x-2">
              <span className="font-medium text-xs md:text-base">
                {currentUser.name}
              </span>
              <span className="text-xs md:text-sm px-2 py-2 md:px-4 md:py-1 bg-accent rounded-full text-on-accent">
                {currentUser.role}
                {currentUser.region && ` - ${currentUser.region}`}
              </span>
            </div> */}
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

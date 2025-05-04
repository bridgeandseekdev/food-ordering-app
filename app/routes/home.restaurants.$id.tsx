import { useEffect, useState } from 'react';
import { Link, useParams } from '@remix-run/react';
import { ArrowLeft } from 'lucide-react';
import { restaurants, menuItems as menuItemsData } from '~/data/mockData';
import { useUser } from '~/context/UserContext';
import { useCart } from '~/context/CartContext';
import { Restaurant, MenuItem as MenuItemType } from '~/types';
import RestaurantCard from '~/components/RestaurantCard';
import CartControls from '~/components/CartControls';

export default function RestaurantDetail() {
  const { id } = useParams();
  const { currentUser, canAccessRegion } = useUser();
  const { addToCart, isInCart } = useCart();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !currentUser) return;

    const foundRestaurant = restaurants.find((r) => r.id === id);

    if (!foundRestaurant) {
      setError('Restaurant not found');
      return;
    }

    if (foundRestaurant.region && !canAccessRegion(foundRestaurant.region)) {
      setError('You do not have access to this restaurant');
      return;
    }

    setRestaurant(foundRestaurant);

    const filteredMenuItems = menuItemsData.filter(
      (item) => item.restaurantId === id,
    );

    setMenuItems(filteredMenuItems);
  }, []);

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-error text-lg">{error}</div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="p-6 text-center">
        <div className="text-foreground/50">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link to="/home/restaurants" className="flex gap-4 mb-8">
        <ArrowLeft />
        <span>Back</span>
      </Link>

      <div className="mb-8">
        <RestaurantCard restaurant={restaurant} />
      </div>

      <h2 className="text-2xl font-bold mb-6 text-foreground">Menu</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            className="bg-card border border-border rounded-lg overflow-hidden shadow-sm flex flex-col"
          >
            <div className="h-40 bg-muted flex items-center justify-center">
              <span>Food image</span>
            </div>

            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium">{menuItem.name}</h3>
                <div className="text-foreground font-medium">
                  ${menuItem.price.toFixed(2)}
                </div>
              </div>

              <p>{menuItem.description}</p>

              <div className="mt-4">
                {!isInCart(menuItem.id) ? (
                  <button
                    onClick={() => addToCart(menuItem)}
                    className="w-full py-2 bg-primary text-on-primary rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <CartControls menuItem={menuItem} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

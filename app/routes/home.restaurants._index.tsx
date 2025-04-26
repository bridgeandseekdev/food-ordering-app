import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { restaurants } from '~/data/mockData';
import { useUser } from '~/context/UserContext';
import { Restaurant } from '~/types';
import RestaurantCard from '~/components/RestaurantCard';

export default function RestaurantPage() {
  const { currentUser, canAccessRegion } = useUser();
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    [],
  );

  useEffect(() => {
    if (currentUser) {
      // Filter restaurants based on user's region access
      const filtered = restaurants.filter(
        (restaurant) => restaurant.region && canAccessRegion(restaurant.region),
      );

      setFilteredRestaurants(filtered);
    }
  }, [currentUser, canAccessRegion]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-foreground">Restaurants</h2>

      {filteredRestaurants.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-foreground/50">
            No restaurants available for your region
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link
              key={restaurant.id}
              to={`/home/restaurants/${restaurant.id}`}
              className="block group"
            >
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

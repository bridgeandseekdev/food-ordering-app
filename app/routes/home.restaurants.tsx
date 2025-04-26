import { useState, useEffect } from 'react';
import { Link } from '@remix-run/react';
import { restaurants } from '~/data/mockData';
import { useUser } from '~/context/UserContext';
import { Restaurant } from '~/types';

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
              to={`/app/restaurants/${restaurant.id}`}
              className="block group"
            >
              <div className="bg-card rounded-lg shadow-md overflow-hidden border border-secondary transition-all hover:shadow-lg hover:border-success relative">
                <div className="h-48 flex items-center justify-center">
                  <span>Restaurant image</span>
                </div>
                <div className="p-4 bg-muted">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-on-muted">
                      {restaurant.name}
                    </h3>
                    <span className="text-sm px-2 py-1 bg-border rounded-full">
                      {restaurant.region}
                    </span>
                  </div>
                  <p className="absolute -bottom-2 left-0 w-full text-sm mb-2 text-on-accent bg-accent py-1 flex justify-center items-center ">
                    {restaurant.cuisine}
                  </p>
                  <div className="flex items-center mb-6">
                    <div className="mr-1">*</div>
                    <span>{restaurant.rating}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

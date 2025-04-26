import React from 'react';
import { Restaurant } from '~/types';

const RestaurantCard: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  return (
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
  );
};

export default RestaurantCard;

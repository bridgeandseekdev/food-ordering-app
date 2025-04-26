import { Outlet } from '@remix-run/react';

export default function RestaurantLayout() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

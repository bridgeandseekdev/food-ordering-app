import { Outlet } from '@remix-run/react';

export default function OrdersLayout() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

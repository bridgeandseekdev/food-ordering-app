import { useCart } from '~/context/CartContext';
import { MenuItem } from '~/types';

export default function CartControls({ menuItem }: { menuItem: MenuItem }) {
  const { getItemQuantity, updateQuantity } = useCart();
  return (
    <>
      <div className="flex flex-1 items-center justify-between bg-highlight">
        <button
          onClick={() =>
            updateQuantity(menuItem.id, getItemQuantity(menuItem.id) - 1)
          }
          className="w-10 h-10 flex items-center justify-center bg-secondary text-on-secondary font-bold text-2xl"
        >
          -
        </button>
        <div className="mx-4 text-foreground">
          {getItemQuantity(menuItem.id)}
        </div>
        <button
          onClick={() =>
            updateQuantity(menuItem.id, getItemQuantity(menuItem.id) + 1)
          }
          className="w-10 h-10 flex items-center justify-center bg-secondary text-on-secondary font-bold text-2xl"
        >
          +
        </button>
      </div>
    </>
  );
}

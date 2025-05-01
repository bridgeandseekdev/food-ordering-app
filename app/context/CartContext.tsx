import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { CartItem, MenuItem } from '~/types/index';

interface CartContextType {
  items: CartItem[];
  addToCart: (menuItem: MenuItem, quantity?: number) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isInCart: (menuItemId: string) => boolean;
  getItemQuantity: (menuItemId: string) => number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.menuItemId === menuItem.id,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.menuItemId === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevItems, { menuItemId: menuItem.id, quantity, menuItem }];
      }
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.menuItemId !== menuItemId),
    );
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce(
      (total, item) => total + item.menuItem.price * item.quantity,
      0,
    );
  };

  const isInCart = (menuItemId: string) => {
    return items.some((item) => item.menuItemId === menuItemId);
  };

  const getItemQuantity = (menuItemId: string) => {
    const item = items.find((item) => item.menuItemId === menuItemId);
    return item ? item.quantity : 0;
  };

  const contextValue = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      isInCart,
      getItemQuantity,
    }),
    [items],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

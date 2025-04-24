import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { users } from '~/data/mockData';
import { Region, User } from '~/types';

type UserActionType = 'view' | 'create' | 'place' | 'cancel' | 'update';

interface UserContextType {
  currentUser: User | null;
  setUser: (userId: string) => void;
  hasPermission: (action: UserActionType) => boolean;
  canAccessRegion: (region: Region) => boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const setUser = (userId: string) => {
    const user = users.find((u) => u.id === userId) || null;
    setCurrentUser(user);
  };

  const hasPermission = (action: UserActionType) => {
    if (!currentUser) return false;

    switch (action) {
      case 'view':
      case 'create':
        // All roles can view restaurants and create orders
        return true;

      case 'place':
      case 'cancel':
        return ['Admin', 'Manager'].includes(currentUser.role);

      case 'update':
        //Only Admin can update payment methods
        return currentUser.role === 'Admin';

      default:
        return false;
    }
  };

  const canAccessRegion = (region: Region) => {
    if (!currentUser) return false;

    //Admin has global access
    if (currentUser.role === 'Admin') return true;

    //Other roles can only access their assigned region

    return currentUser.region === region;
  };

  const contextValue = useMemo(
    () => ({
      currentUser,
      setUser,
      hasPermission,
      canAccessRegion,
    }),
    [currentUser],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

import { Outlet, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { useUser } from '~/context/UserContext';

export default function HomeLayout() {
  const { currentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-muted border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">
              Food Ordering App
            </h1>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{currentUser.name}</span>
              <span className="text-sm px-4 py-1 bg-accent rounded-full text-on-accent">
                {currentUser.role}
                {currentUser.region && ` - ${currentUser.region}`}
              </span>
            </div>
          </div>
        </div>
      </header>

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

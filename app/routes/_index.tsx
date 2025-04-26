import { useNavigate, Form } from '@remix-run/react';
import { useState } from 'react';
import { useUser } from '~/context/UserContext';
import { users } from '~/data/mockData';

export default function UserSelectionPage() {
  const [selectedUserId, setSelectedUserId] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleUserSelect = () => {
    if (selectedUserId) {
      setUser(selectedUserId);
      navigate('/home/restaurants');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-3xl w-full bg-card text-card-foreground rounded-xl shadow-xl p-8 space-y-8 border border-border">
        <h1 className="text-3xl font-bold text-center text-primary">
          Food Ordering App
        </h1>

        <h2 className="text-xl text-center text-on-secondary">Select User</h2>

        <Form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleUserSelect();
          }}
        >
          <div className="space-y-4">
            {users.map((user) => {
              const isSelected = selectedUserId === user.id;
              return (
                <label
                  htmlFor={`user-${user.id}`}
                  key={user.id}
                  aria-label={`Select user ${user.name}`}
                  className={`
                    flex items-center p-4 rounded-lg border transition-all cursor-pointer
                    ${
                      isSelected
                        ? 'bg-accent/20 text-on-accent border-primary'
                        : 'bg-muted hover:bg-primary/10 text-on-muted border-border'
                    }
                  `}
                >
                  <input
                    type="radio"
                    id={`user-${user.id}`}
                    name="user"
                    value={user.id}
                    aria-labelledby={`user-name-${user.id}`}
                    onChange={() => setSelectedUserId(user.id)}
                    checked={isSelected}
                    className="mr-4 h-4 w-4 accent-primary"
                  />

                  <div className="flex-1">
                    <div className="font-semibold">{user.name}</div>
                    <div className="font-extralight text-sm text-on-muted">
                      {user.role}{' '}
                      {user.region ? `- ${user.region}` : '(Global Access)'}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>

          <button
            type="submit"
            disabled={!selectedUserId}
            className={`
              w-full py-2 px-4 rounded-md font-medium transition-colors
              ${
                selectedUserId
                  ? 'bg-primary text-on-primary hover:bg-primary/90'
                  : 'bg-muted text-on-muted cursor-not-allowed'
              }
            `}
          >
            Continue
          </button>
        </Form>
      </div>
    </div>
  );
}

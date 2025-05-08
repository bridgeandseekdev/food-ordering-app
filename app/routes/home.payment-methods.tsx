import { useState, useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { useUser } from '~/context/UserContext';
import { paymentMethods } from '~/data/mockData';
import { PaymentMethod } from '~/types';

export default function PaymentMethods() {
  const { currentUser, hasPermission } = useUser();
  const navigate = useNavigate();

  const [userPaymentMethods, setUserPaymentMethods] = useState<PaymentMethod[]>(
    [],
  );

  useEffect(() => {
    if (!currentUser) return;

    // Check permission
    if (!hasPermission('update')) {
      navigate('/home/restaurants');
      return;
    }

    // Load payment methods
    const methods = paymentMethods.filter(
      (method) => method.userId === currentUser.id,
    );

    setUserPaymentMethods(methods);
  }, [currentUser, hasPermission, navigate]);

  const handleSetDefault = (methodId: string) => {
    // Update in mock data
    for (let i = 0; i < paymentMethods.length; i++) {
      if (paymentMethods[i].userId === currentUser?.id) {
        paymentMethods[i] = {
          ...paymentMethods[i],
          default: paymentMethods[i].id === methodId,
        };
      }
    }

    setUserPaymentMethods(
      userPaymentMethods.map((method) => ({
        ...method,
        default: method.id === methodId,
      })),
    );
  };

  if (!currentUser || !hasPermission('update')) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-primary mb-4">
        Payment Methods
      </h1>

      {userPaymentMethods.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-foreground/50">No payments methods</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userPaymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-card border border-border rounded-lg p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{method.type}</div>
                  <div className="text-sm text-foreground/70">
                    Ending in {method.lastFour}
                  </div>
                  {method.default && (
                    <div className="mt-1 text-sm text-accent">
                      Default payment method
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {!method.default && (
                    <button
                      onClick={() => handleSetDefault(method.id)}
                      className="px-3 py-1 bg-secondary text-on-secondary text-sm rounded-md"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

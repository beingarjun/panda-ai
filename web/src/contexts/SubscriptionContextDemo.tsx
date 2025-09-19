import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  analysisLimit: number;
  competitorLimit: number;
}

interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialEnd?: Date;
  canceledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface UsageStats {
  userId: string;
  analysisCount: number;
  competitorCount: number;
  lastReset: Date;
}

interface SubscriptionContextType {
  subscription: UserSubscription | null;
  plans: SubscriptionPlan[];
  usage: UsageStats | null;
  isLoading: boolean;
  error: string | null;
  subscribeToPlan: (planId: string) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  updatePaymentMethod: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [usage, setUsage] = useState<UsageStats | null>({
    userId: '1',
    analysisCount: 5,
    competitorCount: 12,
    lastReset: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      interval: 'month',
      features: ['5 analyses per month', '3 competitors per analysis', 'Basic insights'],
      analysisLimit: 5,
      competitorLimit: 3
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      interval: 'month',
      features: ['50 analyses per month', '10 competitors per analysis', 'Advanced insights', 'Export reports'],
      analysisLimit: 50,
      competitorLimit: 10
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      interval: 'month',
      features: ['Unlimited analyses', 'Unlimited competitors', 'White-label reports', 'Priority support'],
      analysisLimit: -1,
      competitorLimit: -1
    }
  ];

  const subscribeToPlan = async (planId: string) => {
    setIsLoading(true);
    try {
      // Demo subscription
      setSubscription({
        id: 'demo-sub',
        userId: '1',
        planId,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setSubscription(null);
  };

  const updatePaymentMethod = async () => {
    // Demo implementation
  };

  const refreshSubscription = async () => {
    // Demo implementation
  };

  return (
    <SubscriptionContext.Provider value={{
      subscription,
      plans,
      usage,
      isLoading,
      error,
      subscribeToPlan,
      cancelSubscription,
      updatePaymentMethod,
      refreshSubscription,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
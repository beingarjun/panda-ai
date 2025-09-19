import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  usage: UsageStats | null;
  plans: SubscriptionPlan[];
  loading: boolean;
  error: string | null;
  refreshSubscription: () => Promise<void>;
  upgradeSubscription: (planId: string) => Promise<boolean>;
  canPerformAction: (action: 'analysis' | 'add_competitor') => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSubscription = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/subscription/subscription', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscription');
      }

      const data = await response.json();
      setSubscription(data.subscription);
      setUsage(data.usage);
      setPlans(data.plans);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const upgradeSubscription = async (planId: string): Promise<boolean> => {
    try {
      setError(null);
      
      const response = await fetch('/api/subscription/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade subscription');
      }

      const data = await response.json();
      setSubscription(data.subscription);
      
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upgrade failed');
      return false;
    }
  };

  const canPerformAction = (action: 'analysis' | 'add_competitor'): boolean => {
    if (!subscription || !usage) return false;

    const plan = plans.find(p => p.id === subscription.planId);
    if (!plan) return false;

    if (subscription.status !== 'active' && subscription.status !== 'trialing') {
      return false;
    }

    if (action === 'analysis') {
      return plan.analysisLimit === -1 || usage.analysisCount < plan.analysisLimit;
    }

    if (action === 'add_competitor') {
      return plan.competitorLimit === -1 || usage.competitorCount < plan.competitorLimit;
    }

    return false;
  };

  useEffect(() => {
    refreshSubscription();
  }, []);

  const value: SubscriptionContextType = {
    subscription,
    usage,
    plans,
    loading,
    error,
    refreshSubscription,
    upgradeSubscription,
    canPerformAction,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

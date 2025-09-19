export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  analysisLimit: number;
  competitorLimit: number;
}

export interface UserSubscription {
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

export interface UsageStats {
  userId: string;
  analysisCount: number;
  competitorCount: number;
  lastReset: Date;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      '3 competitor analyses per month',
      '5 competitors max',
      'Basic AI insights',
      'Email support'
    ],
    analysisLimit: 3,
    competitorLimit: 5
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29,
    interval: 'month',
    features: [
      'Unlimited competitor analyses',
      '25 competitors max',
      'Advanced AI insights',
      'Priority support',
      'Export reports (PDF/CSV)',
      'Real-time alerts'
    ],
    analysisLimit: -1, // unlimited
    competitorLimit: 25
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    features: [
      'Unlimited everything',
      'White-label reports',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'Team collaboration',
      'Advanced analytics'
    ],
    analysisLimit: -1,
    competitorLimit: -1
  }
];

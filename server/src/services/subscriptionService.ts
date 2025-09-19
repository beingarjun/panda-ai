import { UserSubscription, UsageStats, SUBSCRIPTION_PLANS } from '../types/subscription.js';

class SubscriptionService {
  private subscriptions = new Map<string, UserSubscription>();
  private usage = new Map<string, UsageStats>();

  // Get user's current subscription
  getUserSubscription(userId: string): UserSubscription {
    return this.subscriptions.get(userId) || {
      id: `sub_${userId}`,
      userId,
      planId: 'free',
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  // Get user's usage stats
  getUserUsage(userId: string): UsageStats {
    return this.usage.get(userId) || {
      userId,
      analysisCount: 0,
      competitorCount: 0,
      lastReset: new Date()
    };
  }

  // Check if user can perform action
  canPerformAction(userId: string, action: 'analysis' | 'add_competitor'): boolean {
    const subscription = this.getUserSubscription(userId);
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === subscription.planId);
    const usage = this.getUserUsage(userId);

    if (!plan) return false;

    // Check if subscription is active
    if (subscription.status !== 'active' && subscription.status !== 'trialing') {
      return false;
    }

    // Check limits
    if (action === 'analysis') {
      return plan.analysisLimit === -1 || usage.analysisCount < plan.analysisLimit;
    }

    if (action === 'add_competitor') {
      return plan.competitorLimit === -1 || usage.competitorCount < plan.competitorLimit;
    }

    return false;
  }

  // Increment usage
  incrementUsage(userId: string, action: 'analysis' | 'add_competitor'): void {
    const usage = this.getUserUsage(userId);
    
    if (action === 'analysis') {
      usage.analysisCount++;
    } else if (action === 'add_competitor') {
      usage.competitorCount++;
    }

    this.usage.set(userId, usage);
  }

  // Upgrade subscription (dummy implementation)
  upgradeSubscription(userId: string, planId: string): UserSubscription {
    const currentSub = this.getUserSubscription(userId);
    const newSub: UserSubscription = {
      ...currentSub,
      planId,
      status: 'active',
      updatedAt: new Date()
    };

    this.subscriptions.set(userId, newSub);
    return newSub;
  }

  // Get all plans
  getPlans() {
    return SUBSCRIPTION_PLANS;
  }

  // Reset usage (typically done monthly)
  resetUsage(userId: string): void {
    this.usage.set(userId, {
      userId,
      analysisCount: 0,
      competitorCount: 0,
      lastReset: new Date()
    });
  }
}

export const subscriptionService = new SubscriptionService();

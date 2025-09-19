import React, { useState } from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { X, Check, Zap, Star, Crown } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: string;
}

export function PricingModal({ isOpen, onClose, reason }: PricingModalProps) {
  const { plans, upgradeSubscription, subscription } = useSubscription();
  const [upgrading, setUpgrading] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleUpgrade = async (planId: string) => {
    if (planId === 'free') return;
    
    setUpgrading(planId);
    const success = await upgradeSubscription(planId);
    setUpgrading(null);
    
    if (success) {
      onClose();
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free': return <Zap className="w-6 h-6" />;
      case 'pro': return <Star className="w-6 h-6" />;
      case 'enterprise': return <Crown className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free': return 'border-gray-200';
      case 'pro': return 'border-blue-500 ring-2 ring-blue-500';
      case 'enterprise': return 'border-purple-500';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
              {reason && (
                <p className="text-red-600 mt-2">{reason}</p>
              )}
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`border rounded-lg p-6 relative ${getPlanColor(plan.id)}`}
              >
                {plan.id === 'pro' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                    {getPlanIcon(plan.id)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-600">/{plan.interval}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.id)}
                  disabled={
                    subscription?.planId === plan.id ||
                    upgrading === plan.id ||
                    plan.id === 'free'
                  }
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    subscription?.planId === plan.id
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : plan.id === 'free'
                      ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                      : plan.id === 'pro'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                >
                  {upgrading === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </div>
                  ) : subscription?.planId === plan.id ? (
                    'Current Plan'
                  ) : plan.id === 'free' ? (
                    'Free Forever'
                  ) : (
                    `Upgrade to ${plan.name}`
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              All plans include a 7-day free trial. Cancel anytime.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              * This is a demo paywall. No actual payments will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

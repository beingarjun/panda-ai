import React from 'react';
import { useSubscription } from '../contexts/SubscriptionContext';
import { BarChart3, Users, Zap } from 'lucide-react';

export function UsageProgress() {
  const { subscription, usage, plans } = useSubscription();

  if (!subscription || !usage) return null;

  const plan = plans.find(p => p.id === subscription.planId);
  if (!plan) return null;

  const analysisProgress = plan.analysisLimit === -1 
    ? 100 
    : (usage.analysisCount / plan.analysisLimit) * 100;

  const competitorProgress = plan.competitorLimit === -1 
    ? 100 
    : (usage.competitorCount / plan.competitorLimit) * 100;

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-red-500';
    if (progress >= 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2" />
        Usage Overview - {plan.name} Plan
      </h3>

      <div className="space-y-4">
        {/* Analysis Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Analyses This Month
            </span>
            <span className="text-sm text-gray-600">
              {usage.analysisCount} / {plan.analysisLimit === -1 ? '∞' : plan.analysisLimit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${getProgressColor(analysisProgress)}`}
              style={{ width: `${Math.min(analysisProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Competitor Usage */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              Competitors Tracked
            </span>
            <span className="text-sm text-gray-600">
              {usage.competitorCount} / {plan.competitorLimit === -1 ? '∞' : plan.competitorLimit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${getProgressColor(competitorProgress)}`}
              style={{ width: `${Math.min(competitorProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Warning Messages */}
        {analysisProgress >= 90 && plan.analysisLimit !== -1 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">
              ⚠️ You're running low on analyses. Consider upgrading to continue unlimited analysis.
            </p>
          </div>
        )}

        {competitorProgress >= 90 && plan.competitorLimit !== -1 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ You're approaching your competitor limit. Upgrade to track more competitors.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

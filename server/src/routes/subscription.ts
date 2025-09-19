import { Router } from "express";
import { requireAuth } from "../auth/middleware.js";
import { subscriptionService } from "../services/subscriptionService.js";

const router = Router();

// Get current user's subscription
router.get("/subscription", requireAuth, (req, res) => {
  try {
    const userId = (req as any).claims.userId;
    const subscription = subscriptionService.getUserSubscription(userId);
    const usage = subscriptionService.getUserUsage(userId);
    const plans = subscriptionService.getPlans();

    res.json({
      subscription,
      usage,
      plans
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get subscription" });
  }
});

// Get all available plans
router.get("/plans", (req, res) => {
  try {
    const plans = subscriptionService.getPlans();
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ error: "Failed to get plans" });
  }
});

// Upgrade subscription (dummy payment)
router.post("/upgrade", requireAuth, (req, res) => {
  try {
    const userId = (req as any).claims.userId;
    const { planId } = req.body;

    if (!planId) {
      return res.status(400).json({ error: "Plan ID is required" });
    }

    const plans = subscriptionService.getPlans();
    const plan = plans.find(p => p.id === planId);

    if (!plan) {
      return res.status(400).json({ error: "Invalid plan ID" });
    }

    // Simulate payment processing
    setTimeout(() => {
      const subscription = subscriptionService.upgradeSubscription(userId, planId);
      res.json({ 
        success: true, 
        subscription,
        message: `Successfully upgraded to ${plan.name} plan!`
      });
    }, 1000); // Simulate payment delay

  } catch (error) {
    res.status(500).json({ error: "Failed to upgrade subscription" });
  }
});

// Check if user can perform action
router.post("/check-limit", requireAuth, (req, res) => {
  try {
    const userId = (req as any).claims.userId;
    const { action } = req.body;

    const canPerform = subscriptionService.canPerformAction(userId, action);
    const usage = subscriptionService.getUserUsage(userId);
    const subscription = subscriptionService.getUserSubscription(userId);

    res.json({
      canPerform,
      usage,
      subscription
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to check limits" });
  }
});

export default router;

import passport from "passport";
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback } from "passport-google-oauth20";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { ENV } from "../env.js";
import db from "../db.js";
import { sign } from "./jwt.js";

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done) => {
  const user = db.findUserById(id);
  done(null, user);
});

// Google OAuth Strategy
if (ENV.GOOGLE_CLIENT_ID && ENV.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: ENV.GOOGLE_CLIENT_ID,
    clientSecret: ENV.GOOGLE_CLIENT_SECRET,
    callbackURL: `${ENV.SERVER_URL}/api/auth/google/callback`
  },
  async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: VerifyCallback) => {
    try {
      // Check if user exists with this Google ID
      let user = db.findUserByProvider('google', profile.id);
      
      if (!user) {
        // Check if user exists with this email
        user = db.findUserByEmail(profile.emails?.[0]?.value || '');
        
        if (!user) {
          // Create new user
          const userId = db.createUser(
            profile.emails?.[0]?.value || '',
            undefined,
            {
              name: profile.displayName,
              avatar_url: profile.photos?.[0]?.value,
              provider: 'google',
              provider_id: profile.id
            }
          );
          user = db.findUserById(userId);
        }
      }
      
      return done(null, user);
    } catch (error) {
      return done(error as Error, false);
    }
  }));
}

// Microsoft OAuth Strategy
if (ENV.MICROSOFT_CLIENT_ID && ENV.MICROSOFT_CLIENT_SECRET) {
  passport.use(new MicrosoftStrategy({
    clientID: ENV.MICROSOFT_CLIENT_ID,
    clientSecret: ENV.MICROSOFT_CLIENT_SECRET,
    callbackURL: `${ENV.SERVER_URL}/api/auth/microsoft/callback`,
    scope: ['user.read']
  },
  async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
    try {
      let user = db.findUserByProvider('microsoft', profile.id);
      
      if (!user) {
        user = db.findUserByEmail(profile.emails?.[0]?.value || '');
        
        if (!user) {
          const userId = db.createUser(
            profile.emails?.[0]?.value || '',
            undefined,
            {
              name: profile.displayName,
              avatar_url: profile.photos?.[0]?.value,
              provider: 'microsoft',
              provider_id: profile.id
            }
          );
          user = db.findUserById(userId);
        }
      }
      
      return done(null, user);
    } catch (error) {
      return done(error as Error, false);
    }
  }));
}

// Apple OAuth Strategy (optional - can be enabled when properly configured)
if (ENV.APPLE_CLIENT_ID && ENV.APPLE_PRIVATE_KEY) {
  // Apple Sign-In requires additional setup and configuration
  // For now, we'll skip Apple OAuth to avoid complex configuration issues
  console.log('Apple OAuth available but not configured - requires additional setup');
}

export default passport;

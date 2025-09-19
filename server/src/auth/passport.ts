import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as MicrosoftStrategy } from "passport-microsoft";
import { Strategy as AppleStrategy } from "passport-apple";
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
  async (accessToken, refreshToken, profile, done) => {
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
      return done(error, null);
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
  async (accessToken, refreshToken, profile, done) => {
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
      return done(error, null);
    }
  }));
}

// Apple OAuth Strategy
if (ENV.APPLE_CLIENT_ID && ENV.APPLE_PRIVATE_KEY) {
  passport.use(new AppleStrategy({
    clientID: ENV.APPLE_CLIENT_ID,
    teamID: ENV.APPLE_TEAM_ID,
    keyID: ENV.APPLE_KEY_ID,
    privateKeyString: ENV.APPLE_PRIVATE_KEY,
    callbackURL: `${ENV.SERVER_URL}/api/auth/apple/callback`,
    scope: ['name', 'email']
  },
  async (accessToken, refreshToken, idToken, profile, done) => {
    try {
      let user = db.findUserByProvider('apple', profile.id);
      
      if (!user) {
        user = db.findUserByEmail(profile.email || '');
        
        if (!user) {
          const userId = db.createUser(
            profile.email || '',
            undefined,
            {
              name: profile.name?.firstName + ' ' + profile.name?.lastName,
              provider: 'apple',
              provider_id: profile.id
            }
          );
          user = db.findUserById(userId);
        }
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

export default passport;

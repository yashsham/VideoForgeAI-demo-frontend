import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { githubConfig, linkedinConfig } from '../config/oauth.js';
import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';

// GitHub Strategy
passport.use(new GitHubStrategy(githubConfig,
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 'github.id': profile.id });

      if (!user) {
        user = await User.create({
          username: profile.username,
          email: profile.emails[0].value,
          github: {
            id: profile.id,
            username: profile.username
          },
          verified: true // GitHub users are pre-verified
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// LinkedIn Strategy
passport.use(new LinkedInStrategy(linkedinConfig,
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 'linkedin.id': profile.id });

      if (!user) {
        user = await User.create({
          username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
          email: profile.emails[0].value,
          linkedin: {
            id: profile.id,
            name: profile.displayName
          },
          verified: true // LinkedIn users are pre-verified
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

export const handleSocialAuthCallback = (req, res) => {
  const token = generateToken(req.user._id);
  
  // Set secure cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });

  // Redirect to frontend with success
  res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
};

export const handleSocialAuthError = (err, req, res) => {
  res.redirect(`${process.env.CLIENT_URL}/auth/error?message=${encodeURIComponent(err.message)}`);
};
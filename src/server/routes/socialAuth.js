import express from 'express';
import passport from 'passport';
import { handleSocialAuthCallback, handleSocialAuthError } from '../controllers/socialAuthController.js';

const router = express.Router();

// GitHub routes
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/error' }),
  handleSocialAuthCallback
);

// LinkedIn routes
router.get('/linkedin',
  passport.authenticate('linkedin', { state: true })
);

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/auth/error' }),
  handleSocialAuthCallback
);

// Error handler
router.get('/error', handleSocialAuthError);

export default router;
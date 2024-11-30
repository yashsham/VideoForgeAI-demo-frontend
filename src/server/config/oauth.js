import dotenv from 'dotenv';

dotenv.config();

export const githubConfig = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/api/auth/github/callback`
};

export const linkedinConfig = {
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: `${process.env.API_URL}/api/auth/linkedin/callback`,
  scope: ['r_emailaddress', 'r_liteprofile']
};
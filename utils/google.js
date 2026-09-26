const { google } = require('googleapis');
const config = require('../config/config');

const google_client = config.PASSPORT_GOOGLE_CLIENT_ID;
const google_client_secret = config.PASSPORT_GOOGLE_CLIENT_SECRET;
const callbackURL = config.PASSPORT_GOOGLE_CALLBACK_URL;

if (!google_client || !google_client_secret || !callbackURL) {
  throw new Error('Google OAuth config is incomplete. Check PASSPORT_GOOGLE_CLIENT_ID, PASSPORT_GOOGLE_CLIENT_SECRET, and PASSPORT_GOOGLE_CALLBACK_URL.');
}

const oauthclient = new google.auth.OAuth2(
  google_client,
  google_client_secret,
  callbackURL
);

module.exports = oauthclient;
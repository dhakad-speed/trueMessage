export const config = {
  mongoUrl: String(process.env.MONGO_URL),
  vectorImg: String(process.env.NEXT_PUBLIC_POLYGON),
  resendApiKey: String(process.env.RESEND_API_KEY),
  jwtSecretToken: String(process.env.JWT_SECRET),
  googleClientId: String(process.env.GOOGLE_CLIENT_ID),
  googleClientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
};

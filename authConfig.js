export const oidcConfig = {
  authority: "https://phera-dev-s43qhq.us1.zitadel.cloud", // Issuer
  client_id: "360502034648137552",                        // Client ID
  redirect_uri: "http://localhost:5173/home/complete",    // dev redirect
  post_logout_redirect_uri: "http://localhost:5173/start", // dev logout
  response_type: "code",
  scope: "openid profile email offline_access",
  automaticSilentRenew: true,
};
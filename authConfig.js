export const oidcConfig = {
  authority: import.meta.env.VITE_AUTH_AUTHORITY,
  client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env.VITE_AUTH_LOGOUT_REDIRECT_URI,

  response_type: "code",
  scope: "openid profile email offline_access",
  automaticSilentRenew: true,
};
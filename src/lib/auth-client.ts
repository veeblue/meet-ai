import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  // Ensure ngrok interstitial is bypassed for API requests
  fetchOptions: {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  },
})
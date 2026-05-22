import { sentinelClient } from "@better-auth/infra/client";
import { createAuthClient } from "better-auth/client";

export const AuthClient = createAuthClient({
  plugins: [
    sentinelClient()
  ]
})
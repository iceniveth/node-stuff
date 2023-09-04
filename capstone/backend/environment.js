// codes in here are inspired from: https://dev.to/remix-run-br/type-safe-environment-variables-on-both-client-and-server-with-remix-54l5
// It's a type-safe way of accessing environment variables.
// App will not run if process.env doesn't meet the zod schema

import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  JWT_SECRET: z.string().min(1),
});

const environment = environmentSchema.parse(process.env);

export { environment };

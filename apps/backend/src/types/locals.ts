import type { Context, Env } from 'hono'

export type CustomEnv = Env & {
  Variables: {
    email?: string
  }
}

export type CustomContext = Context<CustomEnv>

import { Context } from 'hono';

export const viewAccessJudgmentUrlHandler = async (c: Context) => {
  return c.redirect('https://example.com', 302); // 302: Found (一時的なリダイレクト)
};

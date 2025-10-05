// lib/tokenStore.ts
type TokenSet = { access_token: string; refresh_token?: string; expiry_date?: number; };
const mem = new Map<string, TokenSet>();

export const tokenStore = {
  async get(key: string) { return mem.get(key) ?? null; },
  async set(key: string, tokens: TokenSet) { mem.set(key, tokens); },
};

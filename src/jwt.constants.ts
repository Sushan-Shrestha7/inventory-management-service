import { configDotenv } from 'dotenv';
configDotenv();

export const JwtConstants = {
  secret:
    String(process.env.JWT_SECRET) ||
    '3f8c72d1a0b47a8e982f4f61d3e9c65fba7d38b24a5f6c19de3c3728a1e5d4bc',
  expiresIn: Number(process.env.TOKEN_EXPIRY) || 24 * 60 * 60,
  refreshExpiresIn: 7 * 24 * 60 * 60,
};

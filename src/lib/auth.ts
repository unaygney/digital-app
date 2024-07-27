import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
  const secretKey = process.env.SECRET_KEY;

  if (!secretKey) {
    throw new Error("Secret key is not defined");
  }
  return new TextEncoder().encode(secretKey);
};
export async function verifyJwtToken(token: string) {
  const key = getJwtSecretKey();

  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Token verification failed:");
    return null;
  }
}

export const isAuthPages = (url: string) => {
  const AUTH_PAGES = ["/sign-in", "/sign-up"];

  return AUTH_PAGES.some((page) => page.startsWith(url));
};

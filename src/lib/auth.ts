import "server-only";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
export const getTokenAndVerify = async (): Promise<string | undefined> => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value ?? "";

  const isValidToken = await verifyJwtToken(token);

  if (!isValidToken || !isValidToken.email) return undefined;

  return isValidToken.email as string;
};

/*
You can add more secured pages by adding the path to the AUTH_PAGES array.
*/
export const isSecuredPage = (url: string) => {
  const AUTH_PAGES = ["/settings"];

  return AUTH_PAGES.some((page) => page.startsWith(url));
};

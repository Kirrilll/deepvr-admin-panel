import Cookies from "universal-cookie";

export const LOGIN_TOKEN_COOKIE = 'user_token';

export const getTokenCookie = () => {
  const cookies = new Cookies();
  return cookies.get(LOGIN_TOKEN_COOKIE);
};

export const setTokenCookie = (token: string) => {
  const cookies = new Cookies();
  cookies.set(LOGIN_TOKEN_COOKIE, token, { maxAge: 480 });
};

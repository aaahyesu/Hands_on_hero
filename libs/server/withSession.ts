import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieConfig: IronSessionOptions = {
  cookieName: "hands_on_hero",
  password: process.env.SECRET_COOKIE_PASSWORD as string,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieConfig);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieConfig);
}

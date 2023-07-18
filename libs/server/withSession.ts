// import { IronSessionOptions } from "iron-session";
// import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

// declare module "iron-session" {
//   interface IronSessionData {
//     user?: {
//       id: number;
//     };
//   }
// }

// const cookieConfig: IronSessionOptions = {
//   cookieName: "session",
//   password: process.env.SECRET_COOKIE_PASSWORD as string,
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
// };

// export function withApiSession(fn: any) {
//   return withIronSessionApiRoute(fn, cookieConfig);
// }

// export function withSsrSession(handler: any) {
//   return withIronSessionSsr(handler, cookieConfig);
// }



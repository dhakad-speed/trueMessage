import "next-auth";

declare module "next-auth" {
  interface User {
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }
  interface Session {
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
  }
}

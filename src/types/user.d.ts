export interface CustomUser {
  id: string;
  tenant_id: string;
  username: string;
  token: string;
  email: string;
  refresh_token: string;
}

declare module 'next-auth' {
  interface User extends CustomUser {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: CustomUser;
  }
}

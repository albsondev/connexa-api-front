import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string;
    tenant_id: string;
    name: string;
    token: string;
    email: string;
    refresh_token: string;
    document_number?: string;
    phone?: string;
    address?: {
      zipcode?: string;
      street?: string;
      neighborhood?: string;
      number?: string;
    };
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}

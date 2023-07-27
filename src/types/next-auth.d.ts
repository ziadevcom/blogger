// // Extending next-auth types to get rid of erros from next auth config
// // Help from https://stackoverflow.com/questions/74425533/property-role-does-not-exist-on-type-user-adapteruser-in-nextauth

import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { active: boolean; id: string };
  }

  interface User {
    id: string;
    active: boolean;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    active: boolean;
  }
}

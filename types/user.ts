import { Session } from "next-auth";

export type ExtendedUser = Session["user"] & {
  authority?: string;
};
export type ExtendedSession = Omit<Session, "user"> & {
  user?: ExtendedUser;
};

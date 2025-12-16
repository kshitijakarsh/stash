import { db } from "../../db/client";
import { UserTable } from "../../db/schema/User";
import { eq } from "drizzle-orm";

export const AuthRepo = {
  findByEmail(email: string) {
    return db.query.UserTable.findFirst({
      where: (u: { email: any; }, { eq }: any) => eq(u.email, email)
    });
  },

  createUser(data: { name: string; email: string; password: string }) {
    return db.insert(UserTable).values(data).returning();
  }
};

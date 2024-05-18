import { NewUser, userEntity } from "../db/schemas";
import { dbClient } from "../db/db-client";
import { EntityAlreadyExists, EntityNotFound } from "../errors/entity.error";

export async function getUsers() {
  return await dbClient.select().from(userEntity);
}

export async function getUserById(id: number) {
  const user = await dbClient.query.userEntity.findFirst({
    where: (user, op) => op.eq(user.id, id),
  });

  if (!user) {
    throw new EntityNotFound("User not found");
  }

  return user;
}

async function getUserByEmail(email: string) {
  const user = await dbClient.query.userEntity.findFirst({
    where: (user, op) => op.eq(user.email, email),
  });

  return user;
}

export async function createUser({ name, email }: NewUser) {
  const user = await getUserByEmail(email);

  if (user) {
    throw new EntityAlreadyExists("User already exists");
  }

  const [newUser] = await dbClient
    .insert(userEntity)
    .values({
      name,
      email,
    })
    .onConflictDoNothing()
    .returning();

  return newUser;
}

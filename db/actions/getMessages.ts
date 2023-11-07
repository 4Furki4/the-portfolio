import prisma from "../db";

export async function getMessages() {
  return await prisma.message.findMany({
    take: 100,
  });
}

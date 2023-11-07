"use server";
import { revalidatePath } from "next/cache";
import prisma from "../db";

export async function deleteMessage(id: string) {
  await prisma.message.delete({
    where: { id: id },
  });
  revalidatePath("/about");
}

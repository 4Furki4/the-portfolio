"use server";
import { getServerAuthSession } from "@/lib/auth";
import prisma from "../db";
import { revalidatePath } from "next/cache";
export default async function addGuestEntry(formData: FormData) {
  const session = await getServerAuthSession();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const email = session.user?.email as string;
  const created_by = session.user?.name as string;

  const entry = formData.get("entry")?.toString() || "";
  const body = entry.slice(0, 500);

  await prisma.message.create({
    data: {
      email,
      message: body,
      name: created_by,
    },
  });
  revalidatePath("/about");
}

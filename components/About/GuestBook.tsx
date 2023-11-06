import { getServerAuthSession } from "@/lib/auth";
import React, { Suspense } from "react";
import SigninForm from "./GuestBook/SigninForm";
import GuestBookForm from "./GuestBook/GuestBookForm";
import prisma from "@/db/db";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatRelative } from "date-fns";

export default async function GuestBook() {
  const session = await getServerAuthSession();
  return (
    <section className="flex flex-col gap-4">
      {session ? <GuestBookForm /> : <SigninForm />}
      <Suspense>
        <GuestBookEntries />
      </Suspense>
    </section>
  );
}

async function GuestBookEntries() {
  const messages = await prisma.message.findMany({
    take: 100,
  });
  return (
    <Card
      id="guestbook"
      className="backdrop-blur-xs bg-opacity-60 dark:bg-opacity-60"
    >
      <CardHeader className="text-fs-500 text-center">Guest Book</CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <p className="text-center text-fs-300 italic">
            There are no messages yet.
          </p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message.id} className="flex break-words">
                <p>
                  <span className="opacity-80">
                    {formatRelative(message.createdAt, new Date())} -
                  </span>{" "}
                  <span className="font-bold">{message.name}:</span>{" "}
                  {message.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

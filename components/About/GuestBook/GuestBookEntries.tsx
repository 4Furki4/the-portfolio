import { Card, CardContent, CardHeader } from "../../ui/card";
import { formatRelative } from "date-fns";
import { Session } from "next-auth";
import { Message } from "@prisma/client";
import { cn } from "@/lib/utils";
import { DeleteButton } from "./Buttons/DeleteButton";
import { getMessages } from "@/db/actions/getMessages";
import Image from "next/image";
import waitingSpongebob from "@/public/gifs/waiting-spongebob.gif";
export async function GuestBookEntries({
  session,
}: {
  session: Session | null;
}) {
  const messages = await getMessages();
  const messageStyle = (message: Message) => {
    if (session?.user?.email === message.email) {
      return "text-purple-900 dark:text-purple-600";
    }
    return "";
  };
  return (
    <Card
      id="guestbook"
      className="backdrop-blur-xs bg-opacity-60 dark:bg-opacity-60"
    >
      <CardHeader className="text-fs-500 text-center">Guest Book</CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <>
            <p className="text-center text-fs-300 italic">
              There are no messages yet.
            </p>
            <Image
              className="w-full h-auto object-cover rounded-sm"
              src={waitingSpongebob}
              alt="waiting spongebob"
              sizes="(min-width: 768px) 90vw, 75vw"
              quality={100}
            />
          </>
        ) : (
          <ul className="grid gap-2">
            {messages.map((message) => (
              <li key={message.id} className="flex items-center">
                <p className={cn(messageStyle(message))}>
                  <span className="opacity-80">
                    {formatRelative(message.createdAt, new Date())} -
                  </span>{" "}
                  <span className="font-bold">{message.name}:</span>{" "}
                  <span>{message.message}</span>
                </p>
                {session?.user?.email === message.email ||
                session?.user?.email === "muhammedcengiz1@gmail.com" ? (
                  <DeleteButton id={message.id} />
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

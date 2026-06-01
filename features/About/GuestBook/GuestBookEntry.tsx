import { cn } from "@/lib/utils";
import { Message } from "@prisma/client";
import { formatRelative } from "date-fns";
import { Session } from "next-auth";
import React from "react";
import { DeleteButton } from "./Buttons/DeleteButton";

export default function GuestBookEntry({
  message,
  session,
}: {
  message: Message;
  session: Session | null;
}) {
  const messageStyle = (message: Message) => {
    if (session?.user?.email === message.email) {
      return "text-purple-900 dark:text-purple-600";
    }
    return "";
  };
  return (
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
  );
}

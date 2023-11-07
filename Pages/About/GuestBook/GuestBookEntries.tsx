import { Session } from "next-auth";
import { getMessages } from "@/db/actions/getMessages";
import EntryNotFound from "./EntryNotFound";
import GuestBookEntry from "./GuestBookEntry";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
export async function GuestBookEntries({
  session,
}: {
  session: Session | null;
}) {
  const messages = await getMessages();
  return (
    <Card className="backdrop-blur-xs bg-opacity-60 dark:bg-opacity-60">
      <CardHeader className="text-fs-500 text-center">Guest Book</CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <EntryNotFound />
        ) : (
          <ul className="grid gap-2">
            {messages.map((message) => (
              <GuestBookEntry
                key={message.id}
                message={message}
                session={session}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

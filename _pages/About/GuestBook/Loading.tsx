import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

export default function Loading() {
  return (
    <Card>
      <CardHeader className="text-fs-500 text-center">
        <h2>Guest Book</h2>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4">
          {/* add skeleton ui style */}
          {new Array(5).fill(0).map((_, i) => (
            <li className="animate-pulse grid md:grid-cols-12 gap-2" key={i}>
              <span className="h-4 md:col-span-1 bg-card-foreground/75 rounded-md"></span>
              <span className="h-4 md:col-span-2 bg-card-foreground/75 rounded-md"></span>
              <span className="h-4 md:col-span-9 bg-card-foreground/75 rounded-md"></span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

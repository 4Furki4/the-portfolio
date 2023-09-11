import React from "react";

export default function CardHeader({ title }: { title: string }) {
  return (
    <h2 className="z-50 text-fs-500 font-bold pb-4 text-center">{title}</h2>
  );
}

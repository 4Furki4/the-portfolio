import React from "react";
import Image from "next/image";
import jsIcon from "@/public/svgs/js.svg";
import tsIcon from "@/public/svgs/ts.svg";
import csIcon from "@/public/svgs/cs.svg";
import nextIcon from "@/public/svgs/next.svg";
import angularIcon from "@/public/svgs/angular.svg";
import netIcon from "@/public/svgs/net.svg";
import reactIcon from "@/public/svgs/react.svg";
import mysqlLightIcon from "@/public/svgs/mysql-light.svg";
import mysqlDarkIcon from "@/public/svgs/mysql-dark.svg";
import nodejsIcon from "@/public/svgs/nodejs.svg";
import espressjsIcon from "@/public/svgs/expressjs.svg";
import prismaIcon from "@/public/svgs/prisma.svg";
import mongodb from "@/public/svgs/mongodb.svg";

export default function TechIcons() {
  return (
    <>
      <Image
        alt="JS Icon"
        src={jsIcon}
        width={300}
        height={100}
        className="max-w-max w-full h-[50px] mx-auto"
      />
      <Image
        alt="TS Icon"
        src={tsIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="Node.js Icon"
        src={nodejsIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="Express.js Icon"
        src={espressjsIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="Prisma Icon"
        src={prismaIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="React Icon"
        src={reactIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="Next Icon"
        src={nextIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="Angular Icon"
        src={angularIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="Net Icon"
        src={netIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="CS Icon"
        src={csIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
      <Image
        alt="MySQL Icon"
        src={mysqlLightIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px] dark:hidden"
      />
      <Image
        alt="MySQL Icon"
        src={mysqlDarkIcon}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px] hidden dark:block"
      />
      <Image
        alt="MongoDB Icon"
        src={mongodb}
        width={300}
        height={100}
        className="w-max-w w-full h-[50px]"
      />
    </>
  );
}

"use client";
import React, { useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import type { FancyboxOptions } from "@fancyapps/ui/dist/fancybox/fancybox";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function Fancybox(props: {
  children?: React.ReactNode;
  delegate?: string;
  options?: Partial<FancyboxOptions>;
  className?: string;
}) {
  useEffect(() => {
    const options = props.options || {};

    NativeFancybox.bind("[data-fancybox='gallery']", options);

    return () => {
      NativeFancybox.unbind("[data-fancybox='gallery']");
      NativeFancybox.close();
    };
  });

  return <div className={props.className}>{props.children}</div>;
}

export default Fancybox;

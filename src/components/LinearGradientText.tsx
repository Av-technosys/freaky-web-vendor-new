import React from "react";
import { cn } from "../lib/utils";

const LinearGradientText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "bg-linear-to-r from-[#FFC107] to-[#FF5722] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default LinearGradientText;

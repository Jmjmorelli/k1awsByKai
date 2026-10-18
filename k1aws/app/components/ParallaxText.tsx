import { type ReactNode } from "react";

type ParallaxTextProps = {
  children: ReactNode;
  className?: string;
};

export default function ParallaxText({ children, className }: ParallaxTextProps) {
  return <div className={className}>{children}</div>;
}

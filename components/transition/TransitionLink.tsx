"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "@/components/transition/TransitionProvider";

type Props = React.ComponentProps<typeof Link>;

export default function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { cover } = useTransition();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    const targetPath = typeof href === "string" ? href : href.pathname ?? "";
    if (targetPath === pathname) {
      e.preventDefault();
      return;
    }

    // Let the browser handle modified clicks (new tab, etc.) normally.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    await cover();
    router.push(targetPath);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}

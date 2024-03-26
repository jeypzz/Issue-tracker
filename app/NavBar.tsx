"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { usePathname } from "next/navigation";
import { Box, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];
  return (
    <nav className="border-b mb-5 px-5 h-14 ">
      <Flex>
        <Flex>
          <Link href={"/"}>
            <AiFillBug />
          </Link>
          <ul className="flex space-x-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  className={classnames({
                    "text-indigo-400": link.href !== currentPath,
                    "text-indigo-800": link.href === currentPath,
                    "hover:text-indigo-600 transition-colors": true,
                  })}
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Flex>
        <Box>
          {status === "authenticated" && (
            <Link href="api/auth/signout">Log out</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="api/auth/signin">Log In</Link>
          )}
        </Box>
      </Flex>
    </nav>
  );
};

export default NavBar;

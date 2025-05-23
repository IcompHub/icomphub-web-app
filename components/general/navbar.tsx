"use client";

import { Button } from "@/components/ui/button";
import { Menu, UserRound } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type React from "react"; // Added import for React
import { Logo } from "./logo";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <Link href="/" className="flex items-center space-x-2">
        <Logo w={30} h={30} />
        <span className="text-white font-medium text-xl">IcompHub</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/technologies">Tecnologias</NavLink>
        <NavLink href="/project">Projetos</NavLink>
        <NavLink href="/about-us">Quem somos</NavLink>
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <Button
          variant="ghost"
          className="bg-[#080D17] hover:[#1A222F] text-white px-8 cursor-pointer border border-[#1A222F]"
        >
          <UserRound className="mr-2 h-5 w-5" />
          Entrar
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white cursor-pointer"
      >
        <Menu className="w-6 h-6" />
      </Button>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full" />
    </Link>
  );
}

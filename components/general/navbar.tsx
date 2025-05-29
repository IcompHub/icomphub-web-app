"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, UserRound, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type React from "react";
import { Logo } from "./logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
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
        <Link href={`/login-user`} className="h-fit">
          <Button
            variant="ghost"
            className="bg-[#080D17] hover:[#1A222F] text-white px-8 cursor-pointer border border-[#1A222F]"
          >
            <UserRound className="mr-2 h-5 w-5" />
            Entrar
          </Button>
        </Link>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="md:hidden text-white cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="fixed top-0 right-0 w-64 rounded-b-md bg-[#080D17] z-50 flex flex-col p-6 shadow-lg md:hidden backdrop-blur"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-white font-medium text-xl"> </span>
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <nav className="flex flex-col gap-6">
              <NavLink href="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </NavLink>
              <NavLink href="/technologies" onClick={() => setOpen(false)}>
                Tecnologias
              </NavLink>
              <NavLink href="/project" onClick={() => setOpen(false)}>
                Projetos
              </NavLink>
              <NavLink href="/about-us" onClick={() => setOpen(false)}>
                Quem somos
              </NavLink>

              <Link href={`/login-user`} className="h-fit">
                <Button
                  variant="ghost"
                  className="bg-[#080D17] w-full hover:[#1A222F] text-white cursor-pointer border border-[#1A222F] mt-4"
                >
                  <UserRound className="mr-2 h-5 w-5" />
                  Entrar
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full" />
    </Link>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, FolderOpenDot, Sparkles } from "lucide-react";
import { FloatingPaper } from "@/components/home/floating-paper";
import { RoboAnimation } from "@/components/home/robo-animation";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center">
      {/* Floating papers background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingPaper count={6} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6  rounded-2xl p-1">
              IcompHub: um portfólio seguro para
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                {" "}
                [PES]
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
          >
            Aqui você encontra os melhores projetos desenvolvidos pelos melhores
            alunos na disciplina de Prática em Engenharia de Software
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/project">
              <Button
                size="lg"
                className="bg-[#080D17] hover:[#1A222F] text-white px-8 cursor-pointer border border-[#1A222F]"
              >
                <FolderOpenDot className="mr-2 h-5 w-5" />
                Ver projetos
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Animated robot */}
      <div className="absolute bottom-0 right-0 w-96 h-96">
        <RoboAnimation />
      </div>
    </div>
  );
}

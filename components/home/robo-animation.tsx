"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { Logo } from "../general/logo";

export function RoboAnimation() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-4 bg-[#00c8ff46] rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          {/* <Bot className="w-32 h-32 text-purple-500" /> */}
          <Logo w={100} h={100} />
        </div>
      </motion.div>
    </div>
  );
}

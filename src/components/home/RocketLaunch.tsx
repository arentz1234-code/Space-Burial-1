"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export default function RocketLaunch() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Rocket */}
      <motion.div
        initial={{ x: "20vw", y: "80vh", rotate: -45 }}
        animate={{
          x: ["20vw", "30vw", "50vw", "75vw"],
          y: ["80vh", "50vh", "20vh", "-20vh"],
          rotate: -45,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeOut",
        }}
        className="absolute z-20"
      >
        {/* Rocket body */}
        <div className="relative">
          <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-cosmic-white to-cosmic-white/80 rounded-full flex items-center justify-center shadow-lg shadow-cosmic-gold/30">
            <Rocket className="w-4 h-4 sm:w-6 sm:h-6 text-space-black rotate-45" />
          </div>

          {/* Rocket flame */}
          <motion.div
            animate={{
              scaleY: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
            }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-45 origin-top"
          >
            <div className="w-3 h-8 sm:w-4 sm:h-12 bg-gradient-to-b from-cosmic-gold via-orange-500 to-transparent rounded-full blur-[2px]" />
          </motion.div>

          {/* Outer glow */}
          <div className="absolute inset-0 w-8 h-8 sm:w-12 sm:h-12 bg-cosmic-gold/50 rounded-full blur-xl" />
        </div>
      </motion.div>

      {/* Smoke trail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 4,
        }}
        className="absolute z-10"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${20 + i * 2.75}vw`,
              y: `${80 - i * 5}vh`,
              scale: 0,
              opacity: 0,
            }}
            animate={{
              x: `${20 + i * 2.75}vw`,
              y: `${80 - i * 5}vh`,
              scale: [0, 1.5, 2],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              repeatDelay: 9,
            }}
            className="absolute w-4 h-4 sm:w-8 sm:h-8 bg-white/20 rounded-full blur-md"
          />
        ))}
      </motion.div>
    </div>
  );
}

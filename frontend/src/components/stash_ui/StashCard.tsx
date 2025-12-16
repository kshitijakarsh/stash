"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function StashCard() {
  const staticStash = {
    0: [
      { id: "1", url: "github.com" },
      { id: "2", url: "docs.react.dev" },
    ],
    1: [{ id: "3", url: "vercel.com" }],
    2: [{ id: "4", url: "tailwindcss.com" }],
    3: [{ id: "5", url: "openai.com" }],
  } as const;

  const listVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 6,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-2 gap-4 flex-1 overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="relative rounded-xl border p-3 bg-white/50 backdrop-blur-sm overflow-hidden"
        >
          <motion.div
            className="flex flex-col gap-1"
            variants={listVariants}
            initial="hidden"
            animate="show"
          >
            {staticStash[i as 0 | 1 | 2 | 3].slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="text-xs bg-neutral-100/90 px-2 py-1 rounded-sm truncate"
              >
                {item.url}
              </motion.div>
            ))}
          </motion.div>

          {staticStash[i as 0 | 1 | 2 | 3].length > 3 && (
            <span className="absolute bottom-2 right-2 text-[10px] text-neutral-500">
              +{staticStash[i as 0 | 1 | 2 | 3].length - 3} more
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

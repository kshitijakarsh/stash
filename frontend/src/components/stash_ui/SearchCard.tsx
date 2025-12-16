"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const QUERY = "design systems";
const RESULTS = ["Design tokens", "UI patterns", "Component libraries"];

export default function SearchCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [phase, setPhase] = useState<"move" | "click" | "type" | "results">(
    "move"
  );
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inputRef.current || !containerRef.current) return;

    const inputBox = inputRef.current.getBoundingClientRect();
    const containerBox = containerRef.current.getBoundingClientRect();

    setTarget({
      x: inputBox.left - containerBox.left + inputBox.width * 0,
      y: inputBox.top - containerBox.top + inputBox.height / 10,
    });
  }, [cycle]);

  useEffect(() => {
    if (phase !== "type") return;

    let i = 0;
    setTyped("");

    const interval = setInterval(() => {
      setTyped(QUERY.slice(0, i + 1));
      i++;

      if (i === QUERY.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("results"), 500);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "results") return;

    setShowResults(true);

    const t = setTimeout(() => {
      setTyped("");
      setShowResults(false);
      setPhase("move");
      setCycle((c) => c + 1);
    }, 2200);

    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-md mx-auto rounded-2xl bg-white/60 p-6 shadow-sm backdrop-blur overflow-hidden"
    >
      <AnimatePresence>
        {phase === "move" && (
          <motion.div
            key={`arrow-${cycle}`}
            className="absolute z-10"
            initial={{ x: 60, y: 80, opacity: 0 }}
            animate={{ x: target.x, y: target.y, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => setPhase("click")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="2o"
              viewBox="0 0 32 32"
            >
              <path d="M 13 2 C 11.355469 2 10 3.355469 10 5 L 10 16.8125 L 9.34375 16.125 L 9.09375 15.90625 C 7.941406 14.753906 6.058594 14.753906 4.90625 15.90625 C 3.753906 17.058594 3.753906 18.941406 4.90625 20.09375 L 4.90625 20.125 L 13.09375 28.21875 L 13.15625 28.25 L 13.1875 28.3125 C 14.535156 29.324219 16.253906 30 18.1875 30 L 19.90625 30 C 24.441406 30 28.09375 26.347656 28.09375 21.8125 L 28.09375 14 C 28.09375 12.355469 26.738281 11 25.09375 11 C 24.667969 11 24.273438 11.117188 23.90625 11.28125 C 23.578125 9.980469 22.394531 9 21 9 C 20.234375 9 19.53125 9.300781 19 9.78125 C 18.46875 9.300781 17.765625 9 17 9 C 16.648438 9 16.316406 9.074219 16 9.1875 L 16 5 C 16 3.355469 14.644531 2 13 2 Z M 13 4 C 13.554688 4 14 4.445313 14 5 L 14 16 L 16 16 L 16 12 C 16 11.445313 16.445313 11 17 11 C 17.554688 11 18 11.445313 18 12 L 18 16 L 20 16 L 20 12 C 20 11.445313 20.445313 11 21 11 C 21.554688 11 22 11.445313 22 12 L 22 16 L 24.09375 16 L 24.09375 14 C 24.09375 13.445313 24.539063 13 25.09375 13 C 25.648438 13 26.09375 13.445313 26.09375 14 L 26.09375 21.8125 C 26.09375 25.277344 23.371094 28 19.90625 28 L 18.1875 28 C 16.722656 28 15.457031 27.476563 14.40625 26.6875 L 6.3125 18.6875 C 5.867188 18.242188 5.867188 17.757813 6.3125 17.3125 C 6.757813 16.867188 7.242188 16.867188 7.6875 17.3125 L 12 21.625 L 12 5 C 12 4.445313 12.445313 4 13 4 Z"></path>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "click" && (
          <motion.div
            key={`pointer-${cycle}`}
            className="absolute z-10"
            initial={{ x: target.x, y: target.y, scale: 1 }}
            animate={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onAnimationComplete={() => setPhase("type")}
          ></motion.div>
        )}
      </AnimatePresence>

      {phase === "click" && (
        <motion.div
          key={`ripple-${cycle}`}
          className="absolute h-6 w-6 rounded-full border border-black"
          initial={{
            x: target.x - 6,
            y: target.y - 6,
            scale: 0,
            opacity: 0.6,
          }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      )}

      <input
        ref={inputRef}
        disabled
        value={typed}
        placeholder="Search your stash"
        className="w-full rounded-lg border bg-white px-4 py-2 text-sm text-neutral-800 outline-none"
      />

      <div className="mt-4 space-y-2">
        {showResults &&
          RESULTS.map((item, i) => (
            <motion.div
              key={`${item}-${cycle}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="rounded-md bg-white/90 px-3 py-2 text-xs"
            >
              {item}
            </motion.div>
          ))}
      </div>
    </div>
  );
}

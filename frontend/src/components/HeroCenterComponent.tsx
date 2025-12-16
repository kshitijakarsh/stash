"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import LinkCard from "./stash_ui/LinkCard";

type TargetIndex = 0 | 1 | 2 | 3;

type QueueItem = {
  id: string;
  url: string;
  targetIndex: TargetIndex;
};

const INITIAL_LINKS: QueueItem[] = [
  { id: "1", url: "github.com", targetIndex: 0 },
  { id: "2", url: "youtube.com", targetIndex: 1 },
  { id: "3", url: "figma.com", targetIndex: 2 },
  { id: "4", url: "twitter.com", targetIndex: 3 },
  { id: "5", url: "react.dev", targetIndex: 0 },
  { id: "6", url: "vercel.com", targetIndex: 3 },
];

const EMPTY_STASH: Record<TargetIndex, QueueItem[]> = {
  0: [],
  1: [],
  2: [],
  3: [],
};

const FLIGHT_DURATION = 1200;
const LOOP_INTERVAL = 1500;

export default function HeroCenterComponent() {
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_LINKS);
  const [stashed, setStashed] =
    useState<Record<TargetIndex, QueueItem[]>>(EMPTY_STASH);
  const [activeItem, setActiveItem] = useState<QueueItem | null>(null);
  const [sourcePoint, setSourcePoint] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const isProcessing = useRef(false);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const registerRef = (id: string, el: HTMLDivElement | null) => {
    cardRefs.current[id] = el;
  };

  const reset = useCallback(() => {
    setQueue(INITIAL_LINKS);
    setStashed(EMPTY_STASH);
    setActiveItem(null);
    setSourcePoint(null);
    isProcessing.current = false;
  }, []);

  const processNext = useCallback(() => {
    if (isProcessing.current || !queue.length) return;

    const item = queue[0];
    isProcessing.current = true;

    setQueue((q) => q.slice(1));
    setActiveItem(item);

    setTimeout(() => {
      setStashed((prev) => ({
        ...prev,
        [item.targetIndex]: [...prev[item.targetIndex], item],
      }));
      setActiveItem(null);
      isProcessing.current = false;
    }, FLIGHT_DURATION);
  }, [queue]);

  useEffect(() => {
    if (!activeItem || !containerRef.current) {
      setSourcePoint(null);
      return;
    }

    const el = cardRefs.current[activeItem.id];
    if (!el) return;

    const cardRect = el.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setSourcePoint({
      x: cardRect.right - containerRect.left,
      y: cardRect.top + cardRect.height / 2 - containerRect.top,
    });
  }, [activeItem]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (queue.length) processNext();
      else if (!activeItem) setTimeout(reset, 1000);
    }, LOOP_INTERVAL);

    return () => clearInterval(interval);
  }, [queue.length, activeItem, processNext, reset]);

  return (
    <div
      ref={containerRef}
      className="mt-10 relative w-full max-w-6xl mx-auto p-10 min-h-110 rounded-3xl overflow-hidden flex items-center justify-center bg-linear-to-b from-white/20 to-white/40"
    >
      <div className="relative z-10 flex w-full justify-between items-center gap-10">
        <FeedList
          queue={queue}
          activeId={activeItem?.id}
          registerRef={registerRef}
        />
        <CenterLogo active={!!activeItem} />
        <StashGrid
          stashed={stashed}
          activeTarget={activeItem?.targetIndex ?? null}
        />
      </div>

      <AnimatePresence>
        {activeItem && <GhostCard item={activeItem} />}
      </AnimatePresence>
    </div>
  );
}

function FeedList({
  queue,
  activeId,
  registerRef,
}: {
  queue: QueueItem[];
  activeId?: string;
  registerRef: (id: string, el: HTMLDivElement | null) => void;
}) {
  return (
    <motion.div
      layout
      className="bg-linear-to-b from-white/40 to-white/40 rounded-2xl overflow-hidden"
      animate={{ padding: queue.length ? 16 : 8 }}
    >
      <motion.div layout className="flex flex-col gap-2 w-64">
        <AnimatePresence mode="popLayout">
          {queue.map((item) => {
            const isActive = item.id === activeId;

            return (
              <motion.div
                key={item.id}
                layout
                ref={(el) => registerRef(item.id, el)}
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
              >
                <LinkCard link={item.url} />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {!queue.length && (
          <div className="text-sm italic text-neutral-500 text-center py-4">
            Reloading…
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CenterLogo({ active }: { active: boolean }) {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      animate={{ scale: active ? 1.2 : 1.15 }}
      transition={{ duration: 0.2 }}
    >
      {active && <div className="absolute inset-0 rounded-full blur-xl" />}
      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md border">
        <Image src="/stash_logo.png" width={42} height={42} alt="Stash" />
      </div>
    </motion.div>
  );
}

function StashGrid({
  stashed,
  activeTarget,
}: {
  stashed: Record<TargetIndex, QueueItem[]>;
  activeTarget: TargetIndex | null;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 w-90">
      {[0, 1, 2, 3].map((i) => {
        const isActive = activeTarget === i;

        return (
          <div
            key={i}
            className="relative h-28 rounded-xl border p-2 transition bg-linear-to-b from-white/40 to-white/40"
          >
            <div className="flex flex-col gap-1">
              {stashed[i as TargetIndex].map((item) => (
                <div
                  key={item.id}
                  className="text-xs bg-neutral-100 px-2 py-1 rounded-sm truncate"
                >
                  {item.url}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GhostCard({ item }: { item: QueueItem }) {
  return (
    <motion.div
      className="absolute z-50 pointer-events-none"
      initial={{ x: -320, y: -80, scale: 1, opacity: 1 }}
      animate={{
        x: [-320, 0, item.targetIndex % 2 ? 520 : 340],
        y: [-80, 0, item.targetIndex < 2 ? -60 : 60],
        scale: [1, 0.35, 0.25],
        opacity: [1, 1, 0],
      }}
      transition={{ duration: 1.2, times: [0, 0.4, 1] }}
    >
      <div className="bg-white rounded-lg px-4 py-3 shadow-xl w-52 font-bold text-sm">
        {item.url}
      </div>
    </motion.div>
  );
}
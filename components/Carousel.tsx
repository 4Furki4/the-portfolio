import Image from "next/image";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function Carousel({
  images,
  className,
}: {
  images: CardImageProps[];
  className?: string;
}) {
  const [[page, direction], setPage] = React.useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);
  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          className={twMerge(
            clsx(
              "min-h-[200px] absolute top-0 left-0 h-full w-full cursor-grab active:cursor-grabbing",
              className
            )
          )}
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              setPage([page + 1, 1]);
            } else if (swipe > swipeConfidenceThreshold) {
              setPage([page - 1, -1]);
            }
          }}
        >
          <Image
            className="rounded-lg min-h-[200px] h-full object-contain pointer-events-none absolute top-0 left-0 aspect-square"
            src={images[imageIndex].src}
            alt={images[imageIndex].alt}
            width={1920}
            height={1080}
            quality={100}
            priority
            loading="eager"
            sizes="100vw"
          />
          <ArrowLeft
            onClick={() => setPage([page - 1, -1])}
            className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform duration-300 absolute top-1/2 left-2 transform -translate-y-1/2 cursor-pointer"
            size={36}
          />
          <ArrowRight
            onClick={() => setPage([page + 1, 1])}
            className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform duration-300 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
            size={36}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

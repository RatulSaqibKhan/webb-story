'use client';

import { Typography } from 'antd';
import { motion } from 'framer-motion';
import { StarsCanvas } from '../common/StarsCanvas';

const { Paragraph } = Typography;

const sentence = "Hi, I’m Saqib.";

export default function HeroSection() {
  return (
    <section className="hero relative h-screen w-full overflow-hidden flex items-center justify-center text-white px-4 sm:px-8">
      {/* Background stars */}
      <StarsCanvas />

      {/* Animated hero content */}
      <motion.div
        className="relative z-10 text-center max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06, // each letter delay
            },
          },
        }}
      >
        {/* Title: letter by letter animation */}
        <motion.h1
          className="!text-white !text-4xl md:!text-8xl !font-limelight font-bold"
          aria-label={sentence}
        >
          {sentence.split("").map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Paragraph */}
        <Paragraph className="!text-white sm:text-lg mt-4">
          Crafting web magic through code & creativity.
        </Paragraph>

        {/* Scroll hint */}
        <motion.div
          className="mt-8 text-sm animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          ↓ Scroll to explore
        </motion.div>
      </motion.div>
    </section>
  );
}

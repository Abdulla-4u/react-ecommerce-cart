import { motion, AnimatePresence } from "framer-motion";

const AnimatedCartCount = ({ count }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={count}
        initial={{ opacity: 0, y: -10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="inline-block"
      >
        {count}
      </motion.span>
    </AnimatePresence>
  );
};

export default AnimatedCartCount;

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const TotalPrice = ({ total, className = "" }) => {
  const [displayed, setDisplayed] = useState("0.00");
  const motionVal = useMotionValue(0);

  useEffect(() => {
    const controls = animate(motionVal, total, {
      duration: 1.2,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => setDisplayed(v.toFixed(2)),
    });

    return () => controls.stop();
  }, [total]);

  return <motion.h2 className={className}>${displayed}</motion.h2>;
};

export default TotalPrice;

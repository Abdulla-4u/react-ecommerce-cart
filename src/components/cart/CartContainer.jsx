import { useContext, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../context/AppContext";
import AnimatedCartCount from "./AnimatedCartCount";
import OrderDetails from "./OrderDetails";
import EmptyCart from "./EmptyCart";

const CartContainer = () => {
  const { cart } = useContext(AppContext);
  const hasItems = cart.length > 0;

  return (
    <div className="lg:w-[30%] w-full lg:px-4 px-2">
      <motion.div
        className="w-full cartContainer bg-white rounded-2xl max-w-md shadow-xl p-6 space-y-5 mt-10 mx-auto overflow-hidden"
      >
        <h2 className="text-2xl font-bold text-red">
          Your Cart (<AnimatedCartCount count={cart.length} />)
        </h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={hasItems ? "order" : "empty"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {hasItems ? <OrderDetails /> : <EmptyCart />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default memo(CartContainer);

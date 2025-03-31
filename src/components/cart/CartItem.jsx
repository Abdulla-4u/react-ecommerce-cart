import React, { useContext, useState } from "react";
import remove_Icon from "../../assets/images/icon-remove-item.svg";
import { AppContext } from "../../context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import { RemoveFromCartIcon } from "../icons/icons";
const CartItem = ({ item }) => {
  const { Remove_from_Cart } = useContext(AppContext);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => Remove_from_Cart(item.id), 600); 
  };

  return (
    <AnimatePresence mode="wait">
      {!isRemoving && (
        <motion.div
          layout
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.9 }}
          transition={{
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="flex items-center justify-between border-b border-gray-200 pb-4 overflow-hidden"
        >
          <div>
            <h4 className="text-sm text-rose-950 font-bold">{item.name}</h4>
            <div className="flex items-center text-xs mt-1 gap-1.5">
              <span className="font-bold text-red">{item.quantity}x</span>
              <span className="text-rose-500 font-normal">@  ${item.price.toFixed(2)}</span>
              <span className="font-bold text-rose-950">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleRemove}
            className="size-4 flex items-center justify-center border-[1.5px] border-rose-300 rounded-full group/button hover:border-rose-900 transition-colors duration-300"
          >
            <RemoveFromCartIcon className="text-rose-300 group-hover/button:text-rose-900 w-2 transition-colors duration-300 animate-none" />
          </motion.button>

        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default CartItem;

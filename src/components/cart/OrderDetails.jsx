import React, { useCallback, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import CartItem from "./CartItem";
import TotalPrice from "./TotalPrice";
import { motion } from "framer-motion";
const OrderDetails = () => {
  const { total_Price, cart, confirmOrder } = useContext(AppContext);

  const handleConfirmOrder = useCallback(() => {
    confirmOrder();
  }, [confirmOrder]);

  return (
    <motion.div layout>
      <div className="space-y-4">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 border-t border-gray-100 pt-3">
        <p className="text-sm text-rose-500 font-normal">Order Total</p>
        <TotalPrice total={total_Price} className="text-2xl font-bold text-rose-950" />
      </div>

      <div className="flex items-center justify-center gap-2 bg-rose-50 rounded-xl p-3 my-3 duration-500 transition">
        <img src="/images/icon-carbon-neutral.svg" alt="carbon-neutral" className="w-5 h-5" />
        <p className="text-sm font-normal">
          This is a <span className="font-bold">carbon-neutral</span> delivery
        </p>
      </div>

      <button
        onClick={handleConfirmOrder}
        className="w-full py-3 text-white shadow-lg hover:shadow-xl active:scale-95 font-medium text-sm bg-rose-600 rounded-full hover:bg-rose-800 duration-500"
      >
        Confirm Order
      </button>
    </motion.div>
  );
};


export default OrderDetails;

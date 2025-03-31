import React, { memo, useCallback, useContext, useEffect } from "react";
import { OrderConfirmIcon } from "../icons/icons";
import { AppContext } from "../../context/AppContext";
import TotalPrice from "./TotalPrice";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmedOrder = () => {
  const { cart, total_Price, confirmOrder, Clear_Cart } = useContext(AppContext);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      confirmOrder();
    }
  }, [confirmOrder]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => document.body.style.overflow = "";
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/60 z-50 flex sm:items-center items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="max-w-md w-full max-h-[90vh] sm:px-7 px-3.5 sm:py-5 py-3 bg-white overflow-y-auto sm:rounded-xl rounded-t-xl flex flex-col shadow-lg"
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ scrollbarWidth: "none" }}
        >
          <div className="sticky top-0 z-10 bg-white pt-1 pb-3">
            <OrderConfirmIcon className="animate-none sm:w-10 w-8" />
            <div className="flex flex-col mt-1">
              <h1
                className="text-3xl text-rose-950 font-bold cursor-pointer"
                onClick={confirmOrder}
              >
                Order Confirmed
              </h1>
              <p className="text-sm text-rose-400 mt-1">
                We hope you enjoy your food!
              </p>
            </div>
          </div>

          <div className="w-full bg-rose-50 px-4 py-5 rounded-lg mt-3">
            <div className="flex flex-col">
              {cart.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
              <div className="flex items-center justify-between w-full mt-4">
                <h4 className="text-rose-500 font-medium text-xs">
                  Order Total
                </h4>
                <TotalPrice
                  total={total_Price}
                  className="text-xl font-bold text-rose-950"
                />
              </div>
            </div>
          </div>
          <button
            onClick={Clear_Cart}
            className="w-full py-3 text-white shadow-lg hover:shadow-xl active:scale-95 font-medium mt-6 text-xs bg-rose-600 rounded-full hover:bg-rose-800 duration-500"
          >
            Start New Order
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(ConfirmedOrder);

const ProductItem = ({ item }) => {
  const { image, name, price, quantity } = item;
  const totalPrice = (price * quantity).toFixed(2);
  
  return (
    <div className="flex items-center justify-between w-full border-b border-gray-200 py-3">
      <div className="flex gap-2">
        <img
          src={image.thumbnail}
          alt={name}
          className="w-10 h-10 object-cover rounded-md"
          loading="lazy"
        />
        <div>
          <h4 className="text-xs text-rose-950 font-bold">{name}</h4>
          <p className="text-xs pt-1 text-rose-400 font-medium">
            <span className="text-red font-bold pr-2">{quantity}x</span>@ $
            {price.toFixed(2)}
          </p>
        </div>
      </div>
      <h5 className="text-sm text-rose-950 font-bold">${totalPrice}</h5>
    </div>
  );
};

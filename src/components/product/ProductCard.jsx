import React, { memo, useContext, useMemo } from "react";
import { AppContext } from "../../context/AppContext";
import TotalPrice from "../cart/TotalPrice";
import { AddToCartIcon, MinusIcon, PlusIcon } from "../icons/icons";
import { AnimatePresence , motion} from "framer-motion";

const ProductCard = ({ product, idx }) => {
  const { cart, Add_to_Cart, Increment_Quantity, Decrement_Quantity } = useContext(AppContext);

  const cartItem = useMemo(() => cart.find((item) => item.id === product.id), [cart, product.id]);
  const isInCart = Boolean(cartItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1], 
      }}
      className="relative max-w-sm w-full rounded-xl overflow-hidden group transition-all duration-300"
    >
      <img
        loading="lazy"
        src={product.image.desktop}
        srcSet={`
          ${product.image.mobile} 480w,
          ${product.image.tablet} 768w,
          ${product.image.desktop} 1024w
        `}
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        alt={product.name}
        className={`w-full h-60 object-cover rounded-xl border-2 ${
          isInCart ? "border-rose-600" : "border-transparent"
        } group-hover:border-rose-600 transition-all duration-300`}
      />

      <div className="absolute inset-x-0 bottom-[4.5rem] flex justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isInCart ? (
            <motion.div
              key="quantity-control"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-36 px-3 py-2.5 rounded-full bg-red text-white flex items-center justify-between shadow-xl hover:shadow-2xl"
            >
              <ControlButton onClick={() => Decrement_Quantity(product.id)}>
                <MinusIcon className="w-[10px] text-white group-hover/button:text-red animate-none " />
              </ControlButton>

              <p className="font-normal text-base">{cartItem?.quantity}</p>

              <ControlButton onClick={() => Increment_Quantity(product.id)}>
                <PlusIcon className="w-[10px] text-white group-hover/button:text-red animate-none " />
              </ControlButton>
            </motion.div>
          ) : (
            <motion.button
              key="add-to-cart"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => Add_to_Cart(product)}
              className="CartBtn border-[1.4px] border-black/25 group/button hover:border-red"
            >
              <span className="IconContainer">
                <AddToCartIcon className="text-red animate-none " />
              </span>
              <p className="text text-rose-950 font-semibold group-hover/button:text-red">
                Add to Cart
              </p>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 px-1">
        <p className="text-sm font-normal text-rose-400">{product.category}</p>
        <h2 className="text-rose-950 font-semibold text-base line-clamp-1">{product.name}</h2>
        <TotalPrice total={product.price} className="font-bold text-red text-base" />
      </div>
    </motion.div>
  );
};

const ControlButton = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="size-5 flex items-center justify-center border border-white rounded-full hover:bg-white group/button transition-colors duration-300"
  >
    {children}
  </button>
);

export default memo(ProductCard);


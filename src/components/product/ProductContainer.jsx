import React, { memo } from "react";
import ProductCard from "./ProductCard";
import Products from "../../../data.json";
import { motion } from "framer-motion";
const ProductContainer = () => {
  return (
    <section className="lg:w-[70%] w-full mx-auto">
      <h1 className="sm:px-6 px-5 pt-3 sm:pt-5 font-bold sm:text-4xl text-3xl text-rose-950">
        Desserts
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 sm:px-5 pt-4 pb-10 place-items-center"
      >
        {Products.map((product, idx) => (
          <ProductCard product={product} key={product.id || idx} idx={idx} />
        ))}
      </motion.div>
    </section>
  );
};

export default memo(ProductContainer);

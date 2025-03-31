import React from "react";
const EmptyCart = React.memo(() => {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <img
        className="w-32 object-cover"
        loading="lazy"
        src="/images/illustration-empty-cart.svg"
        alt="An illustration of an empty cart"
      />
      <p className="text-sm text-rose-500 font-medium">
        Your added items will appear here
      </p>
    </div>
  );
});

export default EmptyCart;

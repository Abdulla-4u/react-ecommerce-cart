import { lazy, Suspense, useContext} from "react";
import { AppContext } from "./context/AppContext";
import { AnimatePresence } from "framer-motion";
import Loader from "./components/Loader";
import Lenis from "lenis";

const LazyProductContainer = lazy(() => import("./components/product/ProductContainer"));
const LazyCartContainer = lazy(() => import("./components/cart/CartContainer"));
const LazyConfirmedOrder = lazy(() => import("./components/cart/ConfirmedOrder"));

function App() {
  const { orderConfirmationStatus } = useContext(AppContext);

  const lenis = new Lenis({
    autoRaf: true,
  });

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-rose-100 flex lg:flex-row flex-col items-center sm:items-start pb-8">
      <Suspense fallback={<Loader />}>
        <LazyProductContainer />
        <LazyCartContainer />
      </Suspense>
      <AnimatePresence>
        {orderConfirmationStatus && <LazyConfirmedOrder />}
      </AnimatePresence>
    </div>
  );
}

export default App;

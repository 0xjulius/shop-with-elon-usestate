import { useState } from "react";
import { FaGithub, FaShoppingCart, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedNumbers from "react-animated-numbers";
import CheckoutModal from "./components/CheckoutModal";
import "./App.css";

import Img1 from "./img/img1.jpg";
import Img2 from "./img/img2.jpg";
import Img3 from "./img/img3.jpg";
import Img4 from "./img/img4.jpg";
import Img5 from "./img/img5.jpg";
import Img6 from "./img/img6.jpg";
import Img7 from "./img/img7.jpg";
import Img8 from "./img/img8.jpg";
import Img9 from "./img/img9.jpg";

const INITIAL_NET_WORTH = 1013000000000;

const PRODUCTS = [
  {
    id: 1,
    title: "Gulfstream G650ER Jet Aircraft",
    price: 49995000,
    image: Img1,
    description: "The most fastest ultra-long-range business jet in the world.",
  },
  {
    id: 2,
    title: "Patek Philippe Grandmaster Chime",
    price: 2800000,
    image: Img2,
    description: "The most complicated Patek Philippe wristwatch ever-made.",
  },
  {
    id: 3,
    title: "Lamborghini Veneno Roadster 2013",
    price: 4000000,
    image: Img3,
    description:
      "Limited edition supercar made by Lamborghini for its 50th anniversary in 2013.",
  },
  {
    id: 4,
    title: "Karambit Case Hardened Seed / Pattern: 387",
    price: 1500000,
    image: Img4,
    description:
      "The #1 ‘387’ pattern 'Blue Gem' - Most valuable and rare skin in CS2.",
  },
  {
    id: 5,
    title: "Cruciani 12-Cross Bracelet",
    price: 60500000,
    image: Img5,
    description: "A beautiful bracelet gifted by a friend.",
  },
  {
    id: 6,
    title: "Baldessarini Deluxe 1.0 L",
    price: 20000000,
    image: Img6,
    description: "A luxurious and exclusive fragrance with a unique scent.",
  },
  {
    id: 7,
    title: "Rolex Daytona Platinum",
    price: 5511500,
    image: Img7,
    description: "An exclusive platinum chronograph watch from Rolex.",
  },
  {
    id: 8,
    title: "Bali Mandara Resort",
    price: 8000000,
    image: Img8,
    description: "A luxurious resort stay in Bali.",
  },
  {
    id: 9,
    title: "Superyacht A",
    price: 440000000,
    image: Img9,
    description: "One of the most luxurious superyachts in the world.",
  },
];

const formatCurrency = (val) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(val);

function App() {
  const [quantities, setQuantities] = useState(Array(PRODUCTS.length).fill(0));
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const updateQuantity = (index, delta) => {
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = Math.max(0, updated[index] + delta);
      return updated;
    });
  };

  const totalPrice = PRODUCTS.reduce(
    (sum, product, index) => sum + product.price * quantities[index],
    0,
  );

  const totalProducts = quantities.reduce((acc, curr) => acc + curr, 0);
  const remainingNetWorth = INITIAL_NET_WORTH - totalPrice;

  // Pad string with leading zeros to maintain fixed length and prevent shifting/layout bugs
  const netWorthString = remainingNetWorth.toLocaleString("en-US");
  const paddedNetWorthString = netWorthString.padStart(15, "0");
  const totalLength = paddedNetWorthString.length;

  const cartItems = PRODUCTS.map((product, index) => ({
    ...product,
    quantity: quantities[index],
    index,
  })).filter((item) => item.quantity > 0);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-30 bg-green-600 hover:bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center space-x-3 transition-transform hover:scale-105"
        aria-label="Open Shopping Cart"
      >
        <FaShoppingCart className="w-6 h-6" />
        <span className="font-bold text-lg">{totalProducts}</span>
      </button>

      {/* Slide-over Shopping Cart Drawer with Framer Motion */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black bg-opacity-70"
              onClick={() => setIsCartOpen(false)}
            />

            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-[#1e1e1e] text-white p-6 shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <FaShoppingCart className="text-green-500" /> Your Cart
                    </h2>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 text-gray-400 hover:text-white rounded-lg"
                      aria-label="Close cart"
                    >
                      <FaTimes className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {cartItems.length === 0 ? (
                      <p className="text-center text-gray-400 py-12">
                        Your cart is empty. Go bankrupt Elon!
                      </p>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-[#2a2a2a] p-4 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1 mx-4">
                            <h4 className="font-semibold text-sm line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-green-400 text-xs mt-1">
                              {formatCurrency(item.price)} each
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.index, -1)}
                              className="bg-gray-700 px-2.5 py-1 rounded text-sm font-bold hover:bg-gray-600"
                            >
                              -
                            </button>
                            <span className="font-semibold text-sm w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.index, 1)}
                              className="bg-gray-700 px-2.5 py-1 rounded text-sm font-bold hover:bg-gray-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700 space-y-3">
                  <div className="flex justify-between items-center mb-2 text-lg">
                    <span className="text-gray-400">Total Damage:</span>
                    <span className="font-bold text-red-500">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    disabled={cartItems.length === 0}
                    className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() =>
                      setQuantities(Array(PRODUCTS.length).fill(0))
                    }
                    className="w-full bg-transparent hover:bg-red-600/20 text-red-400 border border-red-600/40 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal Component */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        formatCurrency={formatCurrency}
        onCompletePurchase={() => {
          setQuantities(Array(PRODUCTS.length).fill(0));
          setIsCheckoutOpen(false);
        }}
      />

      {/* Sticky Header Net Worth */}
      <div className="sticky-div top-0 z-10 bg-[#232323] flex justify-center items-center py-4">
        <div
          className="card flex flex-col items-center p-4 text-center"
          id="start"
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold">
            Elon Musk’s net worth is:
          </h1>
          <div className="text-green-500 font-semibold p-4 text-3xl md:text-6xl lg:text-7xl flex items-center justify-center overflow-hidden">
            <span>$</span>
            {paddedNetWorthString.split("").map((char, index) => {
              const positionFromRight = totalLength - index;

              if (char === ",") {
                return (
                  <span
                    key={`comma-${positionFromRight}`}
                    className="mx-0.5 inline-block"
                  >
                    ,
                  </span>
                );
              }

              return (
                <div
                  key={`digit-pos-${positionFromRight}`}
                  className="inline-block overflow-hidden relative"
                >
                  <AnimatedNumbers
                    includeComma={false}
                    animateToNumber={parseInt(char, 10)}
                    transitions={() => ({
                      type: "spring",
                      duration: 0.3,
                    })}
                  />
                </div>
              );
            })}
          </div>
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
            <p className="text-center px-2 sm:px-4 md:px-6 lg:px-8 text-sm sm:text-base md:text-lg lg:text-xl">
              And your job is to bankrupt him by adding as many products as you
              can into his shopping cart.
            </p>
          </div>
        </div>
      </div>

      <div className="card items-center p-4 justify-items-center text-center">
        <h2 className="text-2xl pt-10">Your total damage for his wallet is:</h2>
        <h3 className="text-red-500 font-semibold text-3xl pt-4">
          {formatCurrency(totalPrice)}
        </h3>
        <p className="pt-4">with total of {totalProducts} products</p>
      </div>

      <div className="card grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 xl:gap-x-10 text-center px-4">
        {PRODUCTS.map((product, index) => {
          const qty = quantities[index];
          const itemTotal = qty * product.price;

          return (
            <div
              key={product.id}
              className="product flex flex-col items-center mt-10"
            >
              <h2 className="product-title m-4 text-xl font-semibold">
                {product.title}
              </h2>
              <img
                src={product.image}
                alt={product.title}
                className="w-2/3 md:w-full m-2 object-cover rounded-md"
              />
              <p className="pb-4 product-text text-sm text-gray-300">
                {product.description}
              </p>

              <div className="card2">
                <span>Price: </span>
                <span className="font-semibold text-xl">
                  {formatCurrency(product.price)}
                </span>
              </div>

              <div className="flex justify-center items-center space-x-4 mt-4">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${product.title}`}
                  className="rounded-md px-3 py-1 bg-gray-700 text-white font-bold"
                  onClick={() => updateQuantity(index, -1)}
                >
                  -
                </button>
                <span className="text-xl px-2">{qty}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${product.title}`}
                  className="rounded-md px-3 py-1 bg-gray-700 text-white font-bold"
                  onClick={() => updateQuantity(index, 1)}
                >
                  +
                </button>
              </div>

              <div className="mt-2">
                <span>total: </span>
                <span className="font-semibold text-xl text-green-500">
                  {formatCurrency(itemTotal)}
                </span>
                <div className="price text-xs text-gray-400">({qty} items)</div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="pt-12 text-base text-gray-400 max-w-4xl mx-auto px-4 text-center">
        This project is just for fun and practice. It's a playful way to learn
        useState in React, style things up with Tailwind CSS, and set it all up
        with Vite. The products, prices, and everything else you see here are
        totally made up. They're not real and are just for giggles. No actual
        buying or selling happens here, and no real money's involved. It's all
        just for learning and experimenting. Enjoy poking around, and remember —
        it's all in good fun!
      </p>

      <footer className="mt-10 mb-6 text-white flex items-center justify-center">
        <p>Made by: 0xjulius</p>
        <a
          href="https://github.com/0xjulius"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 hover:opacity-80"
        >
          <FaGithub className="text-white w-6 h-6" />
        </a>
      </footer>
    </>
  );
}

export default App;

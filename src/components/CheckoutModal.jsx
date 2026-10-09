import { useState } from "react";
import { FaTimes, FaLock, FaShieldAlt, FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  formatCurrency,
  onCompletePurchase,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formData = {
    email: "elon.musk@tesla-spacex.io",
    firstName: "Elon",
    lastName: "Musk",
    address: "Tesla Gigafactory 1",
    city: "Austin",
    postalCode: "78725",
    phone: "+1 555-ELON",
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1-second loading effect
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti explosion!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#22c55e", "#ef4444", "#eab308", "#3b82f6"],
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-80 flex justify-center items-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#1e1e1e] text-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row relative border border-gray-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#2a2a2a] hover:bg-gray-700 text-gray-300 hover:text-white rounded-full transition-colors"
          aria-label="Close checkout"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full py-24 px-6 text-center flex flex-col items-center justify-center space-y-6"
            >
              <FaSpinner className="w-16 h-16 text-green-500 animate-spin" />
              <h2 className="text-2xl font-bold">
                Transferring funds from Elon's accounts...
              </h2>
              <p className="text-gray-400">
                Please wait while we drain his offshore holdings.
              </p>
            </motion.div>
          ) : isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full py-24 px-6 text-center flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-4xl animate-bounce">
                🎉
              </div>
              <h2 className="text-3xl font-bold">Transaction Successful!</h2>
              <p className="text-gray-400 max-w-md">
                Elon Musk's offshore bank account has been successfully drained
                by{" "}
                <span className="text-red-500 font-semibold">
                  {formatCurrency(totalPrice)}
                </span>
                .
              </p>

              <button
                onClick={() => {
                  onCompletePurchase();
                  setIsSubmitted(false);
                }}
                className="mt-4 px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors"
              >
                Back to Shopping Spree
              </button>

              {/* Added Disclaimer */}
              <p className="text-xs text-gray-500 mt-6 max-w-xs mx-auto">
                *Disclaimer: This is a parody webshop. No actual money was
                transferred from Elon Musk's bank accounts.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col lg:flex-row w-full"
            >
              {/* Left Side: Locked Form Information */}
              <div className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-[85vh]">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2 text-xl font-bold text-green-400">
                    <FaLock className="w-4 h-4" />
                    <span>ELON'S LOCKED CHECKOUT</span>
                  </div>
                  <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full font-semibold border border-red-500/30">
                    🔒 Details Locked to Elon Musk
                  </span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Section */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-200">
                      Contact Information
                    </h3>
                    <input
                      type="email"
                      disabled
                      value={formData.email}
                      className="w-full bg-[#252525] border border-gray-800 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed select-none"
                    />
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-200">
                      Shipping Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <input
                        type="text"
                        disabled
                        value={formData.firstName}
                        className="bg-[#252525] border border-gray-800 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed select-none"
                      />
                      <input
                        type="text"
                        disabled
                        value={formData.lastName}
                        className="bg-[#252525] border border-gray-800 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed select-none"
                      />
                    </div>
                    <input
                      type="text"
                      disabled
                      value={formData.address}
                      className="w-full bg-[#252525] border border-gray-800 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed select-none mb-4"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        disabled
                        value={formData.postalCode}
                        className="bg-[#252525] border border-gray-800 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed select-none"
                      />
                      <input
                        type="text"
                        disabled
                        value={formData.city}
                        className="bg-[#252525] border border-gray-800 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed select-none"
                      />
                    </div>
                  </div>

                  {/* Payment Option simulation */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-200">
                      Payment Method
                    </h3>
                    <div className="bg-[#252525] border border-green-500/40 p-4 rounded-xl flex items-center justify-between cursor-not-allowed">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          defaultChecked
                          disabled
                          name="payment"
                          className="accent-green-500 w-4 h-4 cursor-not-allowed"
                        />
                        <span className="font-medium text-gray-300">
                          Elon's Corporate Black Card
                        </span>
                      </div>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-semibold">
                        Auto-Charged
                      </span>
                    </div>
                  </div>

                  {/* Submit Action */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg transition-all text-lg flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <FaShieldAlt />
                    <span>Pay Now ({formatCurrency(totalPrice)})</span>
                  </button>
                </form>
              </div>

              {/* Right Side: Order Summary Panel */}
              <div className="w-full lg:w-[400px] bg-[#252525] p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-6 pb-3 border-b border-gray-700">
                    Order Summary
                  </h3>

                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg border border-gray-700"
                          />
                          <div>
                            <p className="font-semibold line-clamp-1">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-medium text-green-400">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-700 text-sm">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery (SpaceX Cargo)</span>
                    <span className="text-green-400 font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-700 text-white">
                    <span>Total</span>
                    <span className="text-red-500">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

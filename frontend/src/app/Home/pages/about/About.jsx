import { ShoppingBag, Truck, ShieldCheck, Heart } from "lucide-react";
import Footer from "../../components/Footer";

export default function About() {
  return (
    <div className="font-poppins text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gray-50">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            About <span className="text-black-600">SHOP.co</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Welcome to SHOP.co — your trusted destination for premium products, unbeatable deals, and effortless online shopping.  
            We believe shopping should be simple, stylish, and satisfying.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
          alt="Shopping illustration"
          className="w-full md:w-1/3 mt-8 md:mt-0 rounded-2xl shadow-md"
        />
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-20 py-12 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          At SHOP.co, our mission is to bring the world’s best products right to your doorstep.
          We’re committed to offering affordable prices, quick delivery, and exceptional service that our customers love.
        </p>
      </section>

      {/* Values Section */}
      <section className="px-6 md:px-20 py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white shadow-sm rounded-2xl hover:shadow-lg transition-all">
            <ShoppingBag className="w-10 h-10 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2">Wide Selection</h3>
            <p className="text-gray-600 text-sm">Find everything from fashion to electronics in one place.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white shadow-sm rounded-2xl hover:shadow-lg transition-all">
            <Truck className="w-10 h-10 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">Get your orders delivered swiftly and safely across the country.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white shadow-sm rounded-2xl hover:shadow-lg transition-all">
            <ShieldCheck className="w-10 h-10 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">Your data and transactions are protected with top security.</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white shadow-sm rounded-2xl hover:shadow-lg transition-all">
            <Heart className="w-10 h-10 text-black mb-4" />
            <h3 className="font-semibold text-lg mb-2">Customer First</h3>
            <p className="text-gray-600 text-sm">We’re here for you — always ready to assist and improve.</p>
          </div>
        </div>
      </section>

        <Footer/>
    </div>
  );
}

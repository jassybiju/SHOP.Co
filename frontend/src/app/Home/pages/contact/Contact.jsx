export default function Contact() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gray-50">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-md">
        
        {/* Left: Contact Form */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">Get in Touch</h2>
          <p className="text-gray-500 mb-6">We’d love to hear from you! Please fill out the form below.</p>
          
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <input type="text" placeholder="Subject" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black" />
            <textarea rows="5" placeholder="Message" className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-black"></textarea>
            <button className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition">Send Message</button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-gray-700">
          <div>
            <h3 className="text-xl font-semibold mb-1">Address</h3>
            <p>123, MG Road, Kochi, Kerala, India</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">Email</h3>
            <p>support@shopco.com</p>
          </div>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-black">Instagram</a>
            <a href="#" className="hover:text-black">Twitter</a>
            <a href="#" className="hover:text-black">Facebook</a>
          </div>
        </div>
      </div>
    </section>
  );
}

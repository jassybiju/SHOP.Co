const NewsLetter = () => {
    return (
        <section className="bg-black text-white py-16 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="font-bakbak text-3xl lg:text-4xl font-bold leading-tight">
                            STAY UP TO DATE ABOUT OUR LATEST OFFERS
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <div className="relative">
                            <u className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="bg-white w-full text-black pl-12 py-3 rounded-full border-0 font-poppins"
                            />
                        </div>
                        <button className="w-full bg-white text-black hover:bg-gray-100 py-3 rounded-full font-poppins">
                            Subscribe to Newsletter
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default NewsLetter;

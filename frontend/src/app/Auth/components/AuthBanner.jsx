import asset from "../../../assets/auth_asset.png";


const AuthBanner = ({type}) => {
    return (
        <div
            className="w-1/3 bg-cover bg-center flex flex-col justify-center items-center text-white p-10"
            style={{ backgroundImage: `url(${asset})` }}
        >
            <h1 className="text-4xl font-bold mb-4">{type === 'signup' ? "Join Us !" : 'Welcome Back'}</h1>
            <p className="text-center mb-6">
                To keep connected with us provide us with your information
            </p>
            {/* <button className="px-6 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition">
                {/* {type === 'signup' ? 'SignIn' : 'SignUp'} */}
            {/* </button> */}
        </div>
    );
};
export default AuthBanner;

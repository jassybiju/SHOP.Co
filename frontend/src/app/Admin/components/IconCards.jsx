const IconCards = ({ icon, value, label }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-3 px-6 flex flex-col  items-start  min-w-64 w-64">
            {/* Icon container */}
            <div className="bg-green-50 rounded-lg p-2 my-2">{icon}</div>
            {/* Value */}
            <div className="text-4xl font-bold text-gray-900">{value}</div>
            {/* Label */}
            <div className=" text-gray-500 my-2 text-xl">{label}</div>
        </div>
    );
};
export default IconCards;

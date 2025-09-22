export const Slider = ({ value, onValueChange, min, max, step }) => {
  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), value[1] - step);
    onValueChange([newMin, value[1]]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), value[0] + step);
    onValueChange([value[0], newMax]);
  };

  return (
    <div className="relative w-full">
      {/* Track background */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-full transform -translate-y-1/2" />

      {/* Active range highlight */}
      <div
        className="absolute top-1/2 h-1 bg-black rounded-full transform -translate-y-1/2"
        style={{
          left: `${((value[0] - min) / (max - min)) * 100}%`,
          right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
        }}
      />

      {/* Min thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0] > min ? value[0] : min}
        onChange={handleMinChange}
        className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none"
      />
      {/* Max thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={handleMaxChange}
        className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none"
      />

      {/* Custom thumb styles */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid black;
          pointer-events: auto;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: white;
          border: 2px solid black;
          pointer-events: auto;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

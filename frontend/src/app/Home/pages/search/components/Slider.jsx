import { useState } from "react";

export const Slider = ({ value = [0,1000], onValueChange, min = 0, max=1000, step }) => {
  const [hovered, setHovered] = useState('max'); // "min" | "max" | null
  console.log(value , max)
const handleMinChange = (e) => {
  const newMin = Number(e.target.value);
  onValueChange([newMin, Math.max(newMin + step, value[1])]); // clamp max dynamically
};


  const handleMaxChange = (e) => {
    let newMax = Number(e.target.value)
    if(newMax < value[0] + step){
      newMax = value[0] + step
    }if(newMax > max){
      console.log(123)
      newMax = max
    }
    console.log(newMax, max , 223, value)
    onValueChange([value[0], newMax]);
  };
  
// const handleMaxChange = (e) => {
//   const newMax = Number(e.target.value);
//   onValueChange([Math.min(newMax - step, value[0]), newMax]); // clamp min dynamically
// };

  const percent = (val) => ((val - min) / (max - min)) * 100;

  return (
    <div className="relative w-full h-10 flex items-center">
      {/* Track */}
      <div className="absolute left-0 right-0 h-1 bg-gray-300 rounded-full" />

      {/* Active range */}
      <div
        className="absolute h-1 bg-black rounded-full"
        style={{
          left: `${percent(value[0])}%`,
          right: `${100 - percent(value[1])}%`,
        }}
      />

      {/* Min thumb */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleMinChange}
        onMouseEnter={() => setHovered("min")}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered("min")}
        onBlur={() => setHovered(null)}
        className="absolute w-full bg-transparent appearance-none pointer-events-none z-20
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-black
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-black
          [&::-moz-range-thumb]:cursor-pointer"
      />

      {/* Tooltip for min */}
      {hovered === "min" && (
        // <div
        //   className="absolute -top-8 px-2 py-1 text-xs text-white bg-black rounded"
        //   style={{ left: `calc(${percent(value[0])}% - 12px)` }} // center over thumb
        // >
        //           <span className="w-4/5 h-4/5 rotate-45 bg-black absolute top-2 z-0 mx-auto"></span>
        //   <span className="z-10 relative">{value[0]}</span>
          
        // </div>
         <div
          className="absolute -top-8 px-2 py-1 text-xs text-white bg-black rounded w-10 text-center"
          style={{ left: `calc(${percent(value[0])}% - 12px)` }}
        >
          <span className="w-5 h-5 rotate-45 bg-black absolute top-2 z-0 left-[50%] translate-x-[-50%]"></span>
          <span className="z-10 relative text-center w-full">{value[0]}</span>
        </div>
      )}

      {/* Max thumb */}
      <input
        type="range"
        min={min}
        max={max}
        // step={step}
        value={value[1]}
        onChange={handleMaxChange}
        onMouseEnter={() => setHovered("max")}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered("max")}
        onBlur={() => setHovered(null)}
        className="absolute w-full bg-transparent appearance-none pointer-events-none z-30
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-black
          [&::-webkit-slider-thumb]:cursor-pointer
          [&::-moz-range-thumb]:h-4
          [&::-moz-range-thumb]:w-4
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-black
          [&::-moz-range-thumb]:cursor-pointer"
      />

      {/* Tooltip for max */}
      {hovered === "max" && (
        <div
          className="absolute -top-8 px-2 py-1 text-xs text-white bg-black rounded "
          style={{ left: `calc(${percent(value[1])-4}%)` }}
        >
          <span className="w-5 h-5 rotate-45 bg-black absolute top-2 z-0 left-[50%] translate-x-[-50%]"></span>
          <span className="z-10 relative">{value[1]}</span>
        </div>
      )}
    </div>
  );
};

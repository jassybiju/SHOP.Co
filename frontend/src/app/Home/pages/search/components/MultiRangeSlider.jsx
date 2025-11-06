import React, { useCallback, useEffect, useState, useRef } from "react";

const MultiRangeSlider = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);
      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative w-52">
        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(e) => {
            const value = Math.min(+e.target.value, maxVal - 1);
            setMinVal(value);
            e.target.value = value.toString();
          }}
          className={`absolute w-full h-0 appearance-none pointer-events-none ${
            minVal > max - 100 ? "z-40" : "z-30"
          }`}
          style={{ pointerEvents: "all" }}
        />

        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(e) => {
            const value = Math.max(+e.target.value, minVal + 1);
            setMaxVal(value);
            e.target.value = value.toString();
          }}
          className="absolute w-full h-0 appearance-none pointer-events-none z-20"
          style={{ pointerEvents: "all" }}
        />

        {/* Slider Track */}
        <div className="absolute top-2.5 h-1 w-full bg-gray-300 rounded"></div>

        {/* Active Range */}
        <div
          ref={range}
          className="absolute top-2.5 h-1 bg-teal-400 rounded"
        ></div>

        {/* Left/Right Values */}
        <div className="absolute -top-6 text-xs text-gray-400 left-0">
          {minVal}
        </div>
        <div className="absolute -top-6 text-xs text-gray-400 right-0">
          {maxVal}
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;

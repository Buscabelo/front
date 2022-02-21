import { useCallback, useEffect, useRef, useState } from 'react';

import './styles.css';

const defaultMin = 1;
const cent = 100;

export default function RangeSlider({ min = defaultMin, minVal, max, maxVal, onChange = () => null }) {
  const [minValue, setMinValue] = useState(minVal ? minVal : min);
  const [maxValue, setMaxValue] = useState(maxVal ? maxVal : max);
  const minRef = useRef(null);
  const maxRef = useRef(null);
  const range = useRef(null);

  const getPercent = useCallback(
    value => Math.round((value - min) / (max - min) * cent),
    [min, max]
  );

  useEffect(() => {
    if (maxRef.current) {
      const minPercent = getPercent(minValue);
      const maxPercent = getPercent(+maxRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minValue, getPercent]);

  useEffect(() => {
    if (minRef.current) {
      const minPercent = getPercent(+minRef.current.value);
      const maxPercent = getPercent(maxValue);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxValue, getPercent]);

  useEffect(() => {
    onChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue, onChange]);

  const handleMin = element => {
    const value = Math.min(+element.value, maxValue - defaultMin);
    setMinValue(value);
    element.value = value.toString();
  };

  const handleMax = element => {
    const value = Math.max(+element.value, minValue + defaultMin);
    setMaxValue(value);
    element.value = value.toString();
  };

  return (
    <div className="range-container">
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        ref={minRef}
        className="min-slider"
        onChange={({ target }) => handleMin(target)}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        ref={maxRef}
        className="max-slider"
        onChange={({ target }) => handleMax(target)}
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        <div className="slider__left-value">{minValue}</div>
        <div className="slider__right-value">{maxValue}</div>
      </div>
    </div>
  );
}

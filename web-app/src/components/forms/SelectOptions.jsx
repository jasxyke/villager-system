import React from "react";

const SelectOptions = ({ list, onChangeValue, value, label, width = 0 }) => {
  const options = list.map((item, index) => (
    <option key={index} value={item.value} className="text-black">
      {item.text}
    </option>
  ));

  const selectWidth =
    width === 0
      ? `100px`
      : width === "auto"
      ? "auto"
      : width === "full"
      ? "100%"
      : `${width}`;
  return (
    <div>
      <p className="text-white mb-1">{label}</p>
      <select
        className={`bg-greyGreen rounded-md p-2 text-black`}
        style={{ width: selectWidth }}
        name={label}
        id={label}
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
      >
        {options}
      </select>
    </div>
  );
};

export default SelectOptions;

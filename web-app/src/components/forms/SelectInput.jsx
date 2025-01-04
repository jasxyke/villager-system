import React from "react";

const SelectInput = ({
  list,
  onChangeValue,
  value,
  label,
  width = 0,
  error,
}) => {
  const options = list.map((item, index) => (
    <option key={index} value={item.value} className="text-black">
      {item.text}
    </option>
  ));
  return (
    <div>
      <p className="text-black mb-1">{label}</p>
      <select
        className={`border bg-white rounded-md p-2 w-full text-black`}
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

export default SelectInput;

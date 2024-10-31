import React, { useState } from "react";
import SearchBar from "../SearchBar";
import StickerTable from "./StickerTable";
import StickerFilter from "./StickerFilter";
import SelectOptions from "../../../components/forms/SelectOptions";

const options = [
  {
    value: "pending",
    text: "Pending",
  },
  {
    value: "rejected",
    text: "Rejected",
  },
];

const RequestSticker = () => {
  const [status, setStatus] = useState("pending");
  return (
    <div className="w-full max-w-7xl">
      {/* <div className="flex items-center justify-between border-t py-4">
        <StickerFilter />
        <SearchBar />
      </div> */}
      <div className="mt-2">
        <StickerTable status={status} />
        <SelectOptions
          list={options}
          onChangeValue={setStatus}
          value={status}
          label={"Status"}
          width={"auto"}
        />
      </div>
    </div>
  );
};

export default RequestSticker;

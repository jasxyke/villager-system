import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { formatFullName } from "../../utils/DataFormatter";
const Lots = ({ houses, onLotClick }) => {
  return (
    <div>
      {houses.map((house, index) => (
        <div
          key={index}
          className="bg-darkGreen flex items-center p-6 border-2 border-paleDarkGreen text-white cursor-pointer justify-between hover:bg-[var(--secondary)] transition-colors"
          onClick={() => onLotClick(house)}
        >
          <div className="flex items-center space-x-4" key={index}>
            <CgProfile size={30} color="white" />
            <span className="text-lg font-medium">LOT {house.lot}:</span>
            {house.residents.map((resident) =>
              resident.user.role_type === "home_owner" ? (
                <span key={resident.id} className="text-lg font-medium">
                  {formatFullName(
                    resident.user.firstname,
                    resident.user.middlename,
                    resident.user.lastname,
                    false
                  )}
                </span>
              ) : null
            )}
          </div>
          <MdKeyboardArrowRight size={30} color="white" />
        </div>
      ))}
    </div>
  );
};

export default Lots;

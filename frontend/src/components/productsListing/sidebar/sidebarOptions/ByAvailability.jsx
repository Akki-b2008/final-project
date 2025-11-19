import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { Collapse } from "react-collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

const ByAvailability = () => {
  
  const [isOpenAvailabilityFilter, setIsOpenAvailabilityFilter] = useState(true);
  return (
    <div className="box mb-5">
      <h2 className="w-full pr-5 font-montserrat text-[17px] font-[600] mb-3 flex items-center">
        Availability
        <Button
          className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-[50px] !text-black !ml-auto"
          onClick={() => setIsOpenAvailabilityFilter(!isOpenAvailabilityFilter)}
        >
          {isOpenAvailabilityFilter ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </h2>

      <Collapse isOpened={isOpenAvailabilityFilter}>
        <div className="scroll px-3 relative -left-[8px]">
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Available"
            className="w-full"
          />

          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Instock"
            className="w-full text-[12px]"
          />

          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Not Available"
            className="w-full"
          />
        </div>
      </Collapse>
    </div>
  );
};

export default ByAvailability;

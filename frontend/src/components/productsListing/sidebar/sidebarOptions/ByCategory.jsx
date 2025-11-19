import Button from "@mui/material/Button";
import { Collapse } from "react-collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";

const ByCategory = () => {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);

  return (
    <div className="box mb-5">
      <h2 className="w-full pr-5 font-montserrat text-[17px] font-[600] mb-3 flex items-center">
        Shop By Categories
        <Button
          className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-[50px] !text-black !ml-auto"
          onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
        >
          {isOpenCategoryFilter ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </h2>

      <Collapse isOpened={isOpenCategoryFilter}>
        <div className="scroll h-[150px] px-3 relative -left-[8px]">
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Fashion"
            className="w-full text-[12px]"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Electronics"
            className="w-full"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Bags"
            className="w-full"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Footwear"
            className="w-full"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Groceries"
            className="w-full"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Beauty"
            className="w-full"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Wellness"
            className="w-full"
          />
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Jewellery"
            className="w-full"
          />
        </div>
      </Collapse>
    </div>
  );
};

export default ByCategory;

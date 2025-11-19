import Rating from "@mui/material/Rating";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";


const ByRating = () => {
  return (
    <div className="box">
          <h2 className="w-full pr-5 font-montserrat text-[17px] font-[600] mb-3 flex items-center">
            Shop By Rating
          </h2>

          <div className="w-full">
            <div className="w-full flex items-center">
              <FormControlLabel
                control={<Checkbox size="small" />}
                className="text-[12px]"
              />
              <Rating name="read-only" defaultValue={5} size="small" readOnly />
            </div>

            <div className="w-full flex items-center">
              <FormControlLabel
                control={<Checkbox size="small" />}
                className="text-[12px]"
              />
              <Rating name="read-only" defaultValue={4} size="small" readOnly />
            </div>

            <div className="w-full flex items-center">
              <FormControlLabel
                control={<Checkbox size="small" />}
                className="text-[12px]"
              />
              <Rating name="read-only" defaultValue={3} size="small" readOnly />
            </div>

            <div className="w-full flex items-center">
              <FormControlLabel
                control={<Checkbox size="small" />}
                className="text-[12px]"
              />
              <Rating name="read-only" defaultValue={2} size="small" readOnly />
            </div>

            <div className="w-full flex items-center">
              <FormControlLabel
                control={<Checkbox size="small" />}
                className="text-[12px]"
              />
              <Rating name="read-only" defaultValue={1} size="small" readOnly />
            </div>
          </div>
        </div>
  )
}

export default ByRating
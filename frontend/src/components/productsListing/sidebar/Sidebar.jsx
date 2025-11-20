import "../sidebar/Sidebar.css";
import "react-range-slider-input/dist/style.css";
import ByCategory from "./sidebarOptions/ByCategory";
import ByAvailability from "./sidebarOptions/ByAvailability";
import ByPrice from "./sidebarOptions/ByPrice";
import ByRating from "./sidebarOptions/ByRating";

const Sidebar = () => {
  return (
    <div className="sidebarWrapper w-[20%] h-full bg-white sticky top-34 py-8 ">
      <aside className="sidebar">
        <div className="w-full px-3">
          <ByCategory />
          <ByAvailability />
          <ByPrice />
          <ByRating />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;

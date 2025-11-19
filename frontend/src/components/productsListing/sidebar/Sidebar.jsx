import "../sidebar/Sidebar.css";
import "react-range-slider-input/dist/style.css";
import ByCategory from "./sidebarOptions/ByCategory";
import ByAvailability from "./sidebarOptions/ByAvailability";
import ByPrice from "./sidebarOptions/ByPrice";
import ByRating from "./sidebarOptions/ByRating";

const Sidebar = () => {
  return (
    <aside className="sidebar py-5">
      <div className="w-full py-4 px-3">
        <ByCategory />
        <ByAvailability />
        <ByPrice />
        <ByRating />
      </div>
    </aside>
  );
};

export default Sidebar;

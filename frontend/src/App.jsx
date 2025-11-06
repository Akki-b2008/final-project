import Navbar from "../src/components/navbar/Navbar.jsx";
import MainRoutes from "./mainRoutes/MainRoutes.jsx";

const App = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-layout__content">
        <MainRoutes />
      </main>
    </div>
  );
};

export default App;

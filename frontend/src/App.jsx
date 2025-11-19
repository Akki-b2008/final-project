import Navbar from "../src/components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import MainRoutes from "./mainRoutes/MainRoutes.jsx";

const App = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <MainRoutes />
      <Footer />
    </div>
  );
};

export default App;

import FooterFeatures from "./footerFeatures/FooterFeatures";
import FooterContent from "./footerContent/FooterContent";
import FooterBottom from "./footerBottom/FooterBottom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-[#f5f0f0c7]">
      <div className="container py-10">
        <FooterFeatures />
        <div className="w-full h-[1px] bg-gray-400 mb-10"></div>
        <FooterContent />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;

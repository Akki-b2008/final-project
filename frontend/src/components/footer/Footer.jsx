import FooterFeatures from "./footerFeatures/FooterFeatures";
import FooterContent from "./footerContent/FooterContent";
import FooterBottom from "./footerBottom/FooterBottom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-[#f3f0f0]">
      <div className="container py-10">
        <FooterFeatures />
        <div className="w-full h-[1.1px] bg-[rgba(189,185,185,0.5)] mb-10"></div>
        <FooterContent />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;

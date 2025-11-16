import FooterFeatures from "./footerFeatures/FooterFeatures";
import FooterContent from "./footerContent/FooterContent";
import FooterBottom from './footerBottom/FooterBottom'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <FooterFeatures />
        <FooterContent />
        <FooterBottom />
      </div>
    </footer>
  );
};

export default Footer;

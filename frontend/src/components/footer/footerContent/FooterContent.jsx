import FooterCompany from "./FooterCompany";
import FooterContact from "./FooterContact";
import FooterProducts from "./FooterProducts";

const FooterContent = () => {
  return (
    <div className="flex gap-10 justify-between md: justify-start md:gap-50 ">
      <FooterContact />
      <FooterProducts />
      <FooterCompany />
    </div>
  );
};

export default FooterContent;

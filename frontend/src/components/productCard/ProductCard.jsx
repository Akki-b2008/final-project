import { FiChevronRight } from "react-icons/fi";
import "./productCard.scss";

const ProductCard = ({ product, onAddToBag }) => {
  const handleAddToBag = () => {
    if (onAddToBag) {
      onAddToBag(product);
    }
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">{product.name}</h3>
        <span className="product-card__category">{product.category}</span>
        <div className="product-card__footer">
          <span className="product-card__price">${product.price}</span>
          <button
            type="button"
            className="product-card__cta"
            onClick={handleAddToBag}
          >
            Add to bag <FiChevronRight />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;

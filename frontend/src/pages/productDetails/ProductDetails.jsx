import { useMemo, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHeart,
} from "react-icons/fi";
import "./productDetails.scss";

const MOCK_PRODUCT = {
  id: "68fc81759c99279da56a0778",
  title: "Nike ka Lara lappa",
  description: "This is Nike's Best Lara Lappa.",
  category: "Shoes",
  price: {
    amount: 2.5,
    currency: "INR",
  },
  stock: 9,
  images: [
    {
      id: "68fc81775c7cd75eb80ad221",
      url: "https://ik.imagekit.io/nkde9n0dc/products/338b873b-6e0d-4184-be29-91a6ee35452d_Os3X4cS9Z2",
      thumbnail:
        "https://ik.imagekit.io/nkde9n0dc/tr:n-ik_ml_thumbnail/products/338b873b-6e0d-4184-be29-91a6ee35452d_Os3X4cS9Z2",
    },
    {
      id: "68fc81775c7cd75eb80ad2ee",
      url: "https://ik.imagekit.io/nkde9n0dc/products/7317dd00-9ae0-49b1-be32-eef649883045_fGMIEOvIQR",
      thumbnail:
        "https://ik.imagekit.io/nkde9n0dc/tr:n-ik_ml_thumbnail/products/7317dd00-9ae0-49b1-be32-eef649883045_fGMIEOvIQR",
    },
    {
      id: "68fc81775c7cd75eb80ad292",
      url: "https://ik.imagekit.io/nkde9n0dc/products/7e7883bf-578a-4f8e-84f9-b86d599aa33b_X1fRMJznFv",
      thumbnail:
        "https://ik.imagekit.io/nkde9n0dc/tr:n-ik_ml_thumbnail/products/7e7883bf-578a-4f8e-84f9-b86d599aa33b_X1fRMJznFv",
    },
    {
      id: "68fc81775c7cd75eb80ad252",
      url: "https://ik.imagekit.io/nkde9n0dc/products/3a874a46-96b1-44fe-a407-b77e52928c34_QySl0Sywy",
      thumbnail:
        "https://ik.imagekit.io/nkde9n0dc/tr:n-ik_ml_thumbnail/products/3a874a46-96b1-44fe-a407-b77e52928c34_QySl0Sywy",
    },
    {
      id: "68fc81775c7cd75eb80ad1d2",
      url: "https://ik.imagekit.io/nkde9n0dc/products/75d99a92-2522-4a2d-a836-20b522c1a319_fWdvzthZi",
      thumbnail:
        "https://ik.imagekit.io/nkde9n0dc/tr:n-ik_ml_thumbnail/products/75d99a92-2522-4a2d-a836-20b522c1a319_fWdvzthZi",
    },
  ],
  additionalInfo: {
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9"],
    attributes: [
      {
        title: "Material",
        description: "Best Material",
      },
    ],
  },
};

const formatCurrency = (amount, currency) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    return `${currency} ${amount.toFixed(2)}`;
  }
};

const ProductDetails = () => {
  const product = MOCK_PRODUCT;
  const images = product.images ?? [];
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.additionalInfo?.sizes?.[0] ?? null
  );

  const activeAsset = images[activeImage] ?? images[0];

  const formattedPrice = useMemo(() => {
    return formatCurrency(product.price.amount, product.price.currency);
  }, [product.price.amount, product.price.currency]);

  const stockState = useMemo(() => {
    if (product.stock <= 0) {
      return { label: "Out of stock", tone: "is-empty" };
    }

    if (product.stock <= 5) {
      return { label: "Only a few left", tone: "is-low" };
    }

    return { label: `In stock (${product.stock})`, tone: "is-available" };
  }, [product.stock]);

  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  const handlePreviousImage = () => {
    if (!images.length) {
      return;
    }

    setActiveImage((prev) => {
      const next = prev - 1;
      return next < 0 ? images.length - 1 : next;
    });
  };

  const handleNextImage = () => {
    if (!images.length) {
      return;
    }

    setActiveImage((prev) => (prev + 1) % images.length);
  };

  return (
    <section className="product-details-page">
      <div className="product-details__grid">
        <div className="product-gallery">
          {activeAsset ? (
            <div className="product-gallery__viewer">
              <img
                src={activeAsset.url}
                alt={`${product.title} view ${activeImage + 1}`}
                loading="lazy"
              />
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePreviousImage}
                    className="product-gallery__control product-gallery__control--prev"
                    aria-label="View previous image"
                  >
                    <FiArrowLeft />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="product-gallery__control product-gallery__control--next"
                    aria-label="View next image"
                  >
                    <FiArrowRight />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="product-gallery__empty">No images available.</div>
          )}

          {images.length > 1 && (
            <div className="product-gallery__thumbnails" role="tablist">
              {images.map((image, index) => (
                <button
                  key={image.id ?? image.url}
                  type="button"
                  className={`product-gallery__thumbnail ${
                    index === activeImage ? "is-active" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show image ${index + 1}`}
                  aria-selected={index === activeImage}
                  role="tab"
                >
                  <img src={image.thumbnail ?? image.url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <aside className="product-summary">
          <div className="product-summary__header">
            <span className="product-summary__category">{product.category}</span>
            <h1 className="product-summary__title">{product.title}</h1>
            <p className="product-summary__description">
              {product.description}
            </p>
          </div>

          <div className="product-summary__pricing">
            <span className="product-summary__price">{formattedPrice}</span>
            <span className={`product-summary__stock ${stockState.tone}`}>
              {stockState.label}
            </span>
          </div>

          {product.additionalInfo?.sizes?.length ? (
            <div className="product-summary__section">
              <div className="product-summary__section-heading">
                <h2>Available sizes</h2>
                <button type="button" className="product-summary__size-guide">
                  Size guide
                </button>
              </div>
              <div className="product-summary__sizes">
                {product.additionalInfo.sizes.map((size) => {
                  const isSelected = size === selectedSize;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSelectSize(size)}
                      className={`size-pill ${isSelected ? "is-selected" : ""}`}
                    >
                      <span>{size}</span>
                      {isSelected && <FiCheck aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {product.additionalInfo?.attributes?.length ? (
            <div className="product-summary__section">
              <h2>Key details</h2>
              <ul className="product-summary__attributes">
                {product.additionalInfo.attributes.map((attribute) => (
                  <li key={attribute.title}>
                    <span className="attribute-title">{attribute.title}</span>
                    <span className="attribute-copy">{attribute.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="product-summary__actions">
            <button type="button" className="product-summary__primary">
              Add to bag
            </button>
            <button type="button" className="product-summary__secondary">
              <FiHeart aria-hidden="true" />
              Save for later
            </button>
          </div>

          <div className="product-summary__meta">
            <div>
              <span className="meta-label">Delivery</span>
              <p className="meta-copy">
                Free express shipping in 2-4 business days. Easy returns under
                14 days.
              </p>
            </div>
            <div>
              <span className="meta-label">Care</span>
              <p className="meta-copy">
                Spot clean with a damp cloth. Store in a cool, dry place away
                from direct sunlight.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ProductDetails;

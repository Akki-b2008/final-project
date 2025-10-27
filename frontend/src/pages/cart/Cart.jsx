import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiGift,
  FiLock,
  FiMinus,
  FiPlus,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";
import "./cart.scss";

const INITIAL_CART_ITEMS = [
  {
    id: "nike-lara-lappa",
    title: "Nike ka Lara Lappa",
    variant: "All Black • Knit",
    size: "UK 8",
    price: { amount: 12999, currency: "INR" },
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    highlight: "Ships in 2-3 days",
  },
  {
    id: "nike-aurora",
    title: "Nike Aurora Runner",
    variant: "Atmosphere Grey",
    size: "UK 7",
    price: { amount: 8999, currency: "INR" },
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    highlight: "Limited release",
  },
];

const formatCurrency = (amount, currency) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    return `${currency} ${amount.toFixed(0)}`;
  }
};

const createEstimateLabel = () => {
  const start = new Date();
  const end = new Date();
  start.setDate(start.getDate() + 3);
  end.setDate(end.getDate() + 6);

  const formatter = new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
  });

  return `${formatter.format(start)} - ${formatter.format(end)}`;
};

const Cart = () => {
  const [items, setItems] = useState(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState("");

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => {
      return sum + item.price.amount * item.quantity;
    }, 0);

    const shipping = subtotal >= 9999 || subtotal === 0 ? 0 : 199;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;

    return {
      subtotal,
      shipping,
      tax,
      total,
    };
  }, [items]);

  const handleIncreaseQuantity = (itemId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.min(item.quantity + 1, 9) }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handlePromoSubmit = (event) => {
    event.preventDefault();
    console.info("Apply promo", promoCode);
  };

  const estimatedDelivery = createEstimateLabel();

  return (
    <section className="cart-page">
      <header className="cart-header">
        <div className="cart-header__title">
          <h1>Shopping bag</h1>
          <span>{items.length} item{items.length === 1 ? "" : "s"}</span>
        </div>
        <Link to="/" className="cart-header__link">
          <FiArrowLeft /> Continue exploring
        </Link>
      </header>

      <div className="cart-layout">
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <h2>Your bag is feeling light</h2>
              <p>
                Add your favourites to keep them close. Wishlisted pieces ship
                quickly and include complimentary returns.
              </p>
              <Link to="/" className="cart-empty__cta">
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="cart-items__list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__media">
                    <img src={item.image} alt={item.title} loading="lazy" />
                  </div>

                  <div className="cart-item__info">
                    <div className="cart-item__labels">
                      <h2>{item.title}</h2>
                      <p>{item.variant}</p>
                    </div>
                    <div className="cart-item__meta">
                      <span className="cart-item__size">Size {item.size}</span>
                      {item.highlight ? (
                        <span className="cart-item__highlight">{item.highlight}</span>
                      ) : null}
                    </div>
                    <div className="cart-item__actions">
                      <div className="cart-quantity">
                        <button
                          type="button"
                          onClick={() => handleDecreaseQuantity(item.id)}
                          aria-label={`Reduce quantity of ${item.title}`}
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleIncreaseQuantity(item.id)}
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="cart-item__remove"
                      >
                        <FiTrash2 /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="cart-item__pricing">
                    <span>{formatCurrency(item.price.amount, item.price.currency)}</span>
                    {item.quantity > 1 ? (
                      <small>
                        {item.quantity} × {formatCurrency(item.price.amount, item.price.currency)}
                      </small>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="cart-summary">
          <div className="cart-summary__card">
            <h2>Order summary</h2>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <strong>{formatCurrency(totals.subtotal, "INR")}</strong>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <strong>
                {totals.shipping === 0
                  ? "Complimentary"
                  : formatCurrency(totals.shipping, "INR")}
              </strong>
            </div>
            <div className="cart-summary__row">
              <span>Tax & duties</span>
              <strong>{formatCurrency(totals.tax, "INR")}</strong>
            </div>

            <div className="cart-summary__divider" aria-hidden="true" />

            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <strong>{formatCurrency(totals.total, "INR")}</strong>
            </div>

            <p className="cart-summary__note">
              <FiLock /> Secure checkout powered by LuxePay
            </p>

            <button
              type="button"
              className="cart-summary__checkout"
              disabled={items.length === 0}
            >
              Proceed to checkout <FiArrowRight />
            </button>

            <form className="cart-promo" onSubmit={handlePromoSubmit}>
              <label htmlFor="promo" className="cart-promo__label">
                <FiGift /> Gift card or promo code
              </label>
              <div className="cart-promo__input">
                <input
                  id="promo"
                  type="text"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="LUXE20"
                />
                <button type="submit">Apply</button>
              </div>
            </form>
          </div>

          <div className="cart-summary__card cart-summary__card--meta">
            <div className="cart-meta">
              <FiTruck />
              <div>
                <h3>Arrives {estimatedDelivery}</h3>
                <p>Priority shipping available. Complimentary returns within 14 days.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Cart;

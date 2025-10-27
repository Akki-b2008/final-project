import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
  FiClock,
  FiDownload,
  FiMapPin,
  FiPackage,
  FiShoppingBag,
} from "react-icons/fi";
import "./orderDetails.scss";
import { ORDER_HISTORY, STATUS_CONFIG } from "./orderData";

const formatCurrency = (value, currency = "INR") => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    return `${currency} ${Number(value).toFixed(0)}`;
  }
};

const formatDate = (value) => {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const formatDateTime = (value) => {
  if (!value) {
    return "Pending";
  }

  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const OrderDetails = () => {
  const { orderId = "" } = useParams();
  const navigate = useNavigate();

  const order = useMemo(() => {
    return ORDER_HISTORY.find((entry) => entry.id.toLowerCase() === orderId.toLowerCase());
  }, [orderId]);

  const itemCount = useMemo(() => {
    if (!order) {
      return 0;
    }

    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [order]);

  if (!order) {
    return (
      <section className="order-details">
        <div className="order-details__empty">
          <h1>Order not found</h1>
          <p>
            We could not locate order <strong>{orderId}</strong>. Double check the ID or
            return to the order studio.
          </p>
          <Link to="/orders" className="order-details__back">
            Back to orders
          </Link>
        </div>
      </section>
    );
  }

  const statusConfig = STATUS_CONFIG[order.status] ?? {
    label: order.status,
    tone: "neutral",
  };

  return (
    <section className="order-details">
      <header className="order-details__hero">
        <button
          type="button"
          className="order-details__nav"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft aria-hidden="true" />
          Orders
        </button>
        <div className="order-details__heading">
          <span className={`order-pill tone-${statusConfig.tone}`}>{statusConfig.label}</span>
          <h1>Order {order.id}</h1>
          <p>
            Placed {formatDate(order.placedAt)} · {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="order-details__summary">
          <div>
            <span>Total spend</span>
            <strong>{formatCurrency(order.total, order.currency)}</strong>
          </div>
          <div>
            <span>Payment</span>
            <strong>
              {order.payment.method} · {order.payment.last4}
            </strong>
          </div>
          <div>
            <span>Delivery window</span>
            <strong>{order.deliveryWindow}</strong>
          </div>
        </div>
        <div className="order-details__actions">
          <button
            type="button"
            onClick={() => console.info("Download invoice", order.id)}
          >
            <FiDownload aria-hidden="true" /> Invoice
          </button>
          <Link to="/orders" className="order-details__cta">
            Order studio
            <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </header>

      <div className="order-details__body">
        <section className="order-panel order-panel--timeline">
          <header>
            <FiClock aria-hidden="true" />
            <div>
              <h2>Journey timeline</h2>
              <p>Follow each milestone from confirmation to doorstep.</p>
            </div>
          </header>
          <ol>
            {order.timeline.map((step) => (
              <li key={step.id}>
                <span className="order-step-icon">
                  <FiPackage aria-hidden="true" />
                </span>
                <div>
                  <strong>{step.label}</strong>
                  <time>{formatDateTime(step.timestamp)}</time>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="order-panel order-panel--info">
          <header>
            <FiMapPin aria-hidden="true" />
            <div>
              <h2>Shipping to</h2>
              <p>Curated delivery location for this drop.</p>
            </div>
          </header>
          <address>
            <strong>{order.shipping.name}</strong>
            <span>{order.shipping.street}</span>
            <span>
              {order.shipping.city}, {order.shipping.state} {order.shipping.postal}
            </span>
            <span>{order.shipping.country}</span>
          </address>
          <div className="order-panel__meta">
            <span>Last update</span>
            <strong>{formatDateTime(order.timeline.at(-1)?.timestamp)}</strong>
          </div>
        </section>

        <section className="order-panel order-panel--items">
          <header>
            <FiShoppingBag aria-hidden="true" />
            <div>
              <h2>Pieces secured</h2>
              <p>Tailored inventory included in this order.</p>
            </div>
          </header>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                <div className="order-item-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="order-item-copy">
                  <h3>{item.title}</h3>
                  <p>{item.variant}</p>
                  <span>
                    Size {item.size} · Qty {item.quantity}
                  </span>
                </div>
                <div className="order-item-price">
                  <strong>
                    {formatCurrency(item.price * item.quantity, order.currency)}
                  </strong>
                  <small>Unit {formatCurrency(item.price, order.currency)}</small>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default OrderDetails;

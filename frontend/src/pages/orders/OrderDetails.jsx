import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiArrowRight,
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

const formatStatusLabel = (value) => {
  if (!value) {
    return "";
  }

  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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

  const paymentSummary = useMemo(() => {
    if (!order) {
      return { statusLabel: "", description: "", reference: null };
    }

    const flow = order.flow ?? {};
    const status = flow.paymentStatus ?? order.payment?.status ?? "";
    const paymentCompletedAt = flow.paymentCompletedAt;
    const reference = flow.paymentReference ?? order.payment?.reference ?? null;

    if (status === "paid") {
      return {
        statusLabel: "Paid",
        description: `${formatDateTime(paymentCompletedAt)} · ${order.payment.method}`,
        reference,
      };
    }

    if (status === "pending") {
      return {
        statusLabel: "Pending",
        description: "Awaiting payment",
        reference,
      };
    }

    if (status === "refunded") {
      return {
        statusLabel: "Refunded",
        description: `${formatDateTime(paymentCompletedAt)} · ${order.payment.method}`,
        reference,
      };
    }

    return {
      statusLabel: formatStatusLabel(status),
      description: "Status update unavailable",
      reference,
    };
  }, [order]);

  const paymentSummaryText = useMemo(() => {
    if (!order) {
      return "";
    }

    const parts = [
      order.payment?.method,
      order.payment?.last4,
      formatStatusLabel(order.payment?.status),
    ].filter(Boolean);

    return parts.join(" · ");
  }, [order]);

  const paymentTone = useMemo(() => {
    const label = (paymentSummary.statusLabel ?? "").toLowerCase();

    if (label === "paid") {
      return "success";
    }

    if (label === "pending") {
      return "warning";
    }

    if (label === "refunded") {
      return "muted";
    }

    return "neutral";
  }, [paymentSummary]);

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
            <strong>{paymentSummaryText}</strong>
          </div>
          <div>
            <span>Status detail</span>
            <strong>{order.statusNote}</strong>
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
        <section className="order-panel order-panel--checkout">
          <header>
            <FiPackage aria-hidden="true" />
            <div>
              <h2>Checkout summary</h2>
              <p>Cart creation, address selection, and payment status in one place.</p>
            </div>
          </header>
          <dl className="order-flow">
            <div>
              <dt>Cart created</dt>
              <dd>{formatDateTime(order.flow?.cartCreatedAt)}</dd>
            </div>
            <div>
              <dt>Address selected</dt>
              <dd>{formatDateTime(order.flow?.addressConfirmedAt)}</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>
                <span className={`order-flow__badge tone-${paymentTone}`}>
                  {paymentSummary.statusLabel || "Unavailable"}
                </span>
                <span>{paymentSummary.description}</span>
              </dd>
            </div>
            {paymentSummary.reference ? (
              <div>
                <dt>Payment reference</dt>
                <dd>{paymentSummary.reference}</dd>
              </div>
            ) : null}
          </dl>
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
            <strong>{formatDateTime(order.updatedAt)}</strong>
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

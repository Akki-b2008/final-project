import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiPackage,
  FiSearch,
  FiTrendingUp,
} from "react-icons/fi";
import "./orders.scss";
import {
  ORDER_HISTORY,
  STATUS_CONFIG,
  STATUS_FILTERS,
} from "./orderData";

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
    month: "short",
    day: "numeric",
  }).format(new Date(value));
};

const formatDateTime = (value) => {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
};

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const metrics = useMemo(() => {
    const completedOrders = ORDER_HISTORY.filter((order) => order.status === "completed");
    const totalSpend = completedOrders.reduce((sum, order) => sum + order.total, 0);
    const openOrders = ORDER_HISTORY.filter((order) => order.status === "pending").length;
    const nextUpdate =
      ORDER_HISTORY.find((order) => order.status === "pending")?.statusNote ??
      "All orders completed";

    return {
      totalSpend: formatCurrency(totalSpend),
      openOrders,
      nextUpdate,
    };
  }, []);

  const filteredOrders = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return ORDER_HISTORY.filter((order) => {
      const matchFilter =
        activeFilter === "all" ? true : order.status === activeFilter;

      if (!matchFilter) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      const matchesId = order.id.toLowerCase().includes(normalized);
      const matchesItem = order.items.some((item) =>
        item.title.toLowerCase().includes(normalized)
      );

      return matchesId || matchesItem;
    });
  }, [activeFilter, searchTerm]);

  return (
    <section className="orders-page">
      <header className="orders-hero">
        <div className="orders-hero__intro">
          <span className="orders-hero__eyebrow">Luxe journal</span>
          <h1>Your order studio</h1>
          <p>
            Track atelier-crafted drops, manage open journeys, and revisit delivered
            favorites across every theme.
          </p>
        </div>
        <aside className="orders-hero__stats" aria-label="Order quick stats">
          <article className="hero-stat">
            <FiPackage aria-hidden="true" />
            <div>
              <span>Total orders</span>
              <strong>{ORDER_HISTORY.length}</strong>
            </div>
          </article>
          <article className="hero-stat">
            <FiTrendingUp aria-hidden="true" />
            <div>
              <span>Lifetime spend</span>
              <strong>{metrics.totalSpend}</strong>
            </div>
          </article>
          <article className="hero-stat">
            <FiClock aria-hidden="true" />
            <div>
              <span>Pending orders</span>
              <strong>{metrics.openOrders}</strong>
            </div>
          </article>
          <article className="hero-stat">
            <FiCalendar aria-hidden="true" />
            <div>
              <span>Next action</span>
              <strong>{metrics.nextUpdate}</strong>
            </div>
          </article>
        </aside>
      </header>

      <div className="orders-controls">
        <div className="orders-chipset" role="tablist" aria-label="Filter orders by status">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.id}
              role="tab"
              type="button"
              className={`orders-chip ${activeFilter === filter.id ? "is-active" : ""}`}
              aria-selected={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <label className="orders-search" htmlFor="orders-search-input">
          <FiSearch aria-hidden="true" />
          <input
            id="orders-search-input"
            type="search"
            placeholder="Search order or product"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </div>

      <p className="orders-meta" role="status">
        Showing {filteredOrders.length} of {ORDER_HISTORY.length} orders
      </p>

      <div className="orders-grid">
        {filteredOrders.map((order) => {
          const statusConfig = STATUS_CONFIG[order.status] ?? {
            label: order.status,
            tone: "neutral",
          };
          const itemCount = order.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return (
            <article key={order.id} className="orders-card">
              <header className="orders-card__header">
                <div>
                  <span className={`orders-card__status tone-${statusConfig.tone}`}>
                    {statusConfig.label}
                  </span>
                  <h2>{order.id}</h2>
                  <p>
                    Placed {formatDateTime(order.placedAt)} • {itemCount} {itemCount === 1 ? "item" : "items"}
                  </p>
                </div>
                <span className="orders-card__window">{order.statusNote}</span>
              </header>

              <div className="orders-card__media">
                {order.items.slice(0, 3).map((item) => (
                  <img key={item.id} src={item.image} alt="" loading="lazy" />
                ))}
              </div>

              <dl className="orders-card__data">
                <div>
                  <dt>Total</dt>
                  <dd>{formatCurrency(order.total, order.currency)}</dd>
                </div>
                <div>
                  <dt>Payment</dt>
                  <dd>
                    {order.payment.method} · {order.payment.last4}
                  </dd>
                </div>
              </dl>

              <footer className="orders-card__footer">
                <div className="orders-card__tags">
                  {order.items.slice(0, 3).map((item) => (
                    <span key={`${order.id}-${item.id}`} className="orders-card__tag">
                      {item.quantity} × {item.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                  ))}
                  {order.items.length > 3 ? (
                    <span className="orders-card__tag">+{order.items.length - 3} more</span>
                  ) : null}
                </div>
                <Link to={`/orders/${order.id}`} className="orders-card__cta">
                  View journey
                  <FiArrowRight aria-hidden="true" />
                </Link>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Orders;

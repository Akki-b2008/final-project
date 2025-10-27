import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiHeart } from "react-icons/fi";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import {
  fetchProducts,
  resetProducts,
  selectProducts,
  selectProductsHasMore,
  selectProductsSkip,
  selectProductsStatus,
} from "../../store/productsSlice.js";
import "./home.scss";

const FEATURED_IMAGES = [
  {
    image:
      "https://images.unsplash.com/photo-1517840545243-87fb3b81c86a?auto=format&fit=crop&w=1100&q=80&sat=-10&sharp=60",
    title: "Statement Classics",
    description: "Tailored essentials refined for the modern wardrobe.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1100&q=80&sat=-10&sharp=60",
    title: "Atelier Luxe",
    description: "Hand-finished pieces designed for timeless elegance.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1100&q=80&sat=-10&sharp=60",
    title: "City Nomad",
    description: "Lightweight layers for journeys near and far.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=1100&q=80&sat=-10&sharp=60",
    title: "Sculpted Shades",
    description: "Architectural silhouettes with elevated details.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600181950925-df53080cf1ea?auto=format&fit=crop&w=1100&q=80&sat=-10&sharp=60",
    title: "Edition Denim",
    description: "Italian denim crafted with bespoke dyes and washes.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1100&q=80&sat=-10&sharp=60",
    title: "Evening Aura",
    description: "Luminous fabrics that move with every step.",
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "Women", label: "Women" },
  { id: "Men", label: "Men" },
  { id: "Accessories", label: "Accessories" },
  { id: "Trending", label: "Trending" },
  { id: "New", label: "New" },
  { id: "Limited", label: "Limited" },
];

const CATEGORY_FILTERS = new Set(["Women", "Men", "Accessories"]);

const CATEGORY_PARAM_MAP = {
  women: "Women",
  men: "Men",
  accessories: "Accessories",
  sale: "all",
};

const HIGHLIGHT_PARAM_MAP = {
  trending: "Trending",
  new: "New",
  limited: "Limited",
};

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const hasMore = useSelector(selectProductsHasMore);
  const skip = useSelector(selectProductsSkip);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts({ skip: 0 }));

    return () => {
      dispatch(resetProducts());
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (FEATURED_IMAGES.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % FEATURED_IMAGES.length);
    }, 7000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const highlightParam = searchParams.get("view");

    if (categoryParam) {
      const normalized = CATEGORY_PARAM_MAP[categoryParam.toLowerCase()];
      setActiveFilter(normalized ?? "all");
      return;
    }

    if (highlightParam) {
      const normalizedHighlight =
        HIGHLIGHT_PARAM_MAP[highlightParam.toLowerCase()];
      setActiveFilter(normalizedHighlight ?? "all");
      return;
    }

    setActiveFilter("all");
  }, [searchParams]);

  useEffect(() => {
    if (!hasMore || status === "loading") {
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && status !== "loading") {
            dispatch(fetchProducts({ skip }));
          }
        });
      },
      {
        rootMargin: "400px 0px",
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [dispatch, hasMore, skip, status]);

  const goToSlide = (index) => {
    const total = FEATURED_IMAGES.length;
    if (!total) {
      return;
    }

    const normalized = (index + total) % total;
    setActiveSlide(normalized);
  };

  const handleNextSlide = () => {
    goToSlide(activeSlide + 1);
  };

  const handlePreviousSlide = () => {
    goToSlide(activeSlide - 1);
  };

  const activeFeature = FEATURED_IMAGES[activeSlide] ?? FEATURED_IMAGES[0];

  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") {
      return products;
    }

    if (activeFilter === "Trending" || activeFilter === "New" || activeFilter === "Limited") {
      return products.filter((product) => product.badge === activeFilter);
    }

    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter, products]);

  const handleFilterChange = (filterId) => {
    const nextParams = new URLSearchParams(searchParams);

    if (filterId === "all") {
      nextParams.delete("category");
      nextParams.delete("view");
      setSearchParams(nextParams, { replace: true });
      setActiveFilter("all");
      return;
    }

    if (CATEGORY_FILTERS.has(filterId)) {
      nextParams.set("category", filterId.toLowerCase());
      nextParams.delete("view");
      setSearchParams(nextParams, { replace: true });
      setActiveFilter(filterId);
      return;
    }

    nextParams.delete("category");
    nextParams.set("view", filterId.toLowerCase());
    setSearchParams(nextParams, { replace: true });
    setActiveFilter(filterId);
  };

  const handleAddToBag = (product) => {
    console.info("Add to bag", product.id);
  };

  return (
    <section className="home-page">
      <div className="showcase-hero">
        {activeFeature && (
          <>
            <img
              src={activeFeature.image}
              alt={activeFeature.title}
              className="showcase-hero__image"
              loading="lazy"
            />
            <div className="showcase-hero__scrim" aria-hidden="true" />
            <div className="showcase-hero__content">
              <span className="showcase-hero__badge">Curated Edit</span>
              <h1 className="showcase-hero__title">{activeFeature.title}</h1>
              <p className="showcase-hero__subtitle">
                {activeFeature.description}
              </p>
              <div className="showcase-hero__cta">
                <Link to="/checkout" className="showcase-hero__cta-button">
                  Shop the edit <FiArrowRight />
                </Link>
                <Link
                  to="/product/featured"
                  className="showcase-hero__cta-link"
                >
                  View lookbook
                </Link>
              </div>
            </div>
          </>
        )}

        {FEATURED_IMAGES.length > 1 && (
          <>
            <button
              type="button"
              className="showcase-hero__control showcase-hero__control--prev"
              onClick={handlePreviousSlide}
              aria-label="View previous highlight"
            >
              <FiArrowLeft />
            </button>
            <button
              type="button"
              className="showcase-hero__control showcase-hero__control--next"
              onClick={handleNextSlide}
              aria-label="View next highlight"
            >
              <FiArrowRight />
            </button>
            <div
              className="showcase-hero__dots"
              role="tablist"
              aria-label="Featured highlights"
            >
              {FEATURED_IMAGES.map((feature, index) => (
                <button
                  key={feature.title}
                  type="button"
                  className={`showcase-hero__dot ${
                    index === activeSlide ? "is-active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`View highlight ${index + 1}: ${feature.title}`}
                  aria-selected={index === activeSlide}
                  role="tab"
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="showcase-filters">
        <h2>Explore the collection</h2>
        <div className="showcase-filters__group">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`filter-chip ${
                activeFilter === filter.id ? "is-active" : ""
              }`}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="showcase-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToBag={handleAddToBag}
          />
        ))}
      </div>

      <div className="showcase-infinite">
        {status === "loading" && (
          <div className="showcase-infinite__status">
            <span className="showcase-infinite__loader" aria-hidden="true" />
            <span>Loading Luxe pieces...</span>
          </div>
        )}

        {!hasMore && status === "succeeded" && (
          <div className="showcase-infinite__status">
            <FiHeart />
            <span>You've seen the entire curation.</span>
          </div>
        )}

        <div ref={sentinelRef} style={{ height: 1 }} />
      </div>
    </section>
  );
};

export default Home;

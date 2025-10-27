import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const CATEGORY_CYCLE = ["Women", "Men", "Accessories"];

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80&sat=-10&sharp=60&exp=10",
  "https://images.unsplash.com/photo-1528701800489-20be3c0340cc?auto=format&fit=crop&w=900&q=80&sat=-10&sharp=60&exp=10",
  "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80&sat=-10&sharp=60&exp=10",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80&sat=-10&sharp=60&exp=10",
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80&sat=-10&sharp=60&exp=10",
  "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=900&q=80&sat=-10&sharp=60&exp=10",
];

const BADGE_SEQUENCE = ["Trending", "New", null, "Limited", null];

const MOCK_CATALOG = Array.from({ length: 120 }).map((_, index) => {
  const id = index + 1;
  const category = CATEGORY_CYCLE[index % CATEGORY_CYCLE.length];
  const image = IMAGE_POOL[index % IMAGE_POOL.length];
  const badge = BADGE_SEQUENCE[index % BADGE_SEQUENCE.length];

  return {
    id,
    name: `Luxe Edition ${String(id).padStart(3, "0")}`,
    price: (Math.random() * 400 + 60).toFixed(0),
    category,
    image,
    badge,
  };
});

const PAGE_SIZE = 20;

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async ({ skip = 0 }, { getState }) => {
    const {
      products: { items },
    } = getState();

    const start = skip;
    const end = skip + PAGE_SIZE;
    const data = MOCK_CATALOG.slice(start, end);
    const combined = skip === 0 ? data : [...items, ...data];
    const hasMore = end < MOCK_CATALOG.length;

    return {
      items: combined,
      skip: combined.length,
      hasMore,
    };
  }
);

const initialState = {
  items: [],
  skip: 0,
  hasMore: true,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProducts: () => ({ ...initialState }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.skip = action.payload.skip;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load products";
      });
  },
});

export const { resetProducts } = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsHasMore = (state) => state.products.hasMore;
export const selectProductsSkip = (state) => state.products.skip;

export default productsSlice.reducer;

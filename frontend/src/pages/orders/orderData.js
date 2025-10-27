export const ORDER_HISTORY = [
  {
    id: "DB87CA92C",
    status: "confirmed",
    placedAt: "2025-10-24T09:45:00.000Z",
    deliveryWindow: "Arrives Oct 30 - Nov 2",
    total: 5000,
    currency: "INR",
    payment: { method: "Visa", last4: "4321" },
    shipping: {
      name: "Aarav Mehta",
      street: "49 Dushyant Nagar",
      city: "Gwalior",
      state: "Madhya Pradesh",
      postal: "474011",
      country: "India",
    },
    items: [
      {
        id: "white-addidas",
        title: "Nike Atmos Racer",
        variant: "White / Volt",
        size: "UK 8",
        quantity: 1,
        price: 2600,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=720&q=80",
      },
      {
        id: "red-nike",
        title: "Nike Flux Runner",
        variant: "Crimson",
        size: "UK 7",
        quantity: 2,
        price: 1200,
        image:
          "https://images.unsplash.com/photo-1511556670410-f0b3ff09c256?auto=format&fit=crop&w=720&q=80",
      },
    ],
    timeline: [
      {
        id: "placed",
        label: "Confirmed",
        timestamp: "2025-10-24T09:45:00.000Z",
      },
      {
        id: "packed",
        label: "Packed at Luxe Studio",
        timestamp: "2025-10-24T15:15:00.000Z",
      },
      {
        id: "in-transit",
        label: "Handed to carrier",
        timestamp: "2025-10-25T08:30:00.000Z",
      },
    ],
  },
  {
    id: "116D20C8",
    status: "confirmed",
    placedAt: "2025-10-24T06:10:00.000Z",
    deliveryWindow: "Arrives Oct 28 - Oct 30",
    total: 7500,
    currency: "INR",
    payment: { method: "UPI", last4: "aarav@oksbi" },
    shipping: {
      name: "Rhea Kapoor",
      street: "16 Palm Court",
      city: "Bengaluru",
      state: "Karnataka",
      postal: "560102",
      country: "India",
    },
    items: [
      {
        id: "atelier-coat",
        title: "Nike Atelier Overcoat",
        variant: "Slate",
        size: "M",
        quantity: 1,
        price: 4500,
        image:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=720&q=80",
      },
      {
        id: "atelier-jogger",
        title: "Nike Atelier Jogger",
        variant: "Graphite",
        size: "M",
        quantity: 1,
        price: 3000,
        image:
          "https://images.unsplash.com/photo-1559561853-08451582d788?auto=format&fit=crop&w=720&q=80",
      },
    ],
    timeline: [
      {
        id: "placed",
        label: "Confirmed",
        timestamp: "2025-10-24T06:10:00.000Z",
      },
      {
        id: "atelier",
        label: "Tailor finishing",
        timestamp: "2025-10-24T13:05:00.000Z",
      },
      {
        id: "dispatch",
        label: "Ready for dispatch",
        timestamp: null,
      },
    ],
  },
  {
    id: "A55C10AF",
    status: "in-transit",
    placedAt: "2025-10-23T20:15:00.000Z",
    deliveryWindow: "Out for delivery Oct 27",
    total: 4200,
    currency: "INR",
    payment: { method: "Mastercard", last4: "1984" },
    shipping: {
      name: "Dev Sharma",
      street: "88 Sea Wind Residency",
      city: "Mumbai",
      state: "Maharashtra",
      postal: "400076",
      country: "India",
    },
    items: [
      {
        id: "city-rider",
        title: "Nike City Rider",
        variant: "Black / Ice",
        size: "UK 9",
        quantity: 1,
        price: 4200,
        image:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=720&q=80",
      },
    ],
    timeline: [
      {
        id: "placed",
        label: "Confirmed",
        timestamp: "2025-10-23T20:15:00.000Z",
      },
      {
        id: "packed",
        label: "Packed",
        timestamp: "2025-10-23T23:30:00.000Z",
      },
      {
        id: "shipped",
        label: "Departed Bengaluru hub",
        timestamp: "2025-10-24T08:20:00.000Z",
      },
      {
        id: "last-mile",
        label: "Out for delivery",
        timestamp: "2025-10-27T06:10:00.000Z",
      },
    ],
  },
  {
    id: "8B5F23E3",
    status: "pending",
    placedAt: "2025-10-23T18:51:00.000Z",
    deliveryWindow: "Processing",
    total: 4000,
    currency: "INR",
    payment: { method: "Amex", last4: "0092" },
    shipping: {
      name: "Ishita Rao",
      street: "12 Vista Greens",
      city: "Hyderabad",
      state: "Telangana",
      postal: "500081",
      country: "India",
    },
    items: [
      {
        id: "atelier-hoodie",
        title: "Nike Atelier Hoodie",
        variant: "Cloud Grey",
        size: "L",
        quantity: 1,
        price: 2100,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=720&q=80",
      },
      {
        id: "atelier-cap",
        title: "Nike Atelier Cap",
        variant: "Serene Blue",
        size: "One size",
        quantity: 2,
        price: 950,
        image:
          "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=720&q=80",
      },
    ],
    timeline: [
      {
        id: "placed",
        label: "Awaiting confirmation",
        timestamp: "2025-10-23T18:51:00.000Z",
      },
    ],
  },
  {
    id: "E4F3E501",
    status: "cancelled",
    placedAt: "2025-10-22T11:32:00.000Z",
    deliveryWindow: "Cancelled Oct 24",
    total: 1000,
    currency: "INR",
    payment: { method: "UPI", last4: "isha@oksbi" },
    shipping: {
      name: "Isha Sen",
      street: "4 Lakefront Drive",
      city: "Kolkata",
      state: "West Bengal",
      postal: "700091",
      country: "India",
    },
    items: [
      {
        id: "studio-cap",
        title: "Nike Studio Cap",
        variant: "Navy",
        size: "One size",
        quantity: 1,
        price: 1000,
        image:
          "https://images.unsplash.com/photo-1518895949257-7621c3c786d4?auto=format&fit=crop&w=720&q=80",
      },
    ],
    timeline: [
      {
        id: "placed",
        label: "Confirmed",
        timestamp: "2025-10-22T11:32:00.000Z",
      },
      {
        id: "cancelled",
        label: "Cancelled by client",
        timestamp: "2025-10-24T07:20:00.000Z",
      },
    ],
  },
];

export const STATUS_CONFIG = {
  pending: { label: "Pending", tone: "warning" },
  confirmed: { label: "Confirmed", tone: "info" },
  "in-transit": { label: "In transit", tone: "accent" },
  delivered: { label: "Delivered", tone: "success" },
  cancelled: { label: "Cancelled", tone: "muted" },
};

export const STATUS_FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "in-transit", label: "In transit" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];


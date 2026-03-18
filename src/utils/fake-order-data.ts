import { Order } from "./types";
export const fakeOrders: Order[] = [
  {
    _id: "1",
    number: 34567,
    name: "Космический бургер 1",
    status: "done",
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45e8",
      "60d3463f7034a000269f45e9",
    ],
    createdAt: "2025-03-14T12:00:00.000Z",
    updatedAt: "2025-03-14T12:05:00.000Z",
  },
  {
    _id: "2",
    number: 34568,
    name: "Лунный бургер",
    status: "pending",
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45ea",
      "60d3463f7034a000269f45eb",
    ],
    createdAt: "2025-03-14T12:30:00.000Z",
    updatedAt: "2025-03-14T12:30:00.000Z",
  },
  {
    _id: "3",
    number: 34569,
    name: "Марсианский бургер",
    status: "created",
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45ec",
      "60d3463f7034a000269f45ed",
    ],
    createdAt: "2025-03-14T13:00:00.000Z",
    updatedAt: "2025-03-14T13:00:00.000Z",
  },
  {
    _id: "4",
    number: 34570,
    name: "Солнечный бургер",
    status: "done",
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45e8",
      "60d3463f7034a000269f45ee",
    ],
    createdAt: "2025-03-14T14:15:00.000Z",
    updatedAt: "2025-03-14T14:20:00.000Z",
  },
  {
    _id: "5",
    number: 34571,
    name: "Звездный бургер",
    status: "done",
    ingredients: [
      "60d3463f7034a000269f45e7",
      "60d3463f7034a000269f45ef",
      "60d3463f7034a000269f45f0",
    ],
    createdAt: "2025-03-14T15:00:00.000Z",
    updatedAt: "2025-03-14T15:05:00.000Z",
  },
];

export const fakeStats = {
  total: 34571,
  totalToday: 123,
  orders: fakeOrders,
};

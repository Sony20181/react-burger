export type IngredientType = {
  _id: string;
  name: string;
  type: "bun" | "sauce" | "main";
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile?: string;
  image_large?: string;
  __v?: number;
  uuid?: string;
};

export type Order = {
  _id: string;
  ingredients: string[];
  status: "done" | "pending" | "created";
  name: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type FeedResponse = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
};

export type WebsocketStatus = "CONNECTING" | "ONLINE" | "OFFLINE";

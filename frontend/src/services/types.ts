export type SalesApiResponse = {
  id: number;
  product: string;
  quantity: number;
  unit_price: number;
  total: number;
};

export type PostSaleRequest = {
  product: string;
  quantity: number;
  unit_price: number;
};

export type DeleteSaleRequest = {
  id: number;
};

export type getSaleByIDRequest = {
  id: number | null | undefined;
};

export type UpdateSaleRequest = {
  id: number | null;
  product: string;
  quantity: number;
  unit_price: number;
};

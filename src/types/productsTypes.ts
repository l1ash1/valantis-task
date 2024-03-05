export interface IProduct {
  brand: string | null;
  id: string
  price: number
  product: string
}

export interface ISetPagesParams {
  onePageStep?: number;
  requiredPage?: number
}
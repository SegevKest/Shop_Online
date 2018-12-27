export interface Order {
  id: string;
  userId: string;
  cartId: string;
  orderDate: Date;
  dateToDeliever: Date;
  creditCard: string;
  city: string;
  street: string;
  finalPrice: number;
  status: string;
}


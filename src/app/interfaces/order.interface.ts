export interface OrderInterface {
  name?: string;
  shippingAddress: string;
  city: string;
  date: string;
  isDelivery: boolean;
  id: number;
}

/**
 * "id": 1,
    "name": "Dominicode",
    "date": "01/12/1995",
    "shippingAddress": "Av. de la Granvia de Hospitalet, 115",
    "city": "Barcelona",
    "pickup": true
 */

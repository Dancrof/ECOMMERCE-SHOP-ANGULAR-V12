export interface OrderInterface {
    id?: number;
    name: string;
    date: string;
    shippingAddress: string;
    city: string;
    pickup: boolean;
}

/**
 * "id": 1,
    "name": "Dominicode",
    "date": "01/12/1995",
    "shippingAddress": "Av. de la Granvia de Hospitalet, 115",
    "city": "Barcelona",
    "pickup": true
 */
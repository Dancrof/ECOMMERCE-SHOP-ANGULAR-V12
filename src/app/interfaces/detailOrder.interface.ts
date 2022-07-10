export interface DetailOrderInterface {
    id?: number;
    orderId: number;
    quantity: number;
    productName: string;
}

export interface DetailsInterface {

    details: DetailOrderInterface[];
    orderId?: number;
}

/**
 * "id": 1,
    "orderId": 1,
    "quantity": 10,
    "productName": "Product name"
 */
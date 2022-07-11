export interface DetailOrderInterface {
    productId: number;
    productName: string;
    quantity: number;
}

export interface DetailsInterface {

    details: DetailOrderInterface[];
    orderId: number;
}

/**
 * "id": 1,
    "orderId": 1,
    "quantity": 10,
    "productName": "Product name"
 */
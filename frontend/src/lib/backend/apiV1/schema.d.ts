/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/products/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Product by ID
         * @description 상품 ID를 기준으로 특정 상품을 가져옵니다.
         */
        get: operations["item"];
        /**
         * Update Product Status
         * @description 상품 정보를 업데이트합니다.
         */
        put: operations["modify"];
        post?: never;
        /**
         * Delete Product
         * @description 상품을 삭제합니다.
         */
        delete: operations["delete"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/order/{id}/status": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /**
         * Update Order Status
         * @description 주문 상태를 업데이트합니다.
         */
        put: operations["updateOrderStatus"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/products": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get All Products
         * @description 모든 상품 목록을 가져옵니다.
         */
        get: operations["items"];
        put?: never;
        /**
         * Create Product
         * @description 새로운 상품을 등록합니다.
         */
        post: operations["create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/products/image": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Upload Image
         * @description 상품 이미지를 추가합니다.
         */
        post: operations["upload"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/order": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get All Orders
         * @description 모든 주문 목록을 가져옵니다.
         */
        get: operations["getAllOrder"];
        put?: never;
        /**
         * Create Order
         * @description 새로운 주문을 생성합니다.
         */
        post: operations["createOrder"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/products/categories": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get All Categories
         * @description 모든 카테고리를 가져옵니다.
         */
        get: operations["categories"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/order/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Order by ID
         * @description 주문 ID를 기준으로 특정 주문을 가져옵니다.
         */
        get: operations["getOrderById"];
        put?: never;
        post?: never;
        /**
         * Delete Order
         * @description 주문을 삭제합니다.
         */
        delete: operations["deleteOrder"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/order/scheduler/shipped": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * PREPARING TO SHIPPING
         * @description PREPARING 상태를 SHIPPING 상태로 업데이트 합니다.
         */
        get: operations["runStartDelivery"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/order/scheduler/prepare": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * PAYMENT_COMPLETED TO PREPARING
         * @description PAYMENT_COMPLETED 상태를 PREPARING 상태로 업데이트 합니다.
         */
        get: operations["runPrepareDelivery"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/order/scheduler/payment_completed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * EVERYTHING TO PAYMENT_COMPLETED
         * @description 모든 ORDER을 PAYMENT_COMPLETED 상태로 초기화 합니다.
         */
        get: operations["resetStatus"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/order/scheduler/completed": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * SHIPPING TO COMPLETED
         * @description SHIPPING 상태를 COMPLETED 상태로 업데이트 합니다.
         */
        get: operations["runEndDelivery"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/order/by-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Orders by Email
         * @description 이메일을 기준으로 주문 목록을 가져옵니다.
         */
        get: operations["getOrdersByEmail"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        ApiResponseString: {
            success?: boolean;
            message?: string;
            content?: string;
        };
        ProductRequest: {
            productName: string;
            category: string;
            /** Format: int32 */
            price?: number;
            imageUrl?: string;
        };
        ApiResponseOrderResponseDTO: {
            success?: boolean;
            message?: string;
            content?: components["schemas"]["OrderResponseDTO"];
        };
        OrderItemResponseDTO: {
            /** Format: int64 */
            id?: number;
            productName?: string;
            /** Format: int32 */
            count?: number;
            /** Format: int32 */
            price?: number;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            modifiedAt?: string;
            /** Format: int32 */
            totalPrice?: number;
        };
        OrderResponseDTO: {
            /** Format: int64 */
            id?: number;
            email?: string;
            status?: string;
            /** Format: int32 */
            totalPrice?: number;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            modifiedAt?: string;
            orderItems?: components["schemas"]["OrderItemResponseDTO"][];
            empty?: boolean;
        };
        Order: {
            /** Format: int64 */
            readonly id?: number;
            /** Format: date-time */
            readonly createDate?: string;
            /** Format: date-time */
            readonly modifyDate?: string;
            /**
             * @description 이메일
             * @example test@gmail.com
             */
            email: string;
            /**
             * @description 상품 상태, 기본 값으로 PAYMENT_COMPLETED 입니다.
             * @example PAYMENT_COMPLETED
             * @enum {string}
             */
            readonly status: "UNKNOWN" | "CANCELLED" | "PAYMENT_COMPLETED" | "PREPARING" | "SHIPPING" | "COMPLETED";
            /**
             * Format: int32
             * @description 주문 금액
             * @example 1000
             */
            totalPrice: number;
            /** @description 주문에 포함된 상품 목록 */
            orderItems?: components["schemas"]["OrderItem"][];
        };
        OrderItem: {
            /** Format: int64 */
            readonly id?: number;
            /** Format: date-time */
            readonly createDate?: string;
            /** Format: date-time */
            readonly modifyDate?: string;
            /**
             * @description 상품 이름
             * @example 원두 1
             */
            productName: string;
            /**
             * Format: int32
             * @description 상품 수량 (1 이상)
             * @example 1
             */
            count: number;
            /**
             * Format: int32
             * @description 상품 가격 (1 이상)
             * @example 1000
             */
            price: number;
        };
        ApiResponseListProductDto: {
            success?: boolean;
            message?: string;
            content?: components["schemas"]["PageDtoProductDto"];
        };
        PageDtoProductDto: {
            /** Format: int64 */
            totalItems: number;
            items: components["schemas"]["ProductDto"][];
            /** Format: int64 */
            totalPages: number;
            /** Format: int32 */
            currentPageNumber: number;
            /** Format: int32 */
            pageSize: number;
        };
        ProductDto: {
            /** Format: int64 */
            id: number;
            /** Format: date-time */
            createDate: string;
            /** Format: date-time */
            modifyDate: string;
            productName: string;
            /** Format: int32 */
            price: number;
            imageUrl?: string;
            category: string;
        };
        ApiResponseProductDto: {
            success?: boolean;
            message?: string;
            content?: components["schemas"]["ProductDto"];
        };
        ApiResponseListProductDto: {
            success?: boolean;
            message?: string;
            content?: components["schemas"]["ProductDto"][];
        };
        ApiResponseListOrderResponseDTO: {
            success?: boolean;
            message?: string;
            content?: components["schemas"]["OrderResponseDTO"][];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    item: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseProductDto"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    modify: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProductRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    delete: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    updateOrderStatus: {
        parameters: {
            query: {
                /**
                 * @description 주문 상태 (가능한 값: PAYMENT_COMPLETED, PREPARING, SHIPPING, COMPLETED)
                 * @example PAYMENT_COMPLETED
                 */
                status: string;
            };
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseOrderResponseDTO"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    items: {
        parameters: {
            query?: {
                searchKeywordType?: "productName" | "category";
                searchKeyword?: string;
                page?: number;
                pageSize?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponsePageDtoProductDto"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ProductRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    upload: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: binary */
                    file?: string;
                };
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    getAllOrder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseListOrderResponseDTO"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    createOrder: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Order"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseOrderResponseDTO"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    getOrderById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseOrderResponseDTO"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    deleteOrder: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    runStartDelivery: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    runPrepareDelivery: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    resetStatus: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    runEndDelivery: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
    getOrdersByEmail: {
        parameters: {
            query: {
                email: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseListOrderResponseDTO"];
                };
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json;charset=UTF-8": components["schemas"]["ApiResponseString"];
                };
            };
        };
    };
}

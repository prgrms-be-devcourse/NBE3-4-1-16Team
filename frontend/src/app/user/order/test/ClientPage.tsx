'use client'

import type {components} from '@/lib/backend/apiV1/schema'

export default function ClientPage({
                                       responseBody,
                                   }: {
    responseBody: components['schemas']['ApiResponseListOrderResponseDTO']
}) {
    const orders = responseBody.content;

    // console.log(orders);

    return (
        <div>
            <ul>
                {orders.map((order) => (
                    <li key={order.id} className="border-[2px] border-[red] my-3 p-4">
                        <div><strong>Order ID:</strong> {order.id}</div>
                        <div><strong>Email:</strong> {order.email}</div>
                        <div><strong>Status:</strong> {order.status}</div>
                        <div><strong>Total Price:</strong> {order.totalPrice} 원</div>
                        <div><strong>Created At:</strong> {order.createdAt}</div>
                        <div><strong>Modified At:</strong> {order.modifiedAt}</div>
                        <div className="ml-6">
                        <h2>Order Items</h2>
                        <ul>
                            {order.orderItems?.map((item) => (
                                <li key={item.id} className="border-[1px] border-[gray] p-2 my-2">
                                    <div><strong>Product Name:</strong> {item.productName}</div>
                                    <div><strong>Count:</strong> {item.count}개</div>
                                    <div><strong>Price:</strong> {item.price}원</div>
                                    <div><strong>Total Price:</strong> {item.count! * item.price!}원</div>
                                    <div><strong>Created At:</strong> {item.createdAt}</div>
                                    <div><strong>Modified At:</strong> {item.modifiedAt}</div>
                                </li>
                            ))}
                        </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

'use client'

import type {components} from '@/lib/backend/apiV1/schema';
import React from 'react';
import Cookies from 'js-cookie';
import client from "@/lib/backend/client";
import {useRouter} from "next/navigation";

type CartItem = {
    productName: string;
    price: number;
    imageUrl: string;
    category: string;
    count: number;
};

export default function ClientPage({
                                       responseBody
                                   }: {
    responseBody: components['schemas']['ApiResponseListProductDto'];
}) {
    const router = useRouter();
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

    React.useEffect(() => {
        const cart = Cookies.get('cart');
        setCartItems(cart ? JSON.parse(cart) : []);
    }, []);

    const totalPrice = cartItems.reduce(
        (total: number, item: { count: number; price: number }) => total + item.count * item.price,
        0
    );

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return false;
        }
        if (!emailRegex.test(email)) {
            return false;
        }
        return true;
    };

    const handleDelete = (productName: string) => {
        const updatedCart = cartItems.filter((item) => item.productName !== productName); // 이름 기준으로 필터링
        setCartItems(updatedCart); // 상태 업데이트
        Cookies.set('cart', JSON.stringify(updatedCart)); // 쿠키에 저장
    };

    const handlePayment = async () => {
        const emailInput = document.getElementById("email") as HTMLInputElement;
        const email = emailInput?.value || "";

        if (!validateEmail(email)) {
            alert("유효한 이메일 주소를 입력해주세요.");
            emailInput.focus();
            return;
        }

        const requestBody = {
            body: {
                email,
                totalPrice,
                orderItems: cartItems.map(({productName, count, price}) => ({
                    productName,
                    count,
                    price,
                })),
            },
        };


        try {
            const response = await client.POST("/order", requestBody);

            if (response.data?.success) {
                alert("결제에 성공했습니다.");
                Cookies.remove('cart');
                router.push('/user');
            } else {
                alert(response.error?.message || '결제에 실패했습니다.');
            }
        } catch (error) {
            alert('결제 요청 중 문제가 발생했습니다.');
        }

    };


    return (
        <div>
            {cartItems.length > 0 ? (
                <div className="flex">
                    {/* 왼쪽: 상품 목록 */}
                    <div className="w-1/2 border-2 border-gray-300 rounded-lg shadow-md p-5 mr-4">
                        <ul className="list-none p-0">
                            {cartItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-md mb-2"
                                >
                                    {/* 이미지 */}
                                    <img
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        className="w-20 h-20 object-cover mr-3 rounded-md"
                                    />

                                    {/* 상품 정보  */}
                                    <div className="flex-1">
                                        {/* 이름 */}
                                        <h2 className="text-sm font-semibold m-0">
                                            {item.productName.length > 40
                                                ? `${item.productName.slice(0, 40)}...`
                                                : item.productName}
                                        </h2>

                                        {/* 가격 */}
                                        <p className="text-sm my-1"> {item.price.toLocaleString('ko-KR')}원 </p>

                                        {/* 카테고리 */}
                                        <p className="inline-block text-xs font-bold text-white bg-coffee py-1 px-2 rounded-md mt-1">
                                            {item.category}
                                        </p>
                                    </div>

                                    {/* 개수 */}
                                    <div className="flex items-center justify-end w-32">
                                        <span className="text-base font-medium">{item.count} 개</span>
                                    </div>

                                    {/* 결과 */}
                                    <div className="flex items-center justify-end w-40">
                                        {/* 최종 가격 */}
                                        <span
                                            className="text-base font-bold">{(item.count * item.price).toLocaleString('ko-KR')} 원</span>

                                        {/* 삭제 버튼 */}
                                        <button
                                            className="ml-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
                                            onClick={() => handleDelete(item.productName)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 오른쪽: 결제 페이지 */}
                    <div className="w-1/2 p-5 border-2 border-gray-300 rounded-lg shadow-md">
                        <h2 className="text-lg font-bold mb-4">결제 정보</h2>
                        <hr className="border-t-1.5 border-gray-300 my-4"/>

                        {/* 가격 */}
                        <div className="mb-4">
                            <div className="flex justify-between items-center text-2xl font-black">
                                <span>최종 결제 금액</span>
                                <span className="ml-auto">{totalPrice.toLocaleString('ko-KR')} 원</span>
                            </div>
                        </div>

                        {/* 이메일 */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold mb-1">
                                이메일
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded-md text-gray-900"
                                placeholder="example@email.com"
                            />
                        </div>

                        {/* 배송 설명 */}
                        <h2 className="text-sm text-black m-0 my-3">
                            당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.
                        </h2>

                        {/* 결제 버튼 */}
                        <button
                            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
                            onClick={handlePayment}
                        >
                            결제하기
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-2xl font-bold text-gray-700">
                        장바구니에 담긴 상품이 없습니다.
                    </p>
                </div>
            )}
        </div>
    );
}
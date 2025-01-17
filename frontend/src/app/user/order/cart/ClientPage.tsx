'use client'

import type {components} from '@/lib/backend/apiV1/schema';
import React from 'react';

export default function ClientPage({
                                       responseBody,
                                       counts
                                   }: {
    responseBody: components['schemas']['ApiResponseListProductDto'];
    counts: number[];
}) {
    const products = responseBody.content ?? []; // 비어있을 경우 기본 값 []

    // const [counts, setCounts] = useState<number[]>(
    //     products.map(() => Math.floor(Math.random() * 5)) // 0부터 4까지 무작위 정수
    // );


    console.log(counts);

    return (
        <div>
            <h1 className="text-2xl my-5 font-bold text-gray-800">
                주문/결제
            </h1>
            <div className="flex">
                {/* 왼쪽: 상품 목록 */}
                <div className="w-1/2 border-2 border-gray-300 rounded-lg shadow-md p-5 mr-4">
                    {products.length > 0 ? (
                        <ul className="list-none p-0">
                            {products.map((product, index) => (

                                <li
                                    key={index}
                                    className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-100 shadow-md mb-2"
                                >

                                    {/* 이미지 */}
                                    <img
                                        src={product.imageUrl}
                                        alt={product.productName}
                                        className="w-20 h-20 object-cover mr-3 rounded-md"
                                    />

                                    {/* 상품 정보 */}
                                    <div className="flex-1">
                                        <h2 className="text-sm font-semibold m-0">
                                            {product.productName.length > 40
                                                ? product.productName.slice(0, 40) + "..."
                                                : product.productName}
                                        </h2>

                                        {/* 가격 */}
                                        <p className="text-sm my-1"> {product.price}원 </p>

                                        {/* 카테고리 */}
                                        <p className="inline-block text-xs font-bold text-white bg-coffee py-1 px-2 rounded-md mt-1">
                                            {product.category}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-end w-32">
                                        <span className="text-base font-medium">{counts[index]} 개</span>
                                    </div>

                                    {/* 총 가격 */}
                                    <div className="flex items-center justify-end w-40">
                                        <span className="text-base font-bold">{counts[index] * product.price} 원</span>
                                    </div>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>장바구니에 담긴 상품이 없습니다.</p>
                    )}
                </div>

                {/* 오른쪽: 결제 페이지 */}
                <div className="w-1/2 p-5 border-2 border-gray-300 rounded-lg shadow-md">
                    <h2 className="text-lg font-bold mb-4">결제 정보</h2>

                    <hr className="border-t-1.5 border-gray-300 my-4"/>

                    {/* 최종 결제 금액 */}
                    <div className="mb-4">

                        {/* 최종 결제 금액 값 */}
                        <div className="flex justify-between items-cente text-2xl font-black">
                            <span>최종 결제 금액</span>
                            <span className="ml-auto">
                                {products.reduce((total, product, index) => total + counts[index] * product.price, 0)} 원
                            </span>
                        </div>
                    </div>

                    {/* 이메일 입력 */}
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
                    <h2 className="text-sm text-black m-0 my-3">당일 오후 2시 이후의 주문은 다음날 배송을 시작합니다.</h2>

                    {/* 결제 버튼 */}
                    <button
                        className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700"
                        onClick={() => {
                            // TODO : API 전송 로직
                            alert(`결제가 완료되었습니다.`);
                        }}
                    >
                        결제하기
                    </button>
                </div>
            </div>

        </div>
    );
}
'use client'

import type {components} from '@/lib/backend/apiV1/schema';
import React, {useState} from 'react';

export default function ClientPage({
                                       responseBody,
                                   }: {
    responseBody: components['schemas']['ApiResponseListProductDto'];
}) {
    const products = responseBody.content ?? []; // 비어있을 경우 기본 값 []
    const [counts, setCounts] = useState<number[]>(products.map(() => 1)); // 초기 수량을 1로 설정

    const handleCountChange = (index: number, value: number) => {
        setCounts((prevCounts) => {
            // prevCounts를 복사한 후, index의 값을 업데이트
            const newCounts = [...prevCounts];
            newCounts[index] = value > 0 ? value : 1; // 최소값 1
            return newCounts;
        });
    };

    return (
        <div>
            <h1
                style={{
                    textAlign: 'center',
                    fontSize: '2rem',
                    margin: '20px 0',
                    fontWeight: 'bold',
                    color: '#333',
                }}
            >
                상품 목록
            </h1>

            {products.length > 0 ? (
                <ul style={{listStyle: 'none', padding: 0}}>
                    {products.map((product, index) => (

                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                backgroundColor: '#f9f9f9',         // 색상
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  // 그림자
                                marginBottom: '15px',           // 하단 marin
                            }}
                        >

                            {/* 이미지 */}
                            <img
                                src={product.imageUrl}
                                alt={product.productName}
                                style={{
                                    width: '75px',
                                    height: '75px',
                                    objectFit: 'cover',
                                    marginRight: '10px',
                                    borderRadius: '5px',
                                }}
                            />

                            {/* 상품 정보 */}
                            <div style={{flex: 1}}>
                                <h2 style={{fontSize: '16px', margin: 0}}>
                                    {product.productName}
                                </h2>
                                <p style={{fontSize: '14px', margin: '5px 0'}}>
                                    {product.price}원
                                </p>

                                {/* 카테고리 */}
                                <p
                                    style={{
                                        display: 'inline-block',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        backgroundColor: '#59473F',
                                        padding: '3px 8px',
                                        borderRadius: '5px',
                                        marginTop: '5px',
                                    }}
                                >
                                    {product.category}
                                </p>
                            </div>

                            {/* 수량 선택 */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    marginRight: '10px',
                                }}
                            >
                                <label htmlFor={`count-${index}`} style={{fontSize: '14px'}}>
                                    수량:
                                </label>
                                <input
                                    id={`count-${index}`}
                                    type="number"
                                    value={counts[index]}
                                    min={1}
                                    style={{
                                        width: '50px',
                                        padding: '5px',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        textAlign: 'center',
                                    }}
                                    onChange={(e) =>
                                        handleCountChange(
                                            index,
                                            parseInt(e.target.value, 10) // 정수 변환
                                        )
                                    }
                                />
                            </div>

                            {/* 추가 버튼 */}
                            <button
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#fff',
                                    border: '1px solid #ddd',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    console.log({
                                        ...product,
                                        count: counts[index],
                                    });

                                    alert(
                                        `${product.productName} ${counts[index]}개가 장바구니에 추가되었습니다`
                                    );
                                }}
                                // 마우스 호버 시
                                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(240,240,240,0)")}
                                // 호버 해제 시
                                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                            >
                                추가
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>상품이 없습니다.</p>
            )}
        </div>
    );
}
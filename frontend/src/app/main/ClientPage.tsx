'use client';

import type { components } from '@/lib/backend/apiV1/schema';
import { useState } from 'react';
import Link from 'next/link';
import client from '@/lib/backend/client';

type OrderItemResponseDTO = components['schemas']['OrderItemResponseDTO'];
type OrderResponseDTO = components['schemas']['OrderResponseDTO'];

import React from "react";

export default function ClientPage() {
  const [email, setEmail] = useState<string>('');
  const [orders, setOrders] = useState<OrderResponseDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 3;

  const getOrdersByEmail = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('유효한 이메일을 입력해주세요.');
      setOrders(null);
      return;
    }

    setLoading(true);
    setError(null);
    setOrders(null);
    setCurrentPage(1); // 새로운 조회 시 페이지를 초기화

    try {
      const data = await client.GET(`/order/by-email?email=${encodeURIComponent(email)}`);
      setOrders(data.data.content); // 응답 데이터를 바로 저장
    } catch (err) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedOrders = orders ? orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const totalPages = orders ? Math.ceil(orders.length / itemsPerPage) : 0;

  return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <h1>주문 시 기입한 이메일을 통해 조회가 가능합니다.</h1>
        <div style={{ marginBottom: '20px' }}>
          <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="예) example@naver.com"
              style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          />
          <button
              onClick={getOrdersByEmail}
              style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', cursor: 'pointer' }}
              disabled={loading}
          >
            {loading ? '조회 중...' : '주문 조회'}
          </button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {orders && (
            <div>
              <h2>{orders.length}건의 주문 내역을 조회하였습니다.</h2>
              {paginatedOrders.length > 0 ? (
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {paginatedOrders.map((order, index) => (
                        <li
                            key={index}
                            style={{
                              marginBottom: '20px',
                              border: '1px solid #ddd',
                              padding: '15px',
                              borderRadius: '8px',
                            }}
                        >
                          <p><strong>주문 ID:</strong> {order.id}</p>
                          <p><strong>주문 일자:</strong> {new Date(order.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                          <p><strong>주문 내역:</strong> {order.orderItems[0].productName} 외 {order.orderItems.length - 1}건</p>
                          <p><strong>주문 금액:</strong> {order.totalPrice.toLocaleString()}원</p>
                          <p><strong>배송 상태:</strong> {
                              {
                                UNKNOWN: "알 수 없음",
                                CANCELLED: "취소",
                                PAYMENT_COMPLETED: "결제 완료",
                                PREPARING: "배송 준비",
                                SHIPPING: "배송 중",
                                COMPLETED: "배송 완료",
                              }[order.status] || "알 수 없음"
                          }</p>
                          <div style={{ marginTop: '10px', textAlign: 'right' }}>
                            <Link
                                href={`/main/${order.id}`}
                                style={{
                                  display: 'inline-block',
                                  padding: '8px 15px',
                                  backgroundColor: '#0070f3',
                                  color: '#fff',
                                  borderRadius: '4px',
                                  textDecoration: 'none',
                                  fontSize: '14px',
                                }}
                            >
                              더보기
                            </Link>
                          </div>
                        </li>
                    ))}
                  </ul>
              ) : (
                  <p>주문이 존재하지 않습니다.</p>
              )}

              {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            style={{
                              padding: '5px 10px',
                              margin: '0 5px',
                              backgroundColor: currentPage === page ? '#0070f3' : '#fff',
                              color: currentPage === page ? '#fff' : '#000',
                              border: '1px solid #ddd',
                              cursor: 'pointer',
                            }}
                        >
                          {page}
                        </button>
                    ))}
                  </div>
              )}
            </div>
        )}
      </div>
  );
}

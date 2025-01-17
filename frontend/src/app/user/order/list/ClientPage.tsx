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

  const getOrdersByEmail = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('유효한 이메일을 입력해주세요.');
      setOrders(null);
      return;
    }

    setLoading(true);
    setError(null);
    setOrders(null);

    try {
      const data = await client.GET(`/order/by-email?email=${encodeURIComponent(email)}`);
      setOrders(data.data.content); // 응답 데이터를 바로 저장
    } catch (err) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

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
          {Array.isArray(orders) && orders.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {orders.map((order, index) => (
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
                  <p><strong>주문 내역:</strong> {order.orderItems[0].productName} 외 {order.orderItems.length - 1}건</p>
                  <p><strong>주문 금액:</strong> {order.totalPrice}</p>
                  <p><strong>배송 상태:</strong> {order.status}</p>
                  <div style={{ marginTop: '10px', textAlign: 'right' }}>
                    <Link
                      href={`/user/order/list/${order.id}`}
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
        </div>
      )}
    </div>
  );
}
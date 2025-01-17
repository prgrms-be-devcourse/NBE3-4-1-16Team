'use client';

import type { components } from '@/lib/backend/apiV1/schema';

type OrderResponseDTO = components['schemas']['OrderResponseDTO'];

export default function ClientPage({ order }: { order: OrderResponseDTO }) {
  if (!order) {
    return <p>주문 데이터를 불러올 수 없습니다.</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'left', color: '#333', marginBottom: '30px' }}>주문 상세 정보</h1>

      {/* 주문 상세 정보 섹션 */}
      <div style={{
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
      }}>
        <p><strong>주문 ID:</strong> {order.id}</p>
        <p><strong>주문 금액:</strong> {order.totalPrice.toLocaleString()} 원</p>
        <p><strong>배송 상태:</strong>
          <span style={{ fontWeight: 'bold', color: order.status === '배송 완료' ? '#28a745' : '#dc3545' }}>
            {order.status}
          </span>
        </p>
      </div>

      {/* 주문 상품 목록 제목 */}
      <h2 style={{ color: '#333', marginBottom: '20px', textAlign: 'left' }}>주문 상품 목록</h2>

      {/* 주문 상품 목록 섹션 */}
      {order.orderItems && order.orderItems.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {order.orderItems.map((item, index) => (
            <li key={index} style={{
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}>
              <p><strong>상품명:</strong> {item.productName}</p>
              <p><strong>수량:</strong> {item.count}</p>
              <p><strong>가격:</strong> {item.price.toLocaleString()} 원</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>주문 상품이 없습니다.</p>
      )}

      {/* 돌아가기 버튼 */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={() => window.history.back()}
          style={{
            padding: '12px 25px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
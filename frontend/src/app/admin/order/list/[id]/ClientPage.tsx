'use client';

import type { components } from '@/lib/backend/apiV1/schema';

type OrderResponseDTO = components['schemas']['OrderResponseDTO'];

export default function ClientPage({ order }: { order: OrderResponseDTO }) {
  if (!order) {
    return <p>주문 데이터를 불러올 수 없습니다.</p>;
  }

  const handleUpdateStatus = () => {
    // 배송 상태 변경 로직 구현
    alert('배송 상태 변경 클릭');
  };

  const handleDeleteOrder = () => {
    // 삭제 로직 구현
    alert('주문 삭제 클릭');
  };

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
        <p><strong>주문 ID: </strong>{order.id}</p>
        <p><strong>주문 일자: </strong>
          {
            new Date(order.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
            ' ' +
            new Date(order.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }).replace('AM', '').replace('PM', '') // 14시 25분 형태로 출력
          }
        </p>
        <p><strong>갱신 일자: </strong>
          {
            new Date(order.modifiedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
            ' ' +
            new Date(order.modifiedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }).replace('AM', '').replace('PM', '') // 14시 25분 형태로 출력
          }
        </p>
        <p><strong>주문 금액: </strong>{order.totalPrice.toLocaleString()}원</p>
        <p><strong>배송 상태: </strong>{
                            {
                              UNKNOWN: "알 수 없음",
                              CANCELLED: "취소",
                              PAYMENT_COMPLETED: "결제 완료",
                              PREPARING: "배송 준비",
                              SHIPPING: "배송 중",
                              COMPLETED: "배송 완료",
                            }[order.status] || "알 수 없음"
                          }</p>
      </div>

      {/* 주문 상품 목록 제목 */}
      <h2 style={{ color: '#333', marginBottom: '20px', textAlign: 'left' }}>주문 내역</h2>

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
              <p><strong>수량:</strong> {item.count}개</p>
              <p><strong>가격:</strong> {item.price.toLocaleString()}원</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>주문 상품이 없습니다.</p>
      )}

      {/* 버튼들 */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={handleUpdateStatus}
          style={{
            padding: '12px 25px',
            backgroundColor: '#f39c12',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginRight: '10px', // 버튼 간 간격 조정
          }}
        >
          배송 상태 변경
        </button>
        <button
          onClick={handleDeleteOrder}
          style={{
            padding: '12px 25px',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginRight: '10px', // 버튼 간 간격 조정
          }}
        >
          삭제
        </button>
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
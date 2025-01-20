'use client';

import { useState } from 'react';
import type { components } from '@/lib/backend/apiV1/schema';
import client from '@/lib/backend/client';

type OrderResponseDTO = components['schemas']['OrderResponseDTO'];

export default function ClientPage({ order }: { order: OrderResponseDTO }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  if (!order) {
    return <p>주문 데이터를 불러올 수 없습니다.</p>;
  }

  const CustomTime = ({ input }: { input: string }) => {
      const parts = input.split(',')
      const year = parseInt(parts[0].trim() + parts[1].trim())
      const month = parseInt(parts[2].trim()).toString().padStart(2, '0')
      const day = parseInt(parts[3].trim()).toString().padStart(2, '0')
      var hour =
        parseInt(parts[4].trim()) >= 12
          ? parseInt(parts[4].trim()) - 12
          : parseInt(parts[4].trim())
      var after = parts[4] >= 12 ? '오후' : '오전'
      const minute = parseInt(parts[5].trim())
      return `${year}. ${month}. ${day}.   ${after} ${hour}시 ${minute}분`
  }

  const statusOptions = {
    UNKNOWN: '알 수 없음',
    CANCELLED: '취소',
    PAYMENT_COMPLETED: '결제 완료',
    PREPARING: '배송 준비',
    SHIPPING: '배송 중',
    COMPLETED: '배송 완료',
  };

  const handleUpdateStatus = async () => {
    if (isUpdating) return;

    if (confirm(`배송 상태를 "${statusOptions[selectedStatus]}"(으)로 변경하시겠습니까?`)) {
      setIsUpdating(true);

      try {
        const apiResponse = await client.PUT(`/order/${order.id}/status?status=${encodeURIComponent(selectedStatus)}`);
        const response = apiResponse.response;
        if (response.ok) {
          alert('배송 상태가 성공적으로 변경되었습니다.');
        } else {
          alert(response.error || '배송 상태 변경에 실패했습니다.');
        }
        window.location.href = '/admin/order/list';
      } catch (err) {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleDeleteOrder = async () => {
    if (isDeleting) return; // 중복 클릭 방지

    if (confirm('정말로 이 주문을 삭제하시겠습니까?')) {
      setIsDeleting(true);

        try {
          const apiResponse = await client.DELETE(`/order/${order.id}`);
          const response = apiResponse.response;
          if (response.ok) {
            alert('주문을 성공적으로 삭제했습니다.');
          } else {
            alert(response.error || '주문 삭제에 실패했습니다.');
          }
          window.location.href = '/admin/order/list';
        } catch (err) {
          setError(err.message || '알 수 없는 오류가 발생했습니다.');
        } finally {
          setIsDeleting(false);
        }
    }
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
        <p><strong>주문 ID: </strong>{order.id}</p>
        <p><strong>주문 일자: </strong><CustomTime input={order.createdAt.toLocaleString()}/></p>
        <p><strong>갱신 일자: </strong><CustomTime input={order.modifiedAt.toLocaleString()}/></p>
        <p><strong>주문 금액: </strong>{order.totalPrice.toLocaleString()}원</p>
        <p><strong>배송 상태: </strong>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '8px',
              fontSize: '14px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: '#fff',
            }}
          >
            {Object.entries(statusOptions).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </p>
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
          disabled={isUpdating}
          style={{
            padding: '12px 25px',
            backgroundColor: isUpdating ? '#ccc' : '#f39c12',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: isUpdating ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginRight: '10px',
          }}
        >
          {isUpdating ? '변경 중...' : '배송 상태 변경'}
        </button>
        <button
          onClick={handleDeleteOrder}
          disabled={isDeleting}
          style={{
            padding: '12px 25px',
            backgroundColor: isDeleting ? '#ccc' : '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: isDeleting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            marginRight: '10px',
          }}
        >
          {isDeleting ? '삭제 중...' : '삭제'}
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
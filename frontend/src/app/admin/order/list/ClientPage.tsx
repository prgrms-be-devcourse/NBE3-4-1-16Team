'use client';

import type { components } from '@/lib/backend/apiV1/schema';
import React, { useState } from "react";
import Link from 'next/link';

type ApiResponseListOrderResponseDTO = components['schemas']['ApiResponseListOrderResponseDTO'];

export default function ClientPage({ orders }: { orders: ApiResponseListOrderResponseDTO }) {
  // 주문 데이터가 없을 경우 빈 배열로 초기화
  const orderList = Array.isArray(orders) ? orders : [];

  // 검색어, 검색 기준, 현재 페이지 상태 관리
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriterion, setSearchCriterion] = useState<'id' | 'email'>('id');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // 주문 목록 필터링: 검색 기준에 맞게 주문 필터링
  const filteredOrders = orderList.filter((order) =>
    searchCriterion === 'id'
      ? order.id.toString().includes(searchTerm)  // 주문 ID로 검색
      : order.email.includes(searchTerm)          // 주문자 이메일로 검색
  );

  // 페이지에 표시할 주문 목록 계산
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // 페이지 변경 함수
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // 수정 버튼 클릭 시 실행될 함수
  const handleEdit = (orderId: string) => {
    alert(`주문 ID ${orderId} 수정 클릭`);
    // 수정 페이지로 리디렉션하거나 수정 모달을 여는 로직을 추가할 수 있습니다.
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>주문 목록</h1>

      {currentOrders.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>주문 내역이 없습니다.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <thead style={{ backgroundColor: '#f4f4f9', textAlign: 'center' }}>
            <tr>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: '#333' }}>주문 ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: '#333' }}>주문자 이메일</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: '#333' }}>주문 일자</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: '#333' }}>갱신 일자</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: '#333' }}>주문 내역</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: '#333' }}>주문 금액</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: '#333' }}>배송 상태</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', color: '#333' }}>관리</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order) => (
              <tr key={order.id} style={{ textAlign: 'center', backgroundColor: '#fff' }}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.id}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.email}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {
                    new Date(order.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
                    ' ' +
                    new Date(order.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }).replace('AM', '').replace('PM', '')
                  }
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {
                    new Date(order.modifiedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) +
                    ' ' +
                    new Date(order.modifiedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }).replace('AM', '').replace('PM', '')
                  }
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {order.orderItems[0].productName.length > 8
                    ? order.orderItems[0].productName.substring(0, 8) + '...'
                    : order.orderItems[0].productName}
                  외 {order.orderItems.length - 1}건
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{order.totalPrice.toLocaleString()}원</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  {
                    {
                      UNKNOWN: "알 수 없음",
                      CANCELLED: "취소",
                      PAYMENT_COMPLETED: "결제 완료",
                      PREPARING: "배송 준비",
                      SHIPPING: "배송 중",
                      COMPLETED: "배송 완료",
                    }[order.status] || "알 수 없음"
                  }
                </td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                  <Link
                    href={`/admin/order/list/${order.id}`}
                    style={{
                      padding: '6px 12px',
                      fontSize: '14px',
                      color: '#fff',
                      backgroundColor: '#007BFF',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    수정
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <select
          value={searchCriterion}
          onChange={(e) => setSearchCriterion(e.target.value as 'id' | 'email')}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '80px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            marginRight: '10px',
          }}
        >
          <option value="id">ID</option>
          <option value="email">이메일</option>
        </select>
        <input
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '300px',
            borderRadius: '4px',
            border: '1px solid #ddd',
          }}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            padding: '10px',
            marginRight: '5px',
            fontSize: '16px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          이전
        </button>
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            padding: '10px',
            marginLeft: '5px',
            fontSize: '16px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
}
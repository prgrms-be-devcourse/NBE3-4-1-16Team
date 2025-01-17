'use client'

import type { components } from '@/lib/backend/apiV1/schema'
import client from '@/lib/backend/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ClientPage({
  responseBody,
}: {
  responseBody: components['schemas']['ApiResponseListProductDto']
}) {
  const router = useRouter()

  const handleDelete = async (productId: number) => {
    if (!confirm('정말로 삭제하시겠습니까?')) return

    const response = await client.DELETE('/products/{id}', {
      params: {
        path: {
          id: productId,
        },
      },
    })

    if (response.error) {
      alert(response.error.message)
      return
    }

    alert(response.data.message)

    router.replace('/admin/products')
  }

  return (
    <>
      <div className="flex flex-col">
        <h2 className="text-5xl font-extrabold mt-20 mb-10 text-center">
          Products
        </h2>
        <div className="flex justify-end">
          <Link
            href="/admin/products/create"
            className="py-3 px-5 block bg-[#59473F] text-white rounded-[8px]"
          >
            제품 등록
          </Link>
        </div>

        <table className="table-fixed bg-white mt-3 w-full">
          <colgroup>
            <col className="w-[80px]" />
            <col className="w-[180px]" />
            <col width="" />
            <col className="w-[150px]" />
            <col className="w-[100px]" />
            <col className="w-[130px]" />
            <col className="w-[130px]" />
            <col className="w-[150px]" />
          </colgroup>
          <thead className="text-center bg-[#59473F] text-white">
            <tr>
              <th className="py-5">번호</th>
              <th>이미지</th>
              <th>제품명</th>
              <th>카테고리</th>
              <th>가격</th>
              <th>등록 날짜</th>
              <th>수정 날짜</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {responseBody.content?.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-[#eee] bg-white text-center"
              >
                <td className="px-3">{index + 1}</td>
                <td>
                  <div className="w-[150px] h-[150px] p-3 inline-block">
                    <img
                      src={item.imageUrl}
                      alt={item.productName}
                      className="max-h-full mx-auto"
                    />
                  </div>
                </td>
                <td className="p-3 text-left">{item.productName}</td>
                <td className="px-3">{item.category}</td>
                <td className="px-3">{Number(item.price).toLocaleString()}</td>
                <td className="px-3">
                  {new Intl.DateTimeFormat('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(item.createDate))}
                </td>
                <td className="px-3">
                  {new Intl.DateTimeFormat('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  }).format(new Date(item.modifyDate))}
                </td>
                <td>
                  <Link
                    href={`/admin/products/modify/${item.id}`}
                    className="py-2 px-3 bg-[#59473F] text-white rounded-[8px]"
                  >
                    수정
                  </Link>{' '}
                  <button
                    type="button"
                    className="py-2 px-3 bg-red-800 text-white rounded-[8px]"
                    onClick={() => handleDelete(item.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

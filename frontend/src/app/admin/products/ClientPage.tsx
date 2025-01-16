'use client'

import type { components } from '@/lib/backend/apiV1/schema'
import Link from 'next/link'

export default function ClientPage({
  responseBody,
}: {
  responseBody: components['schemas']['ApiResponseListProductDto']
}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <Link
            href="/admin/products/create"
            className="py-3 px-5 block bg-[#59473F] text-white rounded-[8px]"
          >
            제품 등록
          </Link>
        </div>
        <ul className="grid grid-cols-4 gap-4">
          {responseBody.content?.map((item) => (
            <li
              key={item.id}
              className="border-[1px] border-[#ccc] my-3 flex flex-col"
            >
              <div
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  paddingBottom: '100%',
                }}
              ></div>
              <div className="p-3 flex-grow grid grid-rows-[auto_1fr_auto_auto]">
                <div className="text-sm text-gray-400 font-bold">
                  {item.category}
                </div>
                <div className="my-3 justify-self-start">
                  {' '}
                  {item.productName}
                </div>
                <div className="w-full justify-self-end text-lg font-bold text-[#59473F]">
                  {Number(item.price).toLocaleString()}
                </div>
                <div className="mt-3 w-full justify-self-end text-right">
                  <button
                    type="button"
                    className="py-2 px-3 bg-[#59473F] text-white rounded-[8px]"
                  >
                    수정
                  </button>{' '}
                  <button
                    type="button"
                    className="py-2 px-3 bg-[#59473F] text-white rounded-[8px]"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

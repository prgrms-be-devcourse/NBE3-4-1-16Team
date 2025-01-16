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
      <ul>
        {responseBody.content?.map((item) => (
          <li key={item.id} className="border-[2px] border-[red] my-3">
            <div>id : {item.id}</div>
            <div>createDate : {item.createDate}</div>
            <div>modifyDate : {item.modifyDate}</div>
            <div>category : {item.category}</div>
            <div>productName : {item.productName}</div>
            <div>price : {item.price}</div>
            <div>
              <img src={`${item.imageUrl}`} alt="" />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

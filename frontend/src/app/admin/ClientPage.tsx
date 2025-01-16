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
            <Link className="block" href={`/post/${item.id}`}>
              <div>id : {item.id}</div>
              <div>createDate : {item.createDate}</div>
              <div>modifyDate : {item.modifyDate}</div>
              <div>authorId : {item.category}</div>
              <div>authorName : {item.productName}</div>
              <div>title : {item.price}</div>
              <div>published : {`${item.imageUrl}`}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

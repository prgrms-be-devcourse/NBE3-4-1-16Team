'use client'

import React, { useEffect, useState } from 'react'
import client from '@/lib/backend/client'
import ClientPage from './ClientPage'

export default function Page() {
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')

  const [responseBody, setResponseBody] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await client.GET('/products/{id}', {
          params: {
            path: {
              id: Number(id),
            },
          },
        })
        setResponseBody(response.data)
      } catch (error) {
        console.error('데이터 가져오기 실패', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <div>로딩 중...</div>
  }

  // responseBody나 content가 없을 경우 에러 메시지 표시
  if (!responseBody || !responseBody.content) {
    return <div>에러: 데이터가 없습니다.</div>
  }

  if (!id) {
    return <div>에러: 제품을 찾을 수가 없습니다.</div>
  }

  return (
    <>
      <ClientPage responseBody={responseBody} id={id} />
    </>
  )
}

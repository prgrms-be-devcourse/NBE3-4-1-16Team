

import React, { useEffect, useState } from 'react'
import client from '@/lib/backend/client'
import ClientPage from './ClientPage'
import { cookies } from "next/headers";

export default async function Page({ params }: { params: { id: number } }) {

  const { id } =  params;
  const response = await client.GET("/products/{id}", {
    params: {
      path: {
        id,
      },
    },
    headers: {
      cookie: (await cookies()).toString(),
    },
  });
  if (response.error) {
    return <>{response.error.msg}</>;
  }
  const responseBody = response.data!!;
  return (
    <>
      <ClientPage responseBody={responseBody} id={id} />
    </>
  )
}

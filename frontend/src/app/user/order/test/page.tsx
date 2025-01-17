import client from '@/lib/backend/client'
import ClientPage from './ClientPage'

export default async function Page() {
  const response = await client.GET('/order')

  const responseBody = response.data!!

  return (
      <>
        <ClientPage responseBody={responseBody} />
      </>
  )
}

import client from "@/lib/backend/client";
import ClientPage from './ClientPage'

export default async function Page() {
    const response = await client.GET('/products')
    const responseBody = response.data!!

    // 테스트 무작위 수량
    // const counts = responseBody.content?.map(() => Math.floor(Math.random() * 5 + 1)) || [];

    return (
        <>
            <div>
                <ClientPage responseBody={responseBody}/>
            </div>
        </>
    )
}

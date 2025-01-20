import type {Metadata} from 'next'
import '../globals.css'
import Link from "next/link";

export const metadata: Metadata = {
    title: 'User - Grids & Circles',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            {/*  Header  */}
            <header className="border-[#ccc] border-b p-5 flex bg-white">
                <h1 className="text-4xl font-extrabold align-middle">
                    <Link href="/user">
                        Grids & Circles
                        <span className="text-sm text-gray-400 font-normal ml-2">USER</span>
                    </Link>
                </h1>
                <nav className="ml-auto flex gap-5 items-center">
                    <Link
                        href="/user/order/create"
                        className="align-middle block text-lg text-gray-800 font-semibold"
                    >
                        주문 등록
                    </Link>
                    <Link
                        href="/user/order/cart"
                        className="align-middle block text-lg text-gray-800 font-semibold"
                    >
                        장바구니
                    </Link>
                    <Link
                        href="/user/order/list"
                        className="align-middle block text-lg text-gray-800 font-semibold"
                    >
                        주문 내역
                    </Link>
                </nav>
            </header>

            {/*  Main Content  */}
            <main className="flex-grow p-5 bg-[#f5f5f5]">
                <div className="max-w-[1800px] mx-auto">{children}</div>
            </main>

        </>
    )
}

'use client'

import client from "@/lib/backend/client";
import { useRouter } from "next/navigation";
export default function ClientPage() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.productName.value.length === 0) {
      alert("이름을 입력해주세요.");
      form.productName.focus();
      return;
    }
    if (form.category.value.length === 0) {
      alert("카테고리를 입력해주세요.");
      category.focus();
      return;
    }
    if (form.price.value.length === 0) {
      alert("가격을 입력해주세요.");
      form.price.focus();
      return;
    }
    if (form.imageUrl.value.length === 0) {
      alert("url을 입력해주세요.");
      form.imageUrl.focus();
      return;
    }
    const response = await client.POST("/products", {
      body: {
        productName: form.productName.value,
        category: form.category.value,
        price: form.price.value,
        imageUrl: form.imageUrl.value
      },
    });
    if (response.error) {
      alert(response.error.message);
      return;
    }
    alert(response.data.message);
  };
  return (
    <>
      <h1>상품 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제품이름</label>
           <input type="text" name="productName" className="p-2" placeholder="내용" />
        </div>
        <div>
          <label>카테고리</label>
           <input type="text" name="category" className="p-2" placeholder="내용" />
        </div>
        <div>
          <label>가격</label>
           <input type="number" name="price" className="p-2" placeholder="내용" />
        </div>
        <div>
          <label>이미지</label>
           <input type="text"name="imageUrl" className="p-2" placeholder="내용" />
        </div>
        <div>
          <input type="submit" value="작성" />
        </div>
      </form>
    </>
  );
}
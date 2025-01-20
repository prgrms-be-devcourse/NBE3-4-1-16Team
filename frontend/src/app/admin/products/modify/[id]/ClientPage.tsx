'use client'
import React, { useState } from 'react';
import type { components } from '@/lib/backend/apiV1/schema'
import client from '@/lib/backend/client'
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function ClientPage({
  id,
  responseBody,
}: {
  id: string
  responseBody: components['schemas']['ApiResponseProductDto']
}) {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const baseDir = "http://localhost:8080/";
  const router = useRouter()
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await axios.post('http://localhost:8080/products/image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                  if(response.data.success){
                    alert(`이미지가 성공적으로 업로드되었습니다.`);
                    setImageUrl(`${baseDir}${response.data.message}`);
                  }
                  else{
                      alert('지원하지않는 파일 형식입니다.');
                    }
                } else {
                    alert('이미지 업로드 실패했습니다.');
                }
            } catch (error) {
                console.error('업로드 중 오류 발생:', error);
            }
        }
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let url
    const form = e.target as HTMLFormElement
    if (form.productName.value.length === 0) {
      alert('이름을 입력해주세요.')
      form.productName.focus()
      return
    }
    if (form.category.value.length === 0) {
      alert('카테고리를 입력해주세요.')
      form.category.focus()
      return
    }
    if (form.price.value.length === 0) {
      alert('가격을 입력해주세요.')
      form.price.focus()
      return
    }
      if (imageUrl === null) {
        if(responseBody.content?.imageUrl === null)
           url = "https://res.cloudinary.com/heyset/image/upload/v1689582418/buukmenow-folder/no-image-icon-0.jpg";
        url = responseBody.content?.imageUrl;
      }
    else{
         url = imageUrl;
      }
    const response = await client.PUT('/products/{id}', {
      params: {
        path: {
          id: Number(id),
        },
      },
      body: {
        productName: form.productName.value,
        category: form.category.value,
        price: form.price.value,
        imageUrl: url
      },
    })
    if (response.error) {
      alert(response.error.message)
      return
    }
    alert(response.data.message)
    router.push('/admin/products/')
  }
  return (
    <>
      <h2 className="text-5xl font-extrabold mt-20 mb-10 text-center">
        상품 수정
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="max-w-[1200px] mx-auto">
          <table className="table-fixed bg-white w-full border-t-2 border-[#59473F]">
            <colgroup>
              <col className="w-[180px]" />
              <col width="" />
            </colgroup>
            <tbody>
              <tr className="border-b border-[#eee]">
                <th className="bg-[#59473F] text-white">
                  <label htmlFor="productName">제품 이름</label>
                </th>
                <td className="p-5">
                  <input
                    type="text"
                    name="productName"
                    id="productName"
                    className="p-2 h-[50px] w-full border-[1px] border-[#ddd]"
                    defaultValue={responseBody.content?.productName}
                    placeholder="제품 이름"
                  />
                </td>
              </tr>
              <tr className="border-b border-[#eee]">
                <th className="bg-[#59473F] text-white">
                  <label htmlFor="category">카테고리</label>
                </th>
                <td className="p-5">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    className="p-2 h-[50px] w-full border-[1px] border-[#ddd]"
                    defaultValue={responseBody.content?.category}
                    placeholder="카테고리"
                  />
                </td>
              </tr>
              <tr className="border-b border-[#eee]">
                <th className="bg-[#59473F] text-white">
                  <label htmlFor="price">가격</label>
                </th>
                <td className="p-5">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="p-2 h-[50px] w-full border-[1px] border-[#ddd]"
                    defaultValue={responseBody.content?.price}
                    placeholder="가격"
                  />
                </td>
              </tr>
              <tr className="border-b-2 border-[#59473F]">
                <th className="bg-[#59473F] text-white">
                  <label htmlFor="imageUrl">이미지</label>
                </th>
                <td className="p-5">
                      <input
                          type="file"
                          className="form-control"
                          id="imageFile"
                          name="file"
                          onChange={handleFileChange}
                      />


                      {imageUrl ? (
                      <img src={`${imageUrl}`} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />):
                      (<img src={`${responseBody.content?.imageUrl}`} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-10 text-center">
            <button
              type="button"
              className="w-[150px] h-[50px] bg-gray-400 text-white rounded-[8px] h-[40px] mr-5"
              onClick={() => router.back()}
            >
              뒤로 가기
            </button>
            <input
              type="submit"
              value="등록하기"
              className="w-[150px] h-[50px] bg-[#59473F] text-white rounded-[8px] h-[40px]"
            />
          </div>
        </div>
      </form>
    </>
  )
}

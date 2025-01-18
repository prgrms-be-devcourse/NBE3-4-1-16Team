'use client'

import React, { useState } from 'react';
import client from '@/lib/backend/client'
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function ClientPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const baseDir = "http://localhost:8080/";
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setFile(e.target.files[0]);
      }
  };
  const handleSubmitImage = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!file) {
          alert('파일을 선택해주세요.');
          return;
      }
      const formData = new FormData();
      formData.append('file', file);
      try {
          const response = await axios.post('http://localhost:8080/products/image', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
          if (response.status === 200) {
              alert('이미지가 성공적으로 업로드되었습니다.');
              setImageUrl(`${baseDir}${response.data.message}`);
          } else {
              setMessage(`업로드에 실패했습니다. ${response.statusText}`);
          }
      } catch (error) {
          console.error('업로드 중 오류 발생:', error);
      }

  };
  const handleSubmitGetData = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const form = e.target as HTMLFormElement
      let url
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
        url = "https://res.cloudinary.com/heyset/image/upload/v1689582418/buukmenow-folder/no-image-icon-0.jpg";
      }
    else{
         url = imageUrl;
      }
      const response = await client.POST('/products', {
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

      router.replace('/admin/products')
  }
  return (
    <>
      <h2 className="text-5xl font-extrabold mt-20 mb-10 text-center">
        상품 등록
      </h2>
      <form onSubmit={handleSubmitGetData}>
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

                      <button
                          className="btn btn-primary"
                          onClick={handleSubmitImage}
                          className="w-[150px] h-[50px] bg-[#59473F] text-white rounded-[8px] h-[40px]">
                          업로드
                      </button>
                      {imageUrl && (
                      <img src={`${imageUrl}`} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '300px' }} />)}
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

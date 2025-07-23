"use client";

import React from 'react';
import '@/app/globals.css';
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPencil, faPlus, faCheck, faClock,faEyeSlash,faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import articleInterface from "../types/article";
import { createdArticle, deleteArticle, editArticle, changeStatusArticle } from "../services/articleService";
import { Editor } from '@tinymce/tinymce-react';
import Link from 'next/link';
const PendingPostsPage = () => {
  const [posts, setPosts] = useState<articleInterface[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editorData, setEditorData] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<articleInterface | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [imageFile, setImageFile] = useState<File | string | null>(null);
  const [status, setStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(20);
  const editorRef = useRef<any>(null);
  const getAPIArticle = async (): Promise<articleInterface[]> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const typeToken = localStorage.getItem("typeToken");
      if (accessToken && typeToken) {
        const parseaccessToken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);
        const res = await fetch(`https://huunghi.id.vn/api/post/indexAdmin?page=${currentPage}`, {
          method: "GET",
          headers: {
            "Authorization": `${parsetypeToken} ${parseaccessToken}`,
            "Content-Type": "application/json",
          }
        });
        if (!res.ok) {
          console.error("❌ Fetch failed:", res.status, res.statusText);
          return [];
        }
        const data = await res.json();
        const article = data?.data?.posts?.data;
        return article;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  // Hàm gọi API lấy bài viết
  const refreshPosts = async () => {
    const data = await getAPIArticle();
    setPosts(data);
  };
  useEffect(() => {
    refreshPosts();
  }, []);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Bài viết chờ xác nhận</h1>
          <p className="text-sm text-gray-500">
            Danh sách bài viết đang chờ phê duyệt
          </p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100">
          <FontAwesomeIcon icon={faClock} /> Bài viết chờ xác nhận
        </button>
      </header>


      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Danh sách bài viết chờ duyệt</h2>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{posts.length} bài viết hiển thị</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                {["ID", "Tiêu đề", "Nội dung", "Người đăng", "Ngày đăng", "Trạng thái", "Thao tác"].map((th, i) => (
                  <th key={i} className="px-4 py-3 font-medium text-gray-700 border-b border-gray-200">{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-4 border-b border-gray-200">{post.id_bai_viet}</td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded overflow-hidden mr-3">
                        <img src={`https://huunghi.id.vn/storage/posts/${post.anh_bai_viet}`} alt="Bài viết" className="w-10 h-10 rounded object-cover" />
                      </div>
                      <span className='line-clamp-2 w-[250px]'>{post.ten_bai_viet}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <div dangerouslySetInnerHTML={{ __html: post.noi_dung_bai_viet.slice(0, 30) + '...' }} />
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">{post.id_nguoi_tao}</td>
                  <td className="px-4 py-4 border-b border-gray-200">{new Date(post.created_at).toLocaleDateString("vi-VN")}</td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <button
                      onClick={async () => {
                        const confirmChange = confirm("Bạn có chắc chắn muốn đổi trạng thái bài viết này?");
                        if (!confirmChange) return;
                        const success = await changeStatusArticle(post.duong_dan);
                        if (!success) {
                          alert("❌ Đổi trạng thái thất bại");
                        } else {
                          alert("✅ Đổi trạng thái thành công");
                          const updated = await getAPIArticle();
                          setPosts(updated);
                        }
                      }}
                      className=" rounded flex items-center justify-center hover:border-yellow-500 text-yellow-600"
                      title="Đổi trạng thái"
                    >
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${Number(post.trang_thai) === 1 ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                        {Number(post.trang_thai) === 1 ? "Đang hoạt động" : "Dừng hoạt động"}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-4 border-b border-gray-200">
                    <div className="flex gap-2">
                      <button className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-green-600 text-green-700">
                        {post.trang_thai === 0 ? <FontAwesomeIcon icon={faEyeSlash} onClick={()=>{alert('Trạng thái phải hoạt động!')}} /> : <Link href={`/blog-detail/${post.duong_dan}`}><FontAwesomeIcon icon={faEye} /></Link>}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-white">
          {/* Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '} */}
          <div className="text-sm text-gray-600">
            Hiển thị <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{' '}
            <span className="font-medium">{Math.min(currentPage * perPage, posts.length + (currentPage - 1) * perPage)}</span>{' '}
            trong tổng số <span className="font-medium">{posts.length}</span> bài viết
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md border ${currentPage === pageNum ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span className="px-3 py-1">...</span>
            )}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPostsPage;

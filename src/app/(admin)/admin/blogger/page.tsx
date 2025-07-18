"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import articleInterface from "../types/article";
import { createdArticle, deleteArticle, editArticle } from "../services/articleService";
import { Editor } from '@tinymce/tinymce-react';

export default function AdminPostManagement() {
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

    // Reset form sau khi submit
    const resetForm = () => {
        setShowForm(false);
        setSelectedPost(null);
        setTitle("");
        setSlug("");
        setImageFile(null);
        setStatus(false);
        editorRef.current?.setContent("");
    };

    // Thêm bài viết mới
    const handleCreateArticle = async () => {
        const content = editorRef.current?.getContent();
        if (!title || !slug || !content || !imageFile) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const newArticle = {
            ten_bai_viet: title,
            duong_dan: slug,
            noi_dung_bai_viet: content,
            trang_thai: 0,
            anh_bai_viet: "",
            id_nguoi_tao: 1,
        };

        try {
            await createdArticle(newArticle, imageFile as File);
            await refreshPosts();
            alert("Thêm bài viết thành công!");
            resetForm();
        } catch (error) {
            console.error("❌ Lỗi khi tạo bài viết:", error);
        }
    };

    // Sửa bài viết
    const handleEditArticle = async () => {
        const content = editorRef.current?.getContent();
        if (!selectedPost || !title || !slug || !content || !imageFile) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        const updateArticle = {
            ten_bai_viet: title,
            duong_dan: slug,
            noi_dung_bai_viet: content,
            trang_thai: status ? 1 : 0,
            id_nguoi_tao: 1,
        };

        try {
            await editArticle(selectedPost.duong_dan, updateArticle, imageFile as File);
            await refreshPosts();
            alert('Sửa bài viết thành công')
            resetForm();
        } catch (error) {
            console.error("❌ Lỗi khi cập nhật bài viết:", error);
        }
    };

    // Gọi đúng hàm khi submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPost) {
            await handleEditArticle();
        } else {
            await handleCreateArticle();
        }
    };

    useEffect(() => {
        refreshPosts();
    }, []);

    const handleDelete = async (slugArticle: string | number) => {
        const getdeleteArticle = await deleteArticle(slugArticle);
        if (getdeleteArticle) {
            alert("Xóa thành công");
            await refreshPosts();
        } else {
            alert("Xóa thất bại");
        }
    };
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <div className="p-6 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Quản lý Bài viết</h1>
                    <p className="text-gray-500 text-sm">Tạo mới và quản lý các bài viết trên website</p>
                </div>
                <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium"
                    onClick={() => {
                        setShowForm(true);
                        setSelectedPost(null);
                        setTitle("");
                        setSlug("");
                        setImageFile(null);
                        setStatus(false);
                        editorRef.current?.setContent("");
                    }}
                >
                    <FontAwesomeIcon icon={faPlus} /> Thêm mới
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-4">{selectedPost ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tiêu đề bài viết</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nhập tiêu đề bài viết" className="w-full border px-3 py-2 rounded" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Đường dẫn (URL)</label>
                            <div className="flex">
                                <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l text-sm text-gray-500">
                                    https://example.com/
                                </span>
                                <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border px-3 py-2 rounded-r" placeholder="duong-dan-bai-viet" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Nội dung bài viết</label>
                            <Editor
                                apiKey="pof9b2gtr6oym0zr3guzi3rct66l72tzsx5tjgda4znehvvb"
                                onInit={(evt, editor) => (editorRef.current = editor)}
                                initialValue={selectedPost ? selectedPost.noi_dung_bai_viet : ""}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor',
                                        'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                    ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic backcolor | ' +
                                        'alignleft aligncenter alignright alignjustify | ' +
                                        'bullist numlist outdent indent | removeformat | image | help',
                                    automatic_uploads: true,
                                    file_picker_types: 'image',
                                    file_picker_callback: (cb: any, value: any, meta: any) => {
                                        if (meta.filetype === 'image') {
                                            const input = document.createElement('input');
                                            input.setAttribute('type', 'file');
                                            input.setAttribute('accept', 'image/*');
                                            input.onchange = function () {
                                                const file = input.files?.[0];
                                                if (!file) return;
                                                const reader = new FileReader();
                                                reader.onload = function () {
                                                    const base64 = reader.result?.toString() || '';
                                                    cb(base64, { title: file.name });
                                                };
                                                reader.readAsDataURL(file);
                                            };
                                            input.click();
                                        }
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Ảnh đại diện</label>
                            <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full border px-3 py-2 rounded" />
                            {typeof imageFile === "string" && (
                                <div className="mt-2">
                                    <img src={`https://huunghi.id.vn/storage/posts/${imageFile}`} alt="Ảnh hiện tại" className="h-24 rounded" />
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <input id="postStatus" type="checkbox" checked={status} onChange={(e) => setStatus(e.target.checked)} className="h-5 w-5" />
                            <label htmlFor="postStatus">Riêng tư</label>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button type="button" className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white shadow" onClick={() => setShowForm(false)}>
                                Hủy bỏ
                            </button>
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium">
                                <i className="fas fa-save mr-2"></i> {selectedPost ? "Cập nhật" : "Lưu bài viết"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Tiêu đề</th>
                            <th className="px-4 py-2 text-left">Đường dẫn</th>
                            <th className="px-4 py-2 text-left">Nội dung</th>
                            <th className="px-4 py-2 text-left">Ngày đăng</th>
                            <th className="px-4 py-2 text-left">Trạng thái</th>
                            <th className="px-4 py-2 text-left">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-3 font-medium text-gray-800">{post.id_bai_viet}</td>
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img src={`https://huunghi.id.vn/storage/posts/${post.anh_bai_viet}`} alt="Bài viết" className="w-10 h-10 rounded object-cover" />
                                    <span>{post.ten_bai_viet}</span>
                                </td>
                                <td className="px-4 py-3 text-gray-700">{post.duong_dan}</td>
                                <td className="px-4 py-3 text-gray-700">
                                    <div dangerouslySetInnerHTML={{ __html: post.noi_dung_bai_viet.slice(0, 30) }} />
                                </td>
                                <td className="px-4 py-3 text-gray-700">{new Date(post.created_at).toLocaleDateString("vi-VN")}</td>
                                <td>
                                    <label className={`relative inline-flex text-xs items-center px-3 py-1 text-white rounded-full cursor-pointer ${post.trang_thai === 1 ? "bg-green-500" : "bg-red-500"}`}>
                                        {post.trang_thai === 1 ? "Hoạt động" : "Không hoạt động"}
                                    </label>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button onClick={() => {
                                            setTitle(post.ten_bai_viet);
                                            setSlug(post.duong_dan);
                                            setStatus(post.trang_thai === 1);
                                            setEditorData(post.noi_dung_bai_viet);
                                            setSelectedPost(post);
                                            setImageFile(post.anh_bai_viet);
                                            setShowForm(true);
                                            setTimeout(() => {
                                                if (editorRef.current) {
                                                    editorRef.current.setContent(post.noi_dung_bai_viet || "");
                                                }
                                            }, 0);
                                        }} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-indigo-500 text-indigo-600">
                                            <FontAwesomeIcon icon={faPencil} />
                                        </button>
                                        <button onClick={() => handleDelete(post.duong_dan)} className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 text-red-600">
                                            <FontAwesomeIcon icon={faTrash} />
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
                        Trước
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
                                className={`px-3 py-1 rounded-md border ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
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
                            className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                        >
                            {totalPages}
                        </button>
                    )}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                        Sau
                    </button>   
                </div>
            </div>
        </div>
    );
}

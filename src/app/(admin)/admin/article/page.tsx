"use client";

import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import articleInterface from "../types/article";
import {
  getAPIArticle,
  createdArticle,
  deleteArticle,
  editArticle,
} from "../services/articleService";
import { Editor } from "@tinymce/tinymce-react";

export default function AdminPostManagement() {
  const [posts, setPosts] = useState<articleInterface[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editorData, setEditorData] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<articleInterface | null>(
    null
  );
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [imageFile, setImageFile] = useState<File | string | null>(null);
  const [status, setStatus] = useState(false);

  // State cho bộ lọc (đã cập nhật)
  const [titleFilter, setTitleFilter] = useState("");
  const [contentFilter, setContentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<number | "">("");
  const [dateFilter, setDateFilter] = useState("");

  const editorRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hàm gọi API lấy bài viết (giữ nguyên)
  const refreshPosts = async () => {
    const data = await getAPIArticle();
    setPosts(data);
    setIsLoading(false);
  };

  // Logic lọc mới
  const filteredPosts = posts.filter((post) => {
    const titleMatch =
      titleFilter === "" ||
      post.ten_bai_viet.toLowerCase().includes(titleFilter.toLowerCase());

    const contentMatch =
      contentFilter === "" ||
      post.noi_dung_bai_viet
        .toLowerCase()
        .includes(contentFilter.toLowerCase());

    const statusMatch = statusFilter === "" || post.trang_thai === statusFilter;

    const dateMatch =
      dateFilter === "" ||
      new Date(post.created_at)
        .toLocaleDateString("vi-VN")
        .includes(dateFilter);

    return titleMatch && contentMatch && statusMatch && dateMatch;
  });

  // Các hàm khác giữ nguyên
  const resetForm = () => {
    setShowForm(false);
    setSelectedPost(null);
    setTitle("");
    setSlug("");
    setImageFile(null);
    setStatus(false);
    editorRef.current?.setContent("");
  };

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
      trang_thai: status ? 1 : 0,
      anh_bai_viet: "",
      id_nguoi_tao: 1,
    };

    try {
      await createdArticle(newArticle, imageFile as File);
      await refreshPosts();
      resetForm();
    } catch (error) {
      console.error("❌ Lỗi khi tạo bài viết:", error);
    }
  };

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
      await editArticle(
        selectedPost.duong_dan,
        updateArticle,
        imageFile as File
      );
      await refreshPosts();
      resetForm();
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật bài viết:", error);
    }
  };

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

  if (isLoading) {
    return (
      <div
        id="loading-screen"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">
            VERVESTYLE
          </div>
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-700 tracking-wide">
            Đang khởi động trải nghiệm của bạn...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Quản lý Bài viết
          </h1>
          <p className="text-gray-500 text-sm">
            Tạo mới và quản lý các bài viết trên website
          </p>
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
          <h2 className="text-lg font-semibold mb-4">
            {selectedPost ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">
                Tiêu đề bài viết
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề bài viết"
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Đường dẫn (URL)
              </label>
              <div className="flex">
                <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l text-sm text-gray-500">
                  https://example.com/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full border px-3 py-2 rounded-r"
                  placeholder="duong-dan-bai-viet"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Nội dung bài viết
              </label>
              <Editor
                apiKey="pof9b2gtr6oym0zr3guzi3rct66l72tzsx5tjgda4znehvvb"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={
                  selectedPost ? selectedPost.noi_dung_bai_viet : ""
                }
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | removeformat | image | help",
                  automatic_uploads: true,
                  file_picker_types: "image",
                  file_picker_callback: (cb: any, value: any, meta: any) => {
                    if (meta.filetype === "image") {
                      const input = document.createElement("input");
                      input.setAttribute("type", "file");
                      input.setAttribute("accept", "image/*");
                      input.onchange = function () {
                        const file = input.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = function () {
                          const base64 = reader.result?.toString() || "";
                          cb(base64, { title: file.name });
                        };
                        reader.readAsDataURL(file);
                      };
                      input.click();
                    }
                  },
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Ảnh đại diện
              </label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full border px-3 py-2 rounded"
              />
              {typeof imageFile === "string" && (
                <div className="mt-2">
                  <img
                    src={`https://huunghi.id.vn/storage/posts/${imageFile}`}
                    alt="Ảnh hiện tại"
                    className="h-24 rounded"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                id="postStatus"
                type="checkbox"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="h-5 w-5"
              />
              <label htmlFor="postStatus">Riêng tư</label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 border rounded text-sm font-medium text-gray-700 bg-white shadow"
                onClick={() => setShowForm(false)}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded text-sm font-medium"
              >
                <i className="fas fa-save mr-2"></i>{" "}
                {selectedPost ? "Cập nhật" : "Lưu bài viết"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Phần bộ lọc đã được cập nhật */}
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Lọc bài viết</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Từ khóa tìm kiếm */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium mb-1">Từ khóa</label>
            <input
              type="text"
              // value={keywordFilter}
              // onChange={(e) => setKeywordFilter(e.target.value)}
              placeholder="Nhập tiêu đề hoặc nội dung..."
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Ngày đăng */}
          <div>
            <label className="block text-sm font-medium mb-1">Ngày đăng</label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              value={statusFilter}
              // onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="1">Hoạt động</option>
              <option value="0">Không hoạt động</option>
            </select>
          </div>
        </div>

        {/* Nút xóa bộ lọc */}
        <div className="flex justify-end mt-4"></div>
      </div>

      {/* Phần table giữ nguyên */}
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
            {filteredPosts.map((post, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3 font-medium text-gray-800">
                  {post.id_bai_viet}
                </td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={`https://huunghi.id.vn/storage/posts/${post.anh_bai_viet}`}
                    alt="Bài viết"
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span>{post.ten_bai_viet}</span>
                </td>
                <td className="px-4 py-3 text-gray-700">{post.duong_dan}</td>
                <td className="px-4 py-3 text-gray-700">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.noi_dung_bai_viet.slice(0, 30),
                    }}
                  />
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {new Date(post.created_at).toLocaleDateString("vi-VN")}
                </td>
                <td>
                  <label
                    className={`relative inline-flex text-xs items-center px-3 py-1 text-white rounded-full cursor-pointer ${
                      post.trang_thai === 1 ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {post.trang_thai === 1 ? "Hoạt động" : "Không hoạt động"}
                  </label>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setTitle(post.ten_bai_viet);
                        setSlug(post.duong_dan);
                        setStatus(post.trang_thai === 1);
                        setEditorData(post.noi_dung_bai_viet);
                        setSelectedPost(post);
                        setImageFile(post.anh_bai_viet);
                        setShowForm(true);
                        setTimeout(() => {
                          if (editorRef.current) {
                            editorRef.current.setContent(
                              post.noi_dung_bai_viet || ""
                            );
                          }
                        }, 0);
                      }}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-indigo-500 text-indigo-600"
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.duong_dan)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:border-red-500 text-red-600"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

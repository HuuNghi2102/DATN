"use client";

import React, { useEffect, useState } from "react";
import TableRow from "../components/TableRow";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { faSearch,faChevronRight,faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import categoryInterface from "../components/interface/categoryProInterface";

interface Product {
  id: string;
  img: string;
  name: string;
  price: string;
  inventory: {
    color: string;
    size: string;
    quantity: number;
  }[];
  status: "in-stock" | "low-stock" | "out-of-stock";
}

const ProductList = ({ changeFlag }: { changeFlag: boolean }) => {
  const params = useSearchParams();
  const type = params.get('type');
  const router = useRouter();
  const [listProduct, setListProduct] = useState<any[]>([]);
  const [listCategory, setListCategory] = useState<categoryInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<number | "">("");
  const [status, setStatus] = useState<string>(type ? (type=='ban_chay' ? 'ban_chay' : 'ban_cham')  : "");
  const [inventory, setInventory] = useState<string>("");

  

  const fetchProduct = async (page: number = 1) => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const user = JSON.parse(userLocal);
      if (user.id_vai_tro == 1) {
        try {
          const res = await fetch(
            `https://huunghi.id.vn/api/product/listProduct?page=${page}&per_page=${perPage}&search=${search}&category=${category}&status=${status}&inventory=${inventory}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
            }
          );

          if (res.ok) {
            const result = await res.json();
            const listPro = result.data.products.data;
            console.log(result.data.products);
            setListProduct(listPro ? listPro : []);
            setTotalPages(result.data.products.last_page || 1);
          } else {
            alert("Lấy sản phẩm không thành công");
            setListProduct([]);
          }

          const resCategories = await fetch(
            "https://huunghi.id.vn/api/categoryProduct/listCategoryProduct",
            {
              headers: {
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
            }
          );

          if (resCategories.ok) {
            const resultResCategories = await resCategories.json();
            const categories = resultResCategories.data;
            setListCategory(categories);
          } else {
            alert("Lấy danh mục không thành công");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          setListProduct([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push("/user/userprofile");
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchProduct(currentPage);
  }, [currentPage, changeFlag, category, status, inventory]);

  const handleSearch = () => {
    fetchProduct();
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
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
    <div className="card bg-white rounded-lg shadow overflow-hidden">
      <div className="card-header px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
      </div>

      {/* Thêm UI bộ lọc - KHÔNG có chức năng */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Ô tìm kiếm theo tên */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tìm kiếm sản phẩm
            </label>
            <div className="relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Nhập tên sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-3 text-gray-400"
                />
              </form>
            </div>
          </div>

          {/* Lọc theo danh mục */}
          <div>
            <label className="block text-sm font-medium mb-1">Danh mục</label>
            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Trạng thái</option>
              {listCategory.map((c, i) => (
                <option key={i} value={c.id_loai_san_pham}>
                  {c.ten_loai}
                </option>
              ))}
            </select>
          </div>

          {/* Lọc theo trạng thái */}
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="dang_ban">Đang bán</option>
              <option value="ngung_ban">Ngừng bán</option>
              <option value="ban_chay">Bán Chạy</option>
              <option value="ban_cham">Bán Chậm</option>
            </select>
          </div>

          {/* Lọc theo tồn kho */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tình trạng tồn kho
            </label>
            <select
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="">Tất cả</option>
              <option value="con_hang">Còn hàng</option>
              <option value="sap_het">Sắp hết</option>
              <option value="het_hang">Hết hàng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Phần còn lại giữ nguyên */}
      <div className="card-body p-0">
        <div className="table-container overflow-x-auto rounded shadow-sm bg-white">
          <table className="table w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">
                  Mã SP
                </th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">
                  Tên sản phẩm
                </th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">
                  Giá
                </th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">
                  Trạng thái
                </th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">
                  Đã bán
                </th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">
                  Tồn kho
                </th>
                <th className="px-4 py-3 bg-gray-100 text-left font-medium text-gray-700 border-b border-gray-200">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(listProduct) &&
                listProduct.map((product, index) => (
                  <TableRow key={index} product={product} />
                ))}
            </tbody>
          </table>
        </div>

        {/* Phần phân trang giữ nguyên */}
<div className="flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-gray-200 bg-white">
  {/* Thông tin tổng đơn */}
  <div className="text-sm text-gray-600">
    Hiển thị{" "}
    <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> đến{" "}
    <span className="font-medium">
                  {Math.min(
              currentPage * perPage,
              listProduct.length+ (currentPage - 1) * perPage
            )}
    </span>{" "}
    trong tổng số <span className="font-medium">{listProduct.length * totalPages}</span> sản phẩm
  </div>

  {/* Nút phân trang */}
  <div className="w-full md:w-auto overflow-x-auto">
    <div className="flex justify-center md:justify-end space-x-2 min-w-max">
      {/* Prev */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md border ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {/* Page numbers */}
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
            className={`px-3 py-1 rounded-md border ${
              currentPage === pageNum
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Dấu ba chấm */}
      {totalPages > 5 && currentPage < totalPages - 2 && (
        <>
          <span className="px-3 py-1">...</span>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={`px-3 py-1 rounded-md border ${
              currentPage === totalPages
                ? "bg-indigo-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md border ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default ProductList;

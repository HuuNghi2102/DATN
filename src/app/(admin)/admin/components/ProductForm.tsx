// File: ProductForm.tsx
import React, { useState } from "react";
import ProductInterface from "./interface/productInterface";
import CategoryInterface from "./interface/categoryProInterface";
import { toast } from "react-toastify";

interface Props {
  product: ProductInterface;
  categories: CategoryInterface[];
  typeToken: string;
  accessToken: string;
}

export default function ProductForm({
  product,
  categories,
  typeToken,
  accessToken,
}: Props) {
  const [formData, setFormData] = useState<ProductInterface>(product);
  const [isSaving, setIsSaving] = useState(false);
  const [errForm, setErrForm] = useState({
    name: "",
    slug: "",
    description: "",
    priceOld: "",
    sale: "",
    priceNew: "",
    idCate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "gia_chua_giam" ||
        name === "gia_da_giam" ||
        name === "giam_gia"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setErrForm({
      name: "",
      slug: "",
      description: "",
      priceOld: "",
      sale: "",
      priceNew: "",
      idCate: "",
    });

    e.preventDefault();
    setIsSaving(true);

    try {
      // fetchImage
      const resUpdateProduct = await fetch(
        `https://huunghi.id.vn/api/product/updateProduct/${product.duong_dan}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${typeToken} ${accessToken}`,
          },
          body: JSON.stringify({
            name: formData.ten_san_pham,
            slug: formData.duong_dan,
            priceOld: formData.gia_chua_giam == 0 ? "" : formData.gia_chua_giam,
            sale: formData.phan_tram_giam == 0 ? "" : formData.phan_tram_giam,
            priceNew: formData.gia_da_giam,
            description: formData.mo_ta_san_pham,
            idCate: formData.id_loai_san_pham,
          }),
        }
      );

      const resultUpdatePro = await resUpdateProduct.json();

      if (resultUpdatePro.status == true) {
        const productUpdated = resultUpdatePro.data.product;
        setFormData(productUpdated);
      } else {
        if (resultUpdatePro.errors) {
          const errors = resultUpdatePro.errors;

          setErrForm({
            name: errors.name ? errors.name[0] : "",
            slug: errors.slug ? errors.slug[0] : "",
            description: errors.description ? errors.description[0] : "",
            priceOld: errors.priceOld ? errors.priceOld[0] : "",
            sale: errors.sale ? errors.sale[0] : "",
            priceNew: errors.priceNew ? errors.priceNew[0] : "",
            idCate: errors.idCate ? errors.idCate[0] : "",
          });
        }
        toast.error("Cập nhật sản phẩm không thành công");
      }
      // Here you would typically call an API to save the product
      console.log("Saving product:", formData);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Thông tin sản phẩm đã được lưu thành công!");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Có lỗi xảy ra khi lưu thông tin sản phẩm");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="bg-white shadow rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
        {product.trang_thai == 1 ? (
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded">
            <i className="fas fa-circle text-[0.5rem] mr-1"></i>
            Đang bán
          </div>
        ) : (
          <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-red-100 text-red-800 rounded">
            <i className="fas fa-circle text-[0.5rem] mr-1"></i>
            Ngưng bán
          </div>
        )}
      </div>
      <div className="p-6">
        <form id="productForm" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm *
            </label>
            <input
              type="text"
              name="ten_san_pham"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.ten_san_pham}
              onChange={handleChange}
              required
            />
            {errForm.name && (
              <p className="text-red-500 text-sm mt-1">{errForm.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Đường dẫn SEO
            </label>
            <input
              type="text"
              name="duong_dan"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.duong_dan}
              onChange={handleChange}
              placeholder="ao-thun-nam-co-tron"
            />
            <small className="text-gray-500 text-sm mt-1 block">
              Đường dẫn sẽ hiển thị: example.com/san-pham/ao-thun-nam-co-tron
            </small>
            {errForm.slug && (
              <p className="text-red-500 text-sm mt-1">{errForm.slug}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mô tả sản phẩm *
            </label>
            <textarea
              name="mo_ta_san_pham"
              rows={10}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Áo thun nam cổ tròn chất liệu cotton 100% thoáng mát, thấm hút mồ hôi tốt. Thiết kế đơn giản, dễ phối đồ, phù hợp nhiều dịp."
              value={formData.mo_ta_san_pham ?? ""}
              onChange={handleChange}
            ></textarea>
            {errForm.description && (
              <p className="text-red-500 text-sm mt-1">{errForm.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giá gốc (VND) *
              </label>
              <input
                min={0}
                type="number"
                name="gia_chua_giam"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.gia_chua_giam ?? ""}
                onChange={handleChange}
              />

              {errForm.priceOld && (
                <p className="text-red-500 text-sm mt-1">{errForm.priceOld}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giảm giá (%)
              </label>
              <input
                type="number"
                name="phan_tram_giam"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.phan_tram_giam ?? ""}
                onChange={handleChange}
                min={0}
                max={100}
              />
              {errForm.sale && (
                <p className="text-red-500 text-sm mt-1">{errForm.sale}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá bán (VND) *
            </label>
            <input
              type="number"
              name="id_loai_san_pham"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.gia_da_giam}
              onChange={handleChange}
            />
            {errForm.priceNew && (
              <p className="text-red-500 text-sm mt-1">{errForm.priceNew}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục sản phẩm *
            </label>
            <select
              name="id_loai_san_pham"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={formData.id_loai_san_pham}
              onChange={handleChange}
              required
            >
              {categories.map((c, i) => (
                <option key={i} value={c.id_loai_san_pham}>
                  {c.ten_loai}
                </option>
              ))}
            </select>

            {errForm.idCate && (
              <p className="text-red-500 text-sm mt-1">{errForm.idCate}</p>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Đang lưu...
                </>
              ) : (
                "Lưu thông tin sản phẩm"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

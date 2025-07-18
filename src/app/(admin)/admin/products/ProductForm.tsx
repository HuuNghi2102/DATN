"use client";

import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { FaBoxes, FaPlusCircle, FaSave, FaTimes } from "react-icons/fa";
import InventoryItem from "../components/InventoryItem";
import sizeInterface from "../components/interface/sizeInterface";
import categoryProductInterface from "../components/interface/categoryProInterface";
import { useRouter } from "next/navigation";

const ProductForm = ({
  onChangeStatusForm,
  onProductAdded,
  isOpenForm,
}: {
  onChangeStatusForm: () => void;
  onProductAdded: () => void;
  isOpenForm: boolean;
}) => {
  const basicColors = [
    { nameColor: "Đỏ", codeColor: "#FF0000" },
    { nameColor: "Xanh lá cây", codeColor: "#00FF00" },
    { nameColor: "Xanh dương", codeColor: "#0000FF" },
    { nameColor: "Vàng", codeColor: "#FFFF00" },
    { nameColor: "Lục lam (Cyan)", codeColor: "#00FFFF" },
    { nameColor: "Tím đỏ (Magenta)", codeColor: "#FF00FF" },
    { nameColor: "Đen", codeColor: "#000000" },
    { nameColor: "Trắng", codeColor: "#FFFFFF" },
    { nameColor: "Xám", codeColor: "#808080" },
    { nameColor: "Cam", codeColor: "#FFA500" },
    { nameColor: "Hồng", codeColor: "#FFC0CB" },
    { nameColor: "Nâu", codeColor: "#A52A2A" },
    { nameColor: "Tím", codeColor: "#800080" },
    { nameColor: "Xanh lục nhạt (Lime)", codeColor: "#00FF00" },
    { nameColor: "Xanh biển đậm (Navy)", codeColor: "#000080" },
    { nameColor: "Xanh da trời", codeColor: "#87CEEB" },
    { nameColor: "Xanh ngọc", codeColor: "#40E0D0" },
    { nameColor: "Vàng kem (Beige)", codeColor: "#F5F5DC" },
    { nameColor: "Vàng nghệ (Gold)", codeColor: "#FFD700" },
    { nameColor: "Xanh rêu", codeColor: "#556B2F" },
    { nameColor: "Xanh lá mạ", codeColor: "#7CFC00" },
    { nameColor: "Xanh cổ vịt", codeColor: "#008080" },
    { nameColor: "Xanh pastel", codeColor: "#B0E0E6" },
    { nameColor: "Hồng pastel", codeColor: "#FFD1DC" },
    { nameColor: "Nâu đất", codeColor: "#8B4513" },
    { nameColor: "Đỏ đô", codeColor: "#800000" },
    { nameColor: "Xám bạc", codeColor: "#C0C0C0" },
    { nameColor: "Xám đậm", codeColor: "#505050" },
    { nameColor: "Hồng cánh sen", codeColor: "#FF69B4" },
    { nameColor: "Cam cháy", codeColor: "#FF4500" },
  ];

  const [inventoryItems, setInventoryItems] = useState([{ id: 1 }]);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [listSize, setListSize] = useState<sizeInterface[]>();
  const [listCategory, setListCategory] = useState<categoryProductInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const [product, setProduct] = useState<any>({
    name: "",
    slug: "",
    description: "",
    price_old: "",
    percent: "",
    price_sale: "",
    images: [],
    idCate: 1,
    variant: {
      nameColor: "",
      codeColor: "",
      idSize: 1,
      quantity: "",
    },
  });
  const [errProduct, setErrProduct] = useState({
    name: "",
    slug: "",
    description: "",
    price_old: "",
    percent: "",
    price_sale: "",
    images: "",
    idCate: "",
    nameColor: "",
    codeColor: "",
    idSize: "",
    quantity: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async (page: number = 1) => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const user = JSON.parse(userLocal);
      if (user.id_vai_tro == 1) {
        setIsLoading(true);
        try {
          // fetchSize
          const resSizes = await fetch(
            `https://huunghi.id.vn/api/size/listSize`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
            }
          );
          if (resSizes.ok) {
            const result = await resSizes.json();
            const listSize = result.data;
            setListSize(listSize);
          } else {
            alert("Lấy sản phẩm không thành công");
            setListSize([]);
          }

          //fectchCategory
          const resCategory = await fetch(
            "https://huunghi.id.vn/api/categoryProduct/listCategoryProduct",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
            }
          );

          if (resCategory.ok) {
            const resultCategory = await resCategory.json();
            setListCategory(resultCategory.data);
          } else {
            alert("Lấy danh mục không thành công");
            setListCategory([]);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          setListSize([]);
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

  const addProduct = async () => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const user = JSON.parse(userLocal);
      if (user.id_vai_tro == 1) {
        setErrProduct({
          name: "",
          slug: "",
          description: "",
          price_old: "",
          percent: "",
          price_sale: "",
          images: "",
          idCate: "",
          nameColor: "",
          codeColor: "",
          idSize: "",
          quantity: "",
        });
        let newProduct = new FormData();
        newProduct.append("name", product.name);
        newProduct.append("slug", product.slug);
        newProduct.append("priceOld", product.price_old.toString());
        newProduct.append("sale", product.percent.toString());
        newProduct.append("priceNew", product.price_sale.toString());
        newProduct.append("description", product.description);
        newProduct.append("idCate", product.idCate.toString());

        // Gửi từng ảnh riêng lẻ
        product.images.forEach((file: File) => {
          newProduct.append("images[]", file); // Laravel sẽ hiểu là mảng ảnh
        });

        // Gửi từng thuộc tính của variant
        newProduct.append("variant[nameColor]", product.variant.nameColor);
        newProduct.append("variant[codeColor]", product.variant.codeColor);
        newProduct.append("variant[idSize]", product.variant.idSize.toString());
        newProduct.append(
          "variant[quantity]",
          product.variant.quantity.toString()
        );
        setIsLoading(true);
        try {
          // fetchAddProduct
          const resAddProduct = await fetch(
            `https://huunghi.id.vn/api/product/addProduct`,
            {
              method: "POST",
              headers: {
                // "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
              body: newProduct,
            }
          );

          const result = await resAddProduct.json();

          if (result.status == true) {
            onProductAdded();
            alert(result.message);
          } else {
            if (result.errors) {
              const err = result.errors;
              setErrProduct({
                name: err["name"] ? err["name"][0] : "",
                slug: err["slug"] ? err["slug"][0] : "",
                description: err["description"] ? err["description"][0] : "",
                price_old: err["priceOld"] ? err["priceOld"][0] : "",
                percent: err["sale"] ? err["sale"][0] : "",
                price_sale: err["priceNew"] ? err["priceNew"][0] : "",
                images: err["images"] ? err["images"][0] : "",
                idCate: err["idCate"] ? err["idCate"][0] : "",
                nameColor: err["variant.nameColor"]
                  ? err["variant.nameColor"][0]
                  : "",
                codeColor: err["variant.codeColor"]
                  ? err["variant.codeColor"][0]
                  : "",
                idSize: err["variant.idSize"] ? err["variant.idSize"][0] : "",
                quantity: err["variant.nameColor"]
                  ? err["variant.nameColor"][0]
                  : "",
              });
              return;
            }
            alert(result.message);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          setListSize([]);
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

  const handleChangeColorForm = (codeColor: string) => {
    const color = basicColors.find((color) => color.codeColor === codeColor);
    setProduct({
      ...product,
      variant: {
        ...product.variant,
        codeColor: color?.codeColor,
        nameColor: color?.nameColor,
      },
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

      setProduct({ ...product, images: [...product.images, ...newFiles] });
      setImages([...images, ...newFiles]);
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];

    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);

    setProduct({ ...product, images: newImages });
    setImages(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct();
  };
  if (isOpenForm) {
    return (
      <div className="card bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="card-header px-6 py-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Thông tin sản phẩm</h2>
        </div>
        <div className="card-body p-6">
          <form id="productForm" onSubmit={handleSubmit}>
            <div className="form-group mb-5">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Tên sản phẩm
              </label>
              <input
                value={product.name}
                onChange={(e: any) => {
                  setProduct({ ...product, name: e.target.value });
                }}
                type="text"
                className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm"
                placeholder="Ví dụ: Áo thun nam cổ tròn"
              />
              {errProduct.name && (
                <p className="text-red-500 text-sm mt-1">{errProduct.name}</p>
              )}
            </div>
            <div className="form-group mb-5">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Đường dẫn
              </label>
              <input
                value={product.slug}
                onChange={(e: any) => {
                  setProduct({ ...product, slug: e.target.value });
                }}
                type="text"
                className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm"
                placeholder="Ví dụ: duong-dan-san-pham"
              />
              {errProduct.slug && (
                <p className="text-red-500 text-sm mt-1">{errProduct.slug}</p>
              )}
            </div>
            <div className="form-group mb-5">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Mô tả sản phẩm
              </label>
              <textarea
                defaultValue={product.description}
                onChange={(e: any) => {
                  setProduct({ ...product, description: e.target.value });
                }}
                className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm min-h-[120px]"
                placeholder="Mô tả chi tiết sản phẩm..."
              ></textarea>
              {errProduct.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errProduct.description}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
              <div className="form-group">
                <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                  Giá cũ (VND)
                </label>
                <input
                  value={product.price_old}
                  onChange={(e: any) => {
                    setProduct({ ...product, price_old: e.target.value });
                  }}
                  type="number"
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm"
                  placeholder="0"
                  min="1"
                />
                {errProduct.price_old && (
                  <p className="text-red-500 text-sm mt-1">
                    {errProduct.price_old}
                  </p>
                )}
              </div>
              <div className="form-group">
                <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                  Giảm giá (%)
                </label>
                <input
                  value={product.percent}
                  onChange={(e: any) => {
                    setProduct({
                      ...product,
                      percent: e.target.value != 0 ? e.target.value : "",
                    });
                  }}
                  type="number"
                  className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm"
                  placeholder="0"
                  min="1"
                />
                {errProduct.percent && (
                  <p className="text-red-500 text-sm mt-1">
                    {errProduct.percent}
                  </p>
                )}
              </div>
            </div>

            <div className="form-group mb-5">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Giá khuyến mãi (VND)
              </label>
              <input
                value={product.price_sale}
                onChange={(e: any) => {
                  setProduct({ ...product, price_sale: e.target.value });
                }}
                type="number"
                className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm"
                placeholder="0"
                min="1"
              />
              {errProduct.price_sale && (
                <p className="text-red-500 text-sm mt-1">
                  {errProduct.price_sale}
                </p>
              )}
            </div>
            <div className="form-group mb-5">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Danh mục sản phẩm
              </label>
              <select className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm">
                {/* <option value="">Chọn danh mục</option> */}
                {listCategory.map((cate, index) => (
                  <option
                    key={index}
                    value={cate.id_loai_san_pham}
                    onChange={(e: any) => {
                      setProduct({ ...product, idCate: e.target.value });
                    }}
                  >
                    {cate.ten_loai}
                  </option>
                ))}
              </select>
              {errProduct.idCate && (
                <p className="text-red-500 text-sm mt-1">{errProduct.idCate}</p>
              )}
            </div>
            {/* Image Upload Section */}
            <div className="form-group mb-5">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
                multiple
              />

              <button
                type="button"
                onClick={triggerFileInput}
                className="flex items-center justify-center w-full py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="mt-1 text-sm text-gray-600">
                    <span className="font-medium text-primary">
                      Tải ảnh lên
                    </span>{" "}
                    hoặc kéo thả
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </button>
              {errProduct.images && (
                <p className="text-red-500 text-sm mt-1">{errProduct.images}</p>
              )}
              <label className="form-label block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh sản phẩm
              </label>

              <div className="flex flex-wrap gap-4 mb-3">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover rounded border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Inventory Section */}
            <div className="inventory-section mt-8">
              <div className="section-title flex items-center mb-4 text-sm font-medium text-gray-700">
                <FaBoxes className="mr-2 text-primary" />
                <span>Quản lý tồn kho theo màu/size</span>
              </div>

              <div id="inventoryContainer">
                <div className="inventory-item bg-gray-100 p-4 rounded border border-dashed border-gray-300 mb-4 relative">
                  <div className="inventory-grid grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-group">
                      <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                        Màu
                      </label>
                      <select
                        onChange={(e: any) =>
                          handleChangeColorForm(e.target.value)
                        }
                        className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm"
                      >
                        {/* <option value="">Chọn size</option> */}
                        {basicColors?.map((e, i) => (
                          <option key={i} value={e.codeColor}>
                            {e.nameColor}
                          </option>
                        ))}
                      </select>
                      {errProduct.idSize && (
                        <p className="text-red-500 text-sm mt-1">
                          {errProduct.idSize}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                        Kích thước
                      </label>
                      <select
                        onChange={(e: any) => {
                          setProduct({
                            ...product,
                            variant: {
                              ...product.variant,
                              idSize: e.target.value,
                            },
                          });
                          console.log(e.target.value);
                        }}
                        className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm"
                      >
                        {/* <option value="">Chọn size</option> */}
                        {listSize?.map((e, i) => (
                          <option key={i} value={e.id_kich_thuoc}>
                            {e.ten_kich_thuoc}
                          </option>
                        ))}
                      </select>
                      {errProduct.idSize && (
                        <p className="text-red-500 text-sm mt-1">
                          {errProduct.idSize}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                        Số lượng
                      </label>
                      <input
                        value={product.variant.quantity}
                        onChange={(e: any) => {
                          setProduct({
                            ...product,
                            variant: {
                              ...product.variant,
                              quantity: e.target.value,
                            },
                          });
                        }}
                        type="number"
                        className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm"
                        placeholder="0"
                        min="0"
                      />
                      {errProduct.quantity && (
                        <p className="text-red-500 text-sm mt-1">
                          {errProduct.quantity}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => onChangeStatusForm()}
                type="button"
                className="btn btn-outline px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium text-sm hover:bg-gray-100"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 bg-indigo-500 text-white rounded font-medium text-sm hover:bg-indigo-600 flex items-center"
              >
                <FaSave className="mr-2" />
                <span>Lưu sản phẩm</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default ProductForm;

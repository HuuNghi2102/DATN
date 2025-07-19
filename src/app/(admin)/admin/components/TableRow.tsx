import React from "react";
import { FaPencilAlt, FaTrash, FaCircle } from "react-icons/fa";
import Image from "./interface/imageInterface";
import Size from "./interface/sizeInterface";

interface Product {
  id_san_pham: string;
  images: Image[];
  ten_san_pham: string;
  duong_dan: string;
  gia_chua_giam: number;
  phan_tram_giam: number;
  gia_da_giam: number;
  mo_ta_san_pham: string;
  trang_thai: number;
  id_loai_san_pham: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  product_variants: ProductVariant[];
  product_variants_sum_so_luong: number;
  product_variants_count: number;
  variant_orders_count: number | "";
}

interface TableRowProps {
  product: Product;
}

interface ProductVariant {
  id_san_pham_bien_the: number;
  id_san_pham: number;
  id_kich_thuoc: number;
  so_luong: number;
  ma_mau: string;
  ten_mau: string;
  created_at: string;
  updated_at: string;
  size: Size;
}

const TableRow: React.FC<TableRowProps> = ({ product }) => {
  // Nhóm các biến thể theo màu sắc
  const groupVariantsByColor = () => {
    const colorMap = new Map<string, { name: string; sizes: string }>();

    product.product_variants.forEach((variant) => {
      if (!colorMap.has(variant.ma_mau)) {
        colorMap.set(variant.ma_mau, {
          name: variant.ten_mau,
          sizes: "",
        });
      }
      const current = colorMap.get(variant.ma_mau);
      if (current) {
        current.sizes += `${current.sizes ? ", " : ""}${
          variant.size.ten_kich_thuoc
        }:${variant.so_luong}`;
      }
    });

    return Array.from(colorMap.entries());
  };

  const colorGroups = groupVariantsByColor();

  const getStatusInfo = (quantity: number) => {
    if (quantity == 0) {
      return { text: "Hết hàng", style: "bg-red-100 text-red-800" };
    } else if (quantity <= 10) {
      return { text: "Sắp hết", style: "bg-yellow-100 text-yellow-800" };
    } else {
      return { text: "Còn hàng", style: "bg-green-100 text-green-800" };
    }
  };

  const StatusProduct = (status: number) => {
    if (status == 0) {
      return { text: "Ngưng bán", style: "bg-red-100 text-red-800" };
    } else {
      return { text: "Đang bán", style: "bg-green-100 text-green-800" };
    }
  };

  return (
    <tr className="hover:bg-gray-50 border-b border-gray-200">
      {/* ID */}
      <td className="px-4 py-4 text-sm text-gray-700 align-middle">
        #SP{product.id_san_pham}
      </td>

      {/* Product Info */}
      <td className="px-4 py-4 align-middle">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
            <img
              src={`https://huunghi.id.vn/storage/products/${product.images[0].link_anh}`}
              alt={product.ten_san_pham}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {product.ten_san_pham}
          </span>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-4 text-sm text-gray-700 align-middle">
        {product.gia_da_giam.toLocaleString("vi-VN")}đ
      </td>

      {/* Status - Đảm bảo không bị rớt dòng */}
      <td className="px-4 py-4 align-middle whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            StatusProduct(product.trang_thai).style
          }`}
        >
          {StatusProduct(product.trang_thai).text}
        </span>
      </td>

      <td className="px-4 py-4 align-middle whitespace-nowrap">
        <span>{product.variant_orders_count}</span>
      </td>

      {/* Inventory - Phiên bản tối ưu
      <td className="px-4 py-4 align-middle">
        <div className="flex flex-wrap gap-2">

          
          {colorGroups.map(([colorCode, colorData]) => (
            <div 
              key={colorCode} 
              className="flex items-start bg-gray-50 rounded-lg px-3 py-2 text-xs"
            >
              <FaCircle
                className="mt-0.5 mr-2 flex-shrink-0"
                style={{
                  color: colorCode,
                  ...(colorCode === 'white' && {
                    border: '1px solid #d1d5db',
                    boxSizing: 'border-box'
                  })
                }}
                size={12}
              />
              <div>
                <div className="font-medium">{colorData.name} - {colorCode} </div>
                <div className="text-gray-500">{colorData.sizes}</div>
              </div>
            </div>
          ))}
        </div>
      </td> */}

      {/* Status - Đảm bảo không bị rớt dòng */}
      <td className="px-4 py-4 align-middle whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            getStatusInfo(
              product.product_variants_sum_so_luong /
                product.product_variants_count
            ).style
          }`}
        >
          {
            getStatusInfo(
              product.product_variants_sum_so_luong /
                product.product_variants_count
            ).text
          }
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4 align-middle whitespace-nowrap">
        <div className="flex space-x-2">
          <a href={`/admin/products/edit-product/${product.duong_dan}`}>
            <button
              className="p-2 rounded-md text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Edit"
            >
              <FaPencilAlt size={14} />
            </button>
          </a>

          <button
            className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            aria-label="Delete"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;

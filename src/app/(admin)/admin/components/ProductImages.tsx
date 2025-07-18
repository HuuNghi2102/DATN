// File: ProductImages.tsx
import React, { useRef, useState } from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import Images from "./interface/imageInterface";
import productInterface from "./interface/productInterface";
import imageInterface from "./interface/imageInterface";

interface Props {
  images: Images[];
  product: productInterface;
  typeToken: string;
  accessToken: string;
}

export default function ProductImages({
  images,
  product,
  typeToken,
  accessToken,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagess, setImages] = useState<imageInterface[]>(images);

  const openFolder = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = async (idImage: number) => {
    const confirmed = confirm("Bạn có chắc muốn xóa ảnh này?");
    if (!confirmed) return;

    if (imagess.length == 1) {
      alert("Sản phẩm phải có ít nhất 1 ảnh");
      return;
    }

    const resDeleteImage = await fetch(
      `https://huunghi.id.vn/api/image/deleteImage/${idImage}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${typeToken} ${accessToken}`,
        },
      }
    );

    const resultDeleteImages = await resDeleteImage.json();

    if (resultDeleteImages.status == true) {
      setImages(imagess.filter((image, i) => image.id_anh_san_pham != idImage));
    } else {
      alert("Xóa sản phẩm không thành công");
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const arrayImages = Array.from(e.target.files);

    console.log(arrayImages);

    const formData = new FormData();

    arrayImages.forEach((file: any) => {
      formData.append("images[]", file);
    });

    const resAddImages = await fetch(
      `https://huunghi.id.vn/api/image/addImage/${product.id_san_pham}`,
      {
        method: "POST",
        headers: {
          Authorization: `${typeToken} ${accessToken}`,
        },
        body: formData,
      }
    );

    const resultAddImages = await resAddImages.json();

    if (resultAddImages.status == true) {
      const arrayNewImage = resultAddImages.data.images;
      setImages([...imagess, ...arrayNewImage]);
    } else {
      alert("Thêm ảnh sản phẩm không thành công");
    }

    // Thực tế bạn sẽ upload ảnh và cập nhật `setImages`
  };

  return (
    <section className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Hình ảnh sản phẩm</h2>
      </div>
      <div className="p-6">
        <div
          className="border-2 border-dashed border-gray-300 rounded p-8 flex flex-col items-center bg-gray-100 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50"
          onClick={openFolder}
        >
          <FaCloudUploadAlt className="text-3xl text-gray-500 mb-3" />
          <p className="font-medium text-gray-700 mb-1">
            Kéo thả hình ảnh vào đây hoặc click để chọn
          </p>
          <span className="text-sm text-gray-500">
            Hỗ trợ JPG, PNG tối đa 5MB
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleUpload}
          />
        </div>

        {imagess.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-6">
            {imagess.map((img, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border border-gray-200 rounded overflow-hidden"
              >
                <img
                  src={`https://huunghi.id.vn/storage/products/${img.link_anh}`}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs"
                  onClick={() => handleRemove(img.id_anh_san_pham)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

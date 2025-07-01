// File: ProductImages.tsx
import React, { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

export default function ProductImages() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<string[]>([
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300',
        'https://via.placeholder.com/300'
    ]);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = (index: number) => {
        const confirmed = confirm('Bạn có chắc muốn xóa ảnh này?');
        if (!confirmed) return;
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        alert(`Đã chọn ${e.target.files.length} ảnh`);
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
                    onClick={handleImageClick}
                >
                    <FaCloudUploadAlt className="text-3xl text-gray-500 mb-3" />
                    <p className="font-medium text-gray-700 mb-1">Kéo thả hình ảnh vào đây hoặc click để chọn</p>
                    <span className="text-sm text-gray-500">Hỗ trợ JPG, PNG tối đa 5MB</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleUpload}
                    />
                </div>

                {images.length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-6">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className="relative w-24 h-24 border border-gray-200 rounded overflow-hidden"
                            >
                                <img
                                    src={img}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs"
                                    onClick={() => handleRemove(index)}
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

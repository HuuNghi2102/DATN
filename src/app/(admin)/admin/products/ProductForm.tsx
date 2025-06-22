'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { FaBoxes, FaPlusCircle, FaSave, FaTimes } from 'react-icons/fa';
import InventoryItem from '../components/InventoryItem';

const ProductForm = () => {
  const [inventoryItems, setInventoryItems] = useState([{ id: 1 }]);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  const removeInventoryItem = (id: number) => {
    setInventoryItems(inventoryItems.filter(item => item.id !== id));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      
      setImages([...images, ...newFiles]);
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...previewUrls];
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
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
    alert('Sản phẩm đã được lưu thành công!');
  };
  
  return (
    <div className="card bg-white rounded-lg shadow mb-6 overflow-hidden">
      <div className="card-header px-6 py-5 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Thông tin sản phẩm</h2>
      </div>
      <div className="card-body p-6">
        <form id="productForm" onSubmit={handleSubmit}>


          <div className="form-group mb-5">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
            <input 
              type="text" 
              className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm" 
              placeholder="Ví dụ: Áo thun nam cổ tròn" 
            />
          </div>

          <div className="form-group mb-5">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">Đường dẫn</label>
            <input 
              type="text" 
              className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm" 
              placeholder="Ví dụ: duong-dan-san-pham" 
            />
          </div>
          
          <div className="form-group mb-5">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">Mô tả sản phẩm</label>
            <textarea 
              className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm min-h-[120px]" 
              placeholder="Mô tả chi tiết sản phẩm..."
            ></textarea>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div className="form-group">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">Giá cũ (VND)</label>
              <input 
                type="number" 
                className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm" 
                placeholder="0" 
              />
            </div>

            <div className="form-group">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">Giảm giá (%)</label>
              <input 
                type="number" 
                className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm" 
                placeholder="0" 
              />
            </div>
          </div>

          <div className="form-group mb-5">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">Giá khuyến mãi (VND)</label>
            <input 
              type="number" 
              className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm" 
              placeholder="0" 
            />
          </div>

          <div className="form-group mb-5">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">Danh mục sản phẩm</label>
            <select className="form-control w-full px-3 py-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary-light outline-none text-sm">
              <option value="">Chọn danh mục</option>
              <option value="red">Sản Phẩm Mới</option>
              <option value="blue">Sản phẩm giảm giá</option>
              <option value="green">Sản phẩm đặc biệt</option>
              <option value="black">Jean</option>
              <option value="white">Áo thun</option>                 
            </select>               
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
                  <span className="font-medium text-primary">Tải ảnh lên</span> hoặc kéo thả
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </button>
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
              {inventoryItems.map((item, index) => (
                <InventoryItem 
                  key={item.id}
                  onRemove={() => removeInventoryItem(item.id)}
                  isLast={inventoryItems.length === 1}
                />
              ))}
            </div>
            
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" className="btn btn-outline px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium text-sm hover:bg-gray-100">
              Hủy bỏ
            </button>
            <button type="submit" className="btn btn-primary px-4 py-2 bg-indigo-500 text-white rounded font-medium text-sm hover:bg-indigo-600 flex items-center">
              <FaSave className="mr-2" />
              <span>Lưu sản phẩm</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
// File: ProductForm.tsx
import React from 'react';

export default function ProductForm() {
    return (
        <section className="bg-white shadow rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
                <div className="inline-flex items-center px-3 py-1 text-sm font-medium bg-emerald-100 text-emerald-800 rounded">
                    <i className="fas fa-circle text-[0.5rem] mr-1"></i>
                    Đang bán
                </div>
            </div>
            <div className="p-6">
                <form id="productForm" className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                        <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" defaultValue="Áo thun nam cổ tròn" required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn SEO</label>
                        <input type="text" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" defaultValue="ao-thun-nam-co-tron" />
                        <small className="text-gray-500 text-sm mt-1 block">
                            Đường dẫn sẽ hiển thị: example.com/san-pham/ao-thun-nam-co-tron
                        </small>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả sản phẩm *</label>
                        <textarea
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                            defaultValue="Áo thun nam cổ tròn chất liệu cotton 100% thoáng mát, thấm hút mồ hôi tốt. Thiết kế đơn giản, dễ phối đồ, phù hợp nhiều dịp."
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc (VND) *</label>
                            <input type="number" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" defaultValue={250000} required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Giảm giá (%)</label>
                            <input type="number" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" defaultValue={10} min={0} max={100} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (VND) *</label>
                        <input type="number" className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" defaultValue={225000} required />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục sản phẩm *</label>
                        <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" defaultValue={"1"} required>
                            <option value="">Chọn danh mục</option>
                            <option value="1">Sản Phẩm Mới</option>
                            <option value="2">Sản phẩm giảm giá</option>
                            <option value="3">Sản phẩm đặc biệt</option>
                            <option value="4">Jean</option>
                            <option value="5">Áo thun</option>
                        </select>
                    </div>
                </form>
            </div>
        </section>
    );
}

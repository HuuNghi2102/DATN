// File: AdvancedSettings.tsx
import React from 'react';

export default function AdvancedSettings() {
    return (
        <section className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Cài đặt nâng cao</h2>
            </div>
            <div className="p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái sản phẩm</label>
                    <div className="flex gap-6">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                value="active"
                                defaultChecked
                                className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Đang bán</span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="status"
                                value="inactive"
                                className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Ngừng bán</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SKU (Mã sản phẩm)</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500" defaultValue="SP001-ATNCT" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Barcode (ISBN, UPC, GTIN, etc.)</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500" defaultValue="123456789012" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trọng lượng (gram)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500" defaultValue={200} />
                </div>
            </div>
        </section>
    );
}

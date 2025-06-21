// File: ProductEditPage.tsx
'use client'
import React from 'react';

import HearderEdit from '../components/HearderEdit';
import ProductForm from '../components/ProductForm';
import ProductImages from '../components/ProductImages';
import InventoryManager from '../components/InventoryManager';
import AdvancedSettings from '../components/AdvancedSettings';

export default function ProductEditPage() {
    return (
        <div className="">
            <main className="p-8">
                <HearderEdit />
                <div className="space-y-6">
                    <ProductForm />
                    <ProductImages />
                    <InventoryManager />
                    <AdvancedSettings />
                    <div className="flex justify-between mt-8">
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
                        >
                            <i className="fas fa-times mr-2"></i> Hủy bỏ
                        </button>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100"
                            >
                                <i className="fas fa-eye mr-2"></i> Xem trước
                            </button>
                            <button
                                type="submit"
                                form="productForm"
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
                            >
                                <i className="fas fa-save mr-2"></i> Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

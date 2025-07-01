// File: InventoryManager.tsx
import React, { useState } from 'react';
import { FaBoxes, FaPlusCircle, FaTimes } from 'react-icons/fa';

type Variant = {
    color: string;
    size: string;
    quantity: number;
};

const colors = ['Đỏ', 'Xanh dương', 'Xanh lá', 'Đen', 'Trắng'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

export default function InventoryManager() {
    const [variants, setVariants] = useState<Variant[]>([
        { color: 'Đỏ', size: 'S', quantity: 12 },
        { color: 'Đỏ', size: 'M', quantity: 8 },
        { color: 'Xanh dương', size: 'S', quantity: 5 }
    ]);

    const handleAdd = () => {
        setVariants([...variants, { color: '', size: '', quantity: 0 }]);
    };

    const handleRemove = (index: number) => {
        if (variants.length <= 1) {
            alert('Sản phẩm phải có ít nhất 1 biến thể');
            return;
        }
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleChange = (index: number, field: keyof Variant, value: string | number) => {
        const updated = [...variants];
        (updated[index] as any)[field] = value;
        setVariants(updated);
    };

    return (
        <section className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold">Quản lý tồn kho</h2>
            </div>
            <div className="p-6">
                <div className="flex items-center text-sm text-gray-700 font-medium mb-4">
                    <FaBoxes className="text-indigo-500 mr-2" /> Quản lý tồn kho theo màu/size
                </div>

                <div className="space-y-4">
                    {variants.map((variant, index) => (
                        <div
                            key={index}
                            className="relative border border-dashed border-gray-300 bg-gray-100 p-4 rounded grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Màu sắc *</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={variant.color}
                                    onChange={(e) => handleChange(index, 'color', e.target.value)}
                                >
                                    <option value="">Chọn màu</option>
                                    {colors.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kích thước *</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={variant.size}
                                    onChange={(e) => handleChange(index, 'size', e.target.value)}
                                >
                                    <option value="">Chọn size</option>
                                    {sizes.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng *</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    min={0}
                                    value={variant.quantity}
                                    onChange={(e) => handleChange(index, 'quantity', Number(e.target.value))}
                                />
                            </div>
                            <button
                                type="button"
                                className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-full"
                                onClick={() => handleRemove(index)}
                            >
                                <FaTimes size={12} />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-dashed border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleAdd}
                >
                    <FaPlusCircle className="text-indigo-500 mr-2" /> Thêm biến thể
                </button>
            </div>
        </section>
    );
}

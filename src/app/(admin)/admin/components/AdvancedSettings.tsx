// File: AdvancedSettings.tsx
import React, { useState } from 'react';
import productsNewInterface from '../components/interface/productInterface';

interface Props {
    product: productsNewInterface;
    accessToken: string;
    typeToken: string;
    onChangeProduct: (product: productsNewInterface) => void;
}

export default function AdvancedSettings({ product, accessToken, typeToken , onChangeProduct}: Props) {

    const [status, setStatus] = useState<number>(product.trang_thai);
    const [pro , setPro] = useState<productsNewInterface>(product);
    const handleStatusChange = async () => {
        if (pro.trang_thai == status) {
            return;
        } else {
            const resChangeStatus = await fetch(`https://huunghi.id.vn/api/product/changeStatusProduct/${product.duong_dan}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${typeToken} ${accessToken}`
                }
            });
            if (resChangeStatus.ok) {
                alert('Thay đổi trạng thái thành công');
                setPro({
                    ...pro,
                    trang_thai: status
                });
                onChangeProduct({
                    ...pro,
                    trang_thai: status
                });
                // console.log({
                //     ...pro,
                //     trang_thai: status
                // })
                // return;
            } else {
                alert('Thay đổi trạng thái không thành công');
            }
        }

    };

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
                                onChange={() => setStatus(1)}
                                type="radio"
                                name="status"
                                value="1"
                                checked={status === 1 ? true : false}
                                className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Đang bán</span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                onChange={() => {setStatus(0)}}
                                type="radio"
                                name="status"
                                value="0"
                                checked={status === 0 ? true : false}
                                className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Ngừng bán</span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleStatusChange}
                        type="submit"
                        // form="productForm"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700"
                    >
                        <i className="fas fa-save mr-2"></i> Lưu thay đổi
                    </button>
                </div>
            </div>
        </section>
    );
}

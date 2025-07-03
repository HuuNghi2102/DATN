// File: InventoryManager.tsx
import React, { useState } from 'react';
import { FaBoxes, FaPlusCircle, FaTimes, FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import productVariant from './interface/variantInterface';
import sizeInterface from './interface/sizeInterface';
import productInterface from './interface/productInterface';

interface Props {
    variants: productVariant[],
    sizes : sizeInterface[]
    product : productInterface,
    typeToken : string,
    accessToken: string,
}

export default function InventoryManager({ variants: initialVariants,sizes,product,typeToken, accessToken}: Props) {
    const [variants, setVariants] = useState<productVariant[]>(initialVariants);
    const [showForm, setShowForm] = useState(false);
    const [currentVariant, setCurrentVariant] = useState<productVariant | null>( null);
    const [listSize , setListSize] = useState<sizeInterface[]>(sizes);
    const [isEditing, setIsEditing] = useState(false);

    const handleAddNew = () => {
        setCurrentVariant({
            id_san_pham_bien_the : 0,
            id_san_pham : 0,
            id_kich_thuoc :  1,
            so_luong : 0,
            ma_mau : '',
            ten_mau : '',
            created_at : '',
            updated_at : '',
        });
        setIsEditing(false);
        setShowForm(true);
    };

    const handleEdit = (variant: productVariant) => {
        setCurrentVariant(variant);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (idVariant: number) => {
        if (variants.length <= 1) {
            alert('Sản phẩm phải có ít nhất 1 biến thể');
            return;
        }

        const resDeleteVariant = await fetch(`https://huunghi.id.vn/api/productVariant/deleteProductVariant/${idVariant}`,{
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `${typeToken} ${accessToken}`
                }
            })

            const resultDeleteVariant = await  resDeleteVariant.json();

            if(resultDeleteVariant.status == true){
                alert('Xóa biển thể thành công');
                setVariants(variants.filter((v,i) => v.id_san_pham_bien_the != idVariant));
            }else{
                alert('Xóa biến thể không thành công');
                console.log(resultDeleteVariant);
            }
    };

    const handleSave = async () => {
        console.log(currentVariant);
        if (!currentVariant?.ten_mau || !currentVariant?.ma_mau || !currentVariant?.id_kich_thuoc) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        

        let flag = true;

        variants.forEach((v) => v.ma_mau == currentVariant.ma_mau && v.id_kich_thuoc == currentVariant.id_kich_thuoc ? flag = false : "");

        if(flag != true){
            alert('Biến thể đã tồn tại');
            return;
        }

        if (isEditing) {

            // Update existing variant
            const resUpdateVariant = await fetch(`https://huunghi.id.vn/api/productVariant/updateProductVariant/${currentVariant.id_san_pham_bien_the}`,{
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `${typeToken} ${accessToken}`
                },
                body : JSON.stringify({
                    nameColor : currentVariant.ten_mau,
                    color : currentVariant.ma_mau,
                    idSize: currentVariant.id_kich_thuoc,
                    quantity : currentVariant.so_luong
                })
            })

            const resultUpdateVariant = await  resUpdateVariant.json();

            if(resultUpdateVariant.status == true){
                setVariants(variants.map(v => 
                    currentVariant.id_san_pham_bien_the === v.id_san_pham_bien_the
                        ? currentVariant 
                        : v
                ));
                alert('Cập nhật biển thể thành công');
            }else{
                alert('Cập nhật biển thể thành công');
                console.log(resultUpdateVariant);
            }
            
            
            
        } else {
            // Add new variant
            const resAddVariant = await fetch(`https://huunghi.id.vn/api/productVariant/addProductVariant/${product.id_san_pham}`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : `${typeToken} ${accessToken}`
                },
                body : JSON.stringify({
                    nameColor : currentVariant.ten_mau,
                    color : currentVariant.ma_mau,
                    idSize: currentVariant.id_kich_thuoc,
                    quantity : currentVariant.so_luong
                })
            })

            const resultAddVariant = await  resAddVariant.json();

            if(resultAddVariant.status == true){
                const newVariant = resultAddVariant.data;
                setVariants([...variants, newVariant]);
                alert('Thêm biển thể thành công');
            }else{
                alert('Cập nhật biển thể thành công');
                console.log( resultAddVariant);
            }
            
        }

        setShowForm(false);
        setCurrentVariant(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setCurrentVariant(null);
    };

    const handleChange = (field: keyof productVariant, value: string | number) => {
        setCurrentVariant({
            ...currentVariant!,
            [field]: value
        });
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

                
                {/* Danh sách biến thể */}
                <div className="space-y-4">
                    {variants.map((variant, index) => (
                        <div
                            key={index} 
                            className="relative border border-dashed border-gray-300 bg-gray-100 p-4 rounded grid grid-cols-1 md:grid-cols-4 gap-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên màu *</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={variant.ten_mau}
                                    readOnly
                                    placeholder='vd: Đen'
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mã màu *</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={variant.ma_mau}
                                    readOnly
                                    placeholder='vd: Đen'
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kích thước *</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={variant.id_kich_thuoc}
                                    disabled
                                >
                                    {sizes.map((s,i) => (
                                        <option
                                            // {s.id_kich_thuoc === variant.id_kich_thuoc ? 'selected' : ''}  
                                            key={i} 
                                            value={s.id_kich_thuoc}
                                            >
                                            {s.ten_kich_thuoc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng *</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    min={0}
                                    value={variant.so_luong}
                                    readOnly
                                />
                            </div>
                            <div className="absolute top-2 right-2 flex space-x-1">
                                <button
                                    type="button"
                                    className="w-6 h-6 flex items-center justify-center text-blue-500 hover:bg-blue-100 rounded-full"
                                    onClick={() => handleEdit(variant)}
                                >
                                    <FaEdit size={12} />
                                </button>
                                <button
                                    type="button"
                                    className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-full"
                                    onClick={() => handleDelete(variant.id_san_pham_bien_the)}
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Form thêm/sửa biến thể */}
                {showForm && currentVariant && (
                    <div className="relative border border-gray-300 bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="text-md font-medium mb-4 ">
                            <strong>{isEditing ? 'Sửa biến thể' : 'Thêm biến thể mới'}</strong>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên màu *</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={currentVariant.ten_mau}
                                    onChange={(e) => handleChange('ten_mau', e.target.value)}
                                    placeholder='vd: Đen'
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mã màu *</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={currentVariant.ma_mau}
                                    onChange={(e) => handleChange('ma_mau', e.target.value)}
                                    placeholder='vd: #000000'
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kích thước *</label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={currentVariant.id_kich_thuoc}
                                    required
                                    onChange={(e) => handleChange('id_kich_thuoc', e.target.value)}
                                >
                                    {sizes.map((s,i) => (
                                        <option key={i} value={s.id_kich_thuoc}>{s.ten_kich_thuoc}</option>
                                    ))}
                                    
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng *</label>
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    min={0}
                                    required
                                    value={currentVariant.so_luong}
                                    onChange={(e) => handleChange('so_luong', Number(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-4">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={handleCancel}
                            >
                                Đóng
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                onClick={handleSave}
                            >
                                <FaSave className="inline mr-2" />
                                Lưu
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-dashed border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleAddNew}
                >
                    <FaPlusCircle className="text-indigo-500 mr-2" /> Thêm biến thể
                </button>
            </div>
        </section>
    );
}
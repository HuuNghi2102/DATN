// File: ProductEditPage.tsx
'use client'
import React, { useEffect, useState } from 'react';

import HearderEdit from '../../../components/HearderEdit';
import ProductForm from '../../../components/ProductForm';
import ProductImages from '../../../components/ProductImages';
import InventoryManager from '../../../components/InventoryManager';
import AdvancedSettings from '../../../components/AdvancedSettings';
import { useParams, useRouter } from 'next/navigation';
import ProductInterFace from '../../../components/interface/productInterface';
import ImagetInterFace from '../../../components/interface/imageInterface';
import VariantInterFace from '../../../components/interface/variantInterface';
import CategoryInterface from '../../../components/interface/categoryProInterface';
import SizeInterface from '../../../components/interface/sizeInterface';


export default function ProductEditPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [product,setProduct] = useState<ProductInterFace | undefined>();
    const [images,setImages] = useState<ImagetInterFace[]>([]);
    const [variants,setVariants] = useState<VariantInterFace[]>([]);
    const [categories ,setCategories] = useState<CategoryInterface[]>([]);
    const [sizes, setSizes] = useState<SizeInterface[]>([]);
    const [typeToken,setTypeToken] = useState<string>('');
    const [accessToken,setAccessToken] = useState<string>('');
    const { slug } = params;
    if (!slug) {
        router.push('/admin/products');
        return;
    }

    const fetchDefaultData = async () => {

        const accessTokenLocal = localStorage.getItem('accessToken');
        const typeTokenLocal = localStorage.getItem('typeToken');
        const userLocal = localStorage.getItem('user');

        if (accessTokenLocal && typeTokenLocal && userLocal) {
            const user = JSON.parse(userLocal);
            if (user.id_vai_tro == 1) {
                
                //setToken
                setTypeToken(JSON.parse(typeTokenLocal));
                setAccessToken(JSON.parse(accessTokenLocal));

                try {
                    const resProduct = await fetch(`https://huunghi.id.vn/api/product/getProduct/${slug}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
                        }
                    });
                    const resultProduct = await resProduct.json();

                    if (resultProduct.status == true) {
                        // nếu lấy thành công
                        
                        console.log(resProduct);
                        const pro = resultProduct.data.san_pham;
                        setProduct(pro ? pro : []);

                        // fetchImage
                        const resImages = await fetch(`https://huunghi.id.vn/api/image/listImage/${pro.id_san_pham}`, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
                            }
                        });
                        if (resImages.ok) {
                            const resultImages = await resImages.json();
                            const imagesList = resultImages.data.images;
                            setImages(imagesList ? imagesList : []);
                        } else {
                            const resultImages = await resImages.json();
                            console.log(resultImages);
                            alert('Lấy ảnh không thể không thành công');
                            setImages([]);
                        }

                        // fetchVariant
                        const resVariants = await fetch(`https://huunghi.id.vn/api/productVariant/getListProductVariant/${pro.id_san_pham}`, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
                            }
                        });
                        if (resVariants.ok) {
                            const resultVariants = await resVariants.json();
                            const variantsList = resultVariants.data;
                            setVariants(variantsList ? variantsList : []);
                        } else {
                            alert('Lấy biến thể không thành công');
                            setVariants([]);
                        }

                        //fetchCategories
                        const resCategories = await fetch(`https://huunghi.id.vn/api/categoryProduct/listCategoryProduct`, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
                            }
                        });
                        if (resCategories.ok) {
                            const resultCategories = await resCategories.json();
                            const cateList = resultCategories.data;
                            console.log(cateList);               
                            setCategories(cateList ? cateList : []);
                        } else {
                            alert('Lấy danh mục không thành công');
                            setCategories([]);
                        }

                        //fetchSize
                        const resSizes = await fetch(`https://huunghi.id.vn/api/size/listSize`, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `${JSON.parse(typeTokenLocal)} ${JSON.parse(accessTokenLocal)}`
                            }
                        });
                        if (resSizes.ok) {
                            const resultSizes = await resSizes.json();
                            const sizesList = resultSizes.data;
                            setSizes(sizesList ? sizesList : []);           
                        } else {
                            alert('Lấy kích thước không thành công');
                            setSizes([]);
                        }

                    } else {
                        alert('Lấy sản phẩm không thành công');
                        setProduct(product);
                    }

                } catch (error) {
                    console.error('Error fetching products:', error);
                    // setListProduct([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                router.push('/user/userprofile');
            }
        } else {
            router.push('/login');
        }
    }

    useEffect(()=>{
        fetchDefaultData();
    },[]);

    console.log(categories);

    if (isLoading) {
        return (
        <div
            id="loading-screen"
            className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
        >
            <div className="flex flex-col items-center space-y-6">
            <div className="text-3xl font-semibold tracking-widest text-black uppercase">VERVESTYLE</div>
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-700 tracking-wide">Đang khởi động trải nghiệm của bạn...</p>
            </div>
        </div>
        )
    }
    return (
        <div className="">
            <main className="p-8">
                <HearderEdit />
                <div className="space-y-6">
                    {product && categories &&  <ProductForm  product={product} categories={categories} typeToken={typeToken} accessToken={accessToken} />}
                    {images && product && <ProductImages typeToken={typeToken} accessToken={accessToken} product={product} images={images}/> }
                    {variants && product && <InventoryManager variants={variants} sizes={sizes} product={product} typeToken={typeToken} accessToken={accessToken}/> }
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

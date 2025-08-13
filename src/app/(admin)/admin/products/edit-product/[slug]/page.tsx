// File: ProductEditPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import HearderEdit from "../../../components/HearderEdit";
import ProductForm from "../../../components/ProductForm";
import ProductImages from "../../../components/ProductImages";
import InventoryManager from "../../../components/InventoryManager";
import AdvancedSettings from "../../../components/AdvancedSettings";
import { useParams, useRouter } from "next/navigation";
import ProductInterFace from "../../../components/interface/productInterface";
import ImagetInterFace from "../../../components/interface/imageInterface";
import VariantInterFace from "../../../components/interface/variantInterface";
import CategoryInterface from "../../../components/interface/categoryProInterface";
import SizeInterface from "../../../components/interface/sizeInterface";

export default function ProductEditPage() {
  const basicColors = [
    { nameColor: "Đỏ", codeColor: "#FF0000" },
    { nameColor: "Xanh lá cây", codeColor: "#00FF00" },
    { nameColor: "Xanh dương", codeColor: "#0000FF" },
    { nameColor: "Vàng", codeColor: "#FFFF00" },
    { nameColor: "Lục lam (Cyan)", codeColor: "#00FFFF" },
    { nameColor: "Tím đỏ (Magenta)", codeColor: "#FF00FF" },
    { nameColor: "Đen", codeColor: "#000000" },
    { nameColor: "Trắng", codeColor: "#FFFFFF" },
    { nameColor: "Xám", codeColor: "#808080" },
    { nameColor: "Cam", codeColor: "#FFA500" },
    { nameColor: "Hồng", codeColor: "#FFC0CB" },
    { nameColor: "Nâu", codeColor: "#A52A2A" },
    { nameColor: "Tím", codeColor: "#800080" },
    { nameColor: "Xanh lục nhạt (Lime)", codeColor: "#00FF00" },
    { nameColor: "Xanh biển đậm (Navy)", codeColor: "#000080" },
    { nameColor: "Xanh da trời", codeColor: "#87CEEB" },
    { nameColor: "Xanh ngọc", codeColor: "#40E0D0" },
    { nameColor: "Vàng kem (Beige)", codeColor: "#F5F5DC" },
    { nameColor: "Vàng nghệ (Gold)", codeColor: "#FFD700" },
    { nameColor: "Xanh rêu", codeColor: "#556B2F" },
    { nameColor: "Xanh lá mạ", codeColor: "#7CFC00" },
    { nameColor: "Xanh cổ vịt", codeColor: "#008080" },
    { nameColor: "Xanh pastel", codeColor: "#B0E0E6" },
    { nameColor: "Hồng pastel", codeColor: "#FFD1DC" },
    { nameColor: "Nâu đất", codeColor: "#8B4513" },
    { nameColor: "Đỏ đô", codeColor: "#800000" },
    { nameColor: "Xám bạc", codeColor: "#C0C0C0" },
    { nameColor: "Xám đậm", codeColor: "#505050" },
    { nameColor: "Hồng cánh sen", codeColor: "#FF69B4" },
    { nameColor: "Cam cháy", codeColor: "#FF4500" },
  ];
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductInterFace | undefined>();
  const [images, setImages] = useState<ImagetInterFace[]>([]);
  const [variants, setVariants] = useState<VariantInterFace[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [sizes, setSizes] = useState<SizeInterface[]>([]);
  const [typeToken, setTypeToken] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  const { slug } = params;
  if (!slug) {
    router.push("/admin/products");
    return;
  }

  const fetchDefaultData = async () => {
    const accessTokenLocal = localStorage.getItem("accessToken");
    const typeTokenLocal = localStorage.getItem("typeToken");
    const userLocal = localStorage.getItem("user");

    if (accessTokenLocal && typeTokenLocal && userLocal) {
      const user = JSON.parse(userLocal);
      if (user.id_vai_tro == 1) {
        //setToken
        setTypeToken(JSON.parse(typeTokenLocal));
        setAccessToken(JSON.parse(accessTokenLocal));

        try {
          const resProduct = await fetch(
            `https://huunghi.id.vn/api/product/getProduct/${slug}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                  accessTokenLocal
                )}`,
              },
            }
          );
          const resultProduct = await resProduct.json();

          if (resultProduct.status == true) {
            // nếu lấy thành công
            const pro = resultProduct.data.san_pham;
            setProduct(pro ? pro : []);

            // fetchImage
            const resImages = await fetch(
              `https://huunghi.id.vn/api/image/listImage/${pro.id_san_pham}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                    accessTokenLocal
                  )}`,
                },
              }
            );
            if (resImages.ok) {
              const resultImages = await resImages.json();
              const imagesList = resultImages.data.images;
              setImages(imagesList ? imagesList : []);
            } else {
              const resultImages = await resImages.json();
              console.log(resultImages);
              toast.error("Lấy ảnh không thể không thành công");
              setImages([]);
            }

            // fetchVariant
            const resVariants = await fetch(
              `https://huunghi.id.vn/api/productVariant/getListProductVariant/${pro.id_san_pham}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                    accessTokenLocal
                  )}`,
                },
              }
            );
            if (resVariants.ok) {
              const resultVariants = await resVariants.json();
              const variantsList = resultVariants.data;
              setVariants(variantsList ? variantsList : []);
            } else {
              toast.error("Lấy biến thể không thành công");
              setVariants([]);
            }

            //fetchCategories
            const resCategories = await fetch(
              `https://huunghi.id.vn/api/categoryProduct/listCategoryProduct`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                    accessTokenLocal
                  )}`,
                },
              }
            );
            if (resCategories.ok) {
              const resultCategories = await resCategories.json();
              const cateList = resultCategories.data;
              console.log(cateList);
              setCategories(cateList ? cateList : []);
            } else {
              toast.error("Lấy danh mục không thành công");
              setCategories([]);
            }

            //fetchSize
            const resSizes = await fetch(
              `https://huunghi.id.vn/api/size/listSize`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${JSON.parse(typeTokenLocal)} ${JSON.parse(
                    accessTokenLocal
                  )}`,
                },
              }
            );
            if (resSizes.ok) {
              const resultSizes = await resSizes.json();
              const sizesList = resultSizes.data;
              setSizes(sizesList ? sizesList : []);
            } else {
              toast.error("Lấy kích thước không thành công");
              setSizes([]);
            }
          } else {
            toast.error("Lấy sản phẩm không thành công");
            return router.push("/admin/products");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          // setListProduct([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push("/user/userprofile");
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    fetchDefaultData();
  }, []);

  const changeProduct = (newProduct: ProductInterFace) => {
    setProduct(newProduct);
  };

  console.log(categories);

  if (isLoading) {
    return (
      <div
        id="loading-screen"
        className="fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500"
      >
        <div className="flex flex-col items-center space-y-6">
          <div className="text-3xl font-semibold tracking-widest text-black uppercase">
            VERVESTYLE
          </div>
          <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-700 tracking-wide">
            Đang khởi động trải nghiệm của bạn...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <main className="p-8">
        <HearderEdit />
        <div className="space-y-6">
          {product && categories && (
            <ProductForm
              product={product}
              categories={categories}
              typeToken={typeToken}
              accessToken={accessToken}
            />
          )}
          {images && product && (
            <ProductImages
              typeToken={typeToken}
              accessToken={accessToken}
              product={product}
              images={images}
            />
          )}
          {variants && product && (
            <InventoryManager
              variants={variants}
              sizes={sizes}
              product={product}
              typeToken={typeToken}
              accessToken={accessToken}
            />
          )}
          {product && (
            <AdvancedSettings
              product={product}
              typeToken={typeToken}
              accessToken={accessToken}
              onChangeProduct={changeProduct}
            />
          )}
        </div>
      </main>
    </div>
  );
}

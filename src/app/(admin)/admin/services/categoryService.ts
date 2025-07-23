import { log } from "console";
import categoryInterface from "../types/category";
import { CreatedCategory } from "../types/category";
export const getAPICategories = async():Promise<categoryInterface[]> =>{
    try {
        const accessToken = localStorage.getItem("accessToken");
        const typeToken = localStorage.getItem("typeToken");
        if(accessToken && typeToken) {
            const parseaccessToken = JSON.parse(accessToken);
            const parsetypeToken = JSON.parse(typeToken);

            const res = await fetch("https://huunghi.id.vn/api/categoryProduct/listCategoryProduct", {
                method: "GET",
                headers: {
                    "Authorization": `${parsetypeToken} ${parseaccessToken}`,
                    "Content-Type": "application/json",
                }
            })
            if(!res.ok){
                console.log("Fetch lỗi", res.status);
                return [];
            }
            const data = await res.json();
            const category = data.data;
                    if (!Array.isArray(category)) {
            console.warn("❗ API không trả về mảng:", category);
            return [];
        }
            return category;
        }
        return[];
    } catch (error) {
        console.log(error);
        return[];
    }
}

export const addCategories = async(NewCate: CreatedCategory) =>{
    try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");   
    if(accessToken && typeToken ){
        const parseaccessToken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);

        const category = {
            nameCate: NewCate.ten_loai,
            slug: NewCate.duong_dan,
            descriptionCate: NewCate.mota_loai,
            idParent : NewCate.id_danh_muc_cha || null,
        }
        const res = await fetch('https://huunghi.id.vn/api/categoryProduct/addCategoryProduct',{
            method: "POST",
            headers: {
                Authorization: `${parsetypeToken} ${parseaccessToken}`,
                "Content-Type": "application/json",
            },           
            body: JSON.stringify(category), 
        })
        const data = await res.json();

        if(!res.ok){
            console.log('Lỗi không thêm được',data.status);
            return { success: false, errors: data.errors || {} };

        }
        return { success: true };
    }    
    } catch (error) {
        console.log("lỗi rồi",error);
            return { success: false, errors: { general: ["Lỗi kết nối server"] } };

        
    }
}
export const deleteCategories = async(slugCate:number|string) =>{
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");

    if (accessToken && typeToken) {
      const parseaccessToken = JSON.parse(accessToken);
      const parsetypeToken = JSON.parse(typeToken);
      const res = await fetch(`https://huunghi.id.vn/api/categoryProduct/deleteVoucher/${slugCate}`, {
        method: "DELETE",
        headers: {
          "Authorization": `${parsetypeToken} ${parseaccessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        console.error("❌ Lỗi xoá voucher:", res.status, res.statusText, errorMsg);
        return false;
      }
      return true;
    } else {
      console.error("❌ Thiếu token trong localStorage");
      return false;
    }

  } catch (error) {
    console.error("❌ Lỗi khi gọi API xoá voucher:", error);
    return false;
  }
}
export const editCategories = async (slugCate: string | number, updatedCate: any) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");

    if (!accessToken || !typeToken) {
      throw new Error("❌ Thiếu token xác thực");
    }

    const parseAccessToken = JSON.parse(accessToken);
    const parseTypeToken = JSON.parse(typeToken);

    const mappedCate = {
      nameCate: updatedCate.ten_loai,
      slug: updatedCate.duong_dan,
      descriptionCate: updatedCate.mota_loai,
      idParent : updatedCate.id_danh_muc_cha || null,
    };

    const res = await fetch(`https://huunghi.id.vn/api/categoryProduct/updateCategoryProduct/${slugCate}`, {
      method: "PUT",
      headers: {
        Authorization: `${parseTypeToken} ${parseAccessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedCate),
    });

    const data = await res.json();

      if (!res.ok) {
        return { success: false, errors: data.errors || {} };
      }

      return { success: true };
  } catch (error: any) {
    console.error("❌ Lỗi khi gọi editCate:", error);
    // Trả lỗi ra ngoài để component xử lý tiếp
    throw error;
  }
};
export const hiddenCate = async (slug: number | string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");
    if(accessToken && typeToken) {
      const parseAccessToken = JSON.parse(accessToken);
    const parseTypeToken = JSON.parse(typeToken);

    const res = await fetch(`https://huunghi.id.vn/api/categoryProduct/changeStatus/${slug}`, {
      method: "PATCH",
      headers: {
        "Authorization": `${parseTypeToken} ${parseAccessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("❌ Lỗi khi ẩn danh mục:", res.status, res.statusText);
    }

    const result = await res.json();
    return result;
    }
      } catch (error) {
    console.error("❌ Lỗi khi gọi API hiddenCate:", error);
  }
};
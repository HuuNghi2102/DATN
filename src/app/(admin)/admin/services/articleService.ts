import { log } from "console";
import articleInterface from "../types/article";
import { CreateArticle } from "../types/article";
import { json } from "stream/consumers";


export const createdArticle = async (newArticle: CreateArticle, imageFile: File) => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        const typeToken = localStorage.getItem("typeToken");

        if (accessToken && typeToken) {
        const parseaccessToken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);

        const formData = new FormData();
        formData.append("content", newArticle.noi_dung_bai_viet);
        formData.append("image", imageFile); // Truyền file thô
        formData.append("name", newArticle.ten_bai_viet);
        formData.append("slug", newArticle.duong_dan);

        const res = await fetch("https://huunghi.id.vn/api/post/addPost", {
            method: "POST",
            headers: {
                Authorization: `${parsetypeToken} ${parseaccessToken}`,
            },
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Lỗi chi tiết:", data);
            
            return { success: false, errors: data.errors || {} };
        }
        return data;

        }
    } catch (error) {
        console.log("Lỗi khi gọi API:", error);
        return [];
    }
};

export const deleteArticle = async (articleSlug: string | number) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");

    if (accessToken && typeToken) {
      const parseaccessToken = JSON.parse(accessToken);
      const parsetypeToken = JSON.parse(typeToken);

      const res = await fetch(`https://huunghi.id.vn/api/post/deletePost/${articleSlug}`, {
        method: "DELETE",
        headers: {
          Authorization: `${parsetypeToken} ${parseaccessToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Lỗi", res.status, data);
        
      }else{
        return data;
      }

      return data;
    }
  } catch (error) {
    console.error("Lỗi xóa bài viết:", error);
  }
};


export const editArticle = async (
  articleSlug: number | string,
  updateArticle: any,
  imageFile?: File
): Promise<any | null> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");

    if (accessToken && typeToken) {
      const parseaccessToken = JSON.parse(accessToken);
      const parsetypeToken = JSON.parse(typeToken);

      const formData = new FormData();
      formData.append("name", updateArticle.ten_bai_viet);
      formData.append("slug", updateArticle.duong_dan);
      formData.append("content", updateArticle.noi_dung_bai_viet);
      formData.append("status", updateArticle.trang_thai.toString());
      formData.append("author_id", updateArticle.id_nguoi_tao.toString());
      formData.append("_method", "PUT");

      if (imageFile && typeof imageFile !== "string") {
        formData.append("image", imageFile);
      }

      // ✅ Log toàn bộ form
      console.log("=== DỮ LIỆU FORM GỬI LÊN ===");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const res = await fetch(`https://huunghi.id.vn/api/post/updatePost/${articleSlug}`, {
        method: "POST",
        headers: {
          Authorization: `${parsetypeToken} ${parseaccessToken}`,
        },
        body: formData,
      });

      const contentType = res.headers.get("Content-Type");
      const data = contentType?.includes("application/json") ? await res.json() : await res.text();

      console.log("Response status:", res.status);
      console.log("Response body:", data);

      if (!res.ok) {
        console.error("❌ Lỗi khi cập nhật bài viết:", data);
        throw new Error(`Lỗi ${res.status}`);
      }

      return data;
    }
  } catch (error) {
    console.error("❌ Lỗi khi gọi API cập nhật:", error);
    return null;
  }
};
export const changeStatusArticle = async (slug: number | string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const typeToken = localStorage.getItem("typeToken");
    if(accessToken && typeToken) {
      const parseAccessToken = JSON.parse(accessToken);
    const parseTypeToken = JSON.parse(typeToken);

    const res = await fetch(`https://huunghi.id.vn/api/post/changeStatusPost/${slug}`, {
      method: "PATCH",
      headers: {
        "Authorization": `${parseTypeToken} ${parseAccessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("❌ Lỗi khi đổi trạng thái Article:", res.status, res.statusText);
    }

    const result = await res.json();
    return result;
    }
      } catch (error) {
    console.error("❌ Lỗi khi gọi API changeStatusArticle:", error);
  }
};




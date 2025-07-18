import { CartItem } from "./CartItem";
const addToCart = (action: CartItem) => {
  const accessToken = localStorage.getItem("accessToken");
  const typeToken = localStorage.getItem("typeToken");
  const user = localStorage.getItem("user");
  if (accessToken && typeToken && user) {
    const parsetoken = JSON.parse(accessToken);
    const parsetypeToken = JSON.parse(typeToken);
    try {
      fetch("https://huunghi.id.vn/api/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${parsetypeToken} ${parsetoken}`,
        },
        body: JSON.stringify({
          name: action.ten_san_pham,
          image: action.anh_san_pham,
          slug: action.duong_dan,
          size: action.kich_thuoc_san_pham,
          color: action.mau_san_pham,
          quantity: action.so_luong_san_pham,
          price: action.gia_san_pham,
          idVariant: action.id_san_pham_bien_the,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          return (window.location.href = "/cart");
        })
        .catch((err) => console.error("Lỗi tải cart từ server:", err));
    } catch (error) {
      console.log(error);
    }
  }
};
export default addToCart;

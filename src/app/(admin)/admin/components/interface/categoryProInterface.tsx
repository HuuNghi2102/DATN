export default interface CategoryInterface{
    id_loai_san_pham : number,
    ten_loai : string,
    duong_dan : string,
    mota_loai : string,
    id_danh_muc_cha : number,
    created_at : string;
    updated_at : string | null;
    deleted_at : string | null
}
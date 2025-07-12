export default interface categoryInterface{
    id_loai_san_pham: number;
    ten_loai: string;
    duong_dan: string;
    mota_loai: string;
    id_danh_muc_cha?: number;
    created_at: string;
    update_at: string;
    delete_at: string;
}

export interface CreatedCategory{
    ten_loai: string;
    duong_dan: string;
    mota_loai: string;
    id_danh_muc_cha?: number|null;
}
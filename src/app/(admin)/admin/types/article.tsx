export default interface articleInterface {
    id_bai_viet: number;         
    ten_bai_viet: string;          
    duong_dan: string;             
    noi_dung_bai_viet: string;      
    trang_thai: string | number;
    id_nguoi_tao: number;           
    created_at: string;             
    updated_at: string;             
    deleted_at: string | null;      
    anh_bai_viet: string;    
}
export interface CreateArticle{
    ten_bai_viet: string;
    duong_dan:string;
    noi_dung_bai_viet:string;
    trang_thai: string | number;
    anh_bai_viet: string;
    id_nguoi_tao: number;

}
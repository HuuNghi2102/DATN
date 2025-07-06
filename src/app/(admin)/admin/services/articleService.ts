import articleInterface from "../types/article";


export const getAPIArticle = async():Promise<articleInterface[]> =>{
    try {
        const accessToken = localStorage.getItem("accessToken");
        const typeToken = localStorage.getItem("typeToken");
        if (accessToken && typeToken) {
        const parseaccessToken = JSON.parse(accessToken);
        const parsetypeToken = JSON.parse(typeToken);
        const res = await fetch('https://huunghi.id.vn/api/post/listPost',{
                method: "GET",
                headers: {
                "Authorization": `${parsetypeToken} ${parseaccessToken}`,
                "Content-Type": "application/json",
            }});
            if(!res.ok) {
                console.error("❌ Fetch failed:", res.status, res.statusText);
                return [];
            }
            const data = await res.json();
            const article =  data?.data?.posts?.data;
            return article;
        }
        return[];
    } catch (error) {
        console.log(error); 
        return[];
    }
}
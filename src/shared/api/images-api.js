// import backendInstance from "./instance";

// export const addImage = async (payload) => {
//     const { data } = await backendInstance.post("/upload", payload, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         }
//     });
//     return data;
// }

import backendInstance from "./instance";

export const addImage = async (payload) => {
    console.log('🔗 Base URL:', import.meta.env.VITE_API_URL);
    console.log('🔗 Full URL:', `${import.meta.env.VITE_API_URL}/upload`);
    
    const { data } = await backendInstance.post("/upload", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return data;
}
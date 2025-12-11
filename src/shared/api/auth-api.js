import backendInstance from "./instance";

// export const registrUserApi = async payload => {
//     const {data} = await backendInstance.post("/auth/registr", payload);
//     return data;
// }

export const registrPasswordApi = async (password) => {
    const { data } = await backendInstance.post("/auth/register/password", {
        password
    });

    return data; 
};

export const registrNameApi = async (token, name) => {
    const { data } = await backendInstance.post("/auth/register/name", {
        token,
        name
    });

    return data;
};
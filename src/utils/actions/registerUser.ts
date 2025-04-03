"use server";

import { TLoginUser } from "@/app/login/page";
import { TUserData } from "@/app/register/page";

export const registerUser = async (data: TUserData) => {
    const res = await fetch(`${process.env.BACKEND_URL}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
    }).then((res) => res.json());
    return res;
};

export const loginUser = async (data: TLoginUser) => {
    const res = await fetch(`${process.env.BACKEND_URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
    }).then((res) => res.json());
    return res;
};

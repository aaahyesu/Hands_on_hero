import { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/client";

export default async function handler (
    req:NextApiRequest,
    res:NextApiResponse
) {
    await client.user.create({
        data: {
            email: "s",
            name: "d",
            password: "asg",
            balance: 1234
        },
    });
    res.json({
        ok: true,
    })
}
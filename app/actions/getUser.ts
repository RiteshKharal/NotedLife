import { prisma } from "@/lib/prisma";
import React from "react";

export async function getUserByPostId(id: string) {
	const user = await prisma.post.findUnique({
		where: {
			id: id,
		},
		include: {
			user: true,
		},
	});

    return user
}

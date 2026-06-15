"use server";

import { prisma } from "@/lib/prisma";

export async function getUserByPostId(id: string) {
	const user = await prisma.post.findUnique({
		where: {
			id: id,
		},
		include: {
			user: true,
		},
	});

	return user;
}

export async function getUserByUserId(id: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});

	return user;
}

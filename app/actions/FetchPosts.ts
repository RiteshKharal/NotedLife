"use server";

import { prisma } from "@/lib/prisma";

export async function FetchPosts(amount: number = 10) {
	const posts = await prisma.post.findMany({
		where: {},
		include: {
			// comments: {
			// 	take: 10,
			// 	skip: 0,
			// 	include: {
			// 		user: {},
			// 	},
			// },
			// likes:true,
			user: true,
		},
		take: amount,
		skip: 0,
	});

	return posts;
}

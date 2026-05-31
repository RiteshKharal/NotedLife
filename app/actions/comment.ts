"use server";

import { prisma } from "@/lib/prisma";

type PostType = {
	id: string;
	description: string | null;
	media: string[];
	likesCount: number;
	sharesCount: number;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	user: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		name: string;
		email: string;
		emailVerified: boolean;
		image: string | null;
	};
};

export async function comment(post: PostType, text: string) {
	const data = await prisma.comment.create({
		data: {
			postId: post.id,
			content: text,
			userId: post.user.id,
		},
		include: {
			user: true,
		},
	});


	if (!data) {
	}

	return data;
}

export async function FetchComments(fetchId: string, amount: number = 10) {
	const data = await prisma.comment.findMany({
		where: {
			post: {
				id: fetchId,
			},
		},
		include: {
			user: true,
		},
		take: amount,
		skip: 0,
	});

	return data;
}

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

export async function comment(post: PostType, userId: string, text: string) {
	const data = await prisma.comment.create({
		data: {
			postId: post.id,
			content: text,
			userId: userId,
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

export async function ToggleLike(postId: string, userId: string) {
	const exists = await prisma.like.findUnique({
		where: {
			userId_postId: {
				userId: userId,
				postId: postId,
			},
		},
	});

	if (!exists) {
		const data = await prisma.like.create({
			data: {
				userId: userId,
				postId: postId,
			},
		});

		return data;
	} else {
		const data = await prisma.like.delete({
			where: {
				userId_postId: {
					userId: userId,
					postId: postId,
				},
			},
		});

		return data;
	}
}

export async function CheckLike(postId: string, userId: string) {
	const exists = await prisma.like.findUnique({
		where: {
			userId_postId: {
				userId: userId,
				postId: postId,
			},
		},
	});

	return exists;
}

export async function ToggleSave(postId: string, userId: string) {
	const exists = await prisma.save.findUnique({
		where: {
			userId_postId: {
				userId: userId,
				postId: postId,
			},
		},
	});

	if (!exists) {
		const data = await prisma.save.create({
			data: {
				userId: userId,
				postId: postId,
			},
		});

		return data;
	} else {
		const data = await prisma.save.delete({
			where: {
				userId_postId: {
					userId: userId,
					postId: postId,
				},
			},
		});

		return data;
	}
}

export async function CheckSave(postId: string, userId: string) {
	const exists = await prisma.save.findUnique({
		where: {
			userId_postId: {
				userId: userId,
				postId: postId,
			},
		},
	});

	return exists;
}

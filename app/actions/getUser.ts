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

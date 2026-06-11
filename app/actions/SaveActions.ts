"use server";

export async function FetchSaved({
	userId,
	amount = 10,
}: {
	userId: string;
	amount?: number;
}) {
	try {
		const data = await prisma?.save.findMany({
			where: {
				userId: userId,
			},
			take: amount,
			select: {
				post: {
					include: {
						user: true,
					},
				},
			},
		});
		return data?.map((s) => s.post);
	} catch (er) {
		console.warn("Could not reach Database");
		return null;
	}
}

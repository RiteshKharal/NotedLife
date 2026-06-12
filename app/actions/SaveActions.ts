"use server";

export async function FetchSaved({
	userId,
	amount = 10,
}: {
	userId: string;
	amount?: number;
}) {
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
}

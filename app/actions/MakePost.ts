"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { server_supabase } from "@/lib/server-supabase";
import { supabase } from "@/lib/supabase";
import { headers } from "next/headers";

export async function UserPost(
	description: string | null,
	media: File[] | null,
	OnError: (er: string) => void,
) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		OnError("User not signed in!");
		return null;
	}
	let MediaLinks: string[] = [];

	if (media && media.length > 0) {
		const now = Date.now();
		const Uploads = await Promise.all(
			media.map(async (file: File) => {
				const UploadPath = `media/${session.user.id}/${now}-${file.name}`;
				const { data, error } = await server_supabase.storage
					.from("posts")
					.upload(UploadPath, file);

				if (!data || error) {
					OnError("Could not upload media. Please try again");
					throw new Error("Couldn't upload media");
				}
				const PublicURL = server_supabase.storage
					.from("posts")
					.getPublicUrl(data.path).data.publicUrl;

				if (!PublicURL) {
					OnError("An error occured! Please try again.");
					throw new Error("Couldn't fetch url");
				}

				return PublicURL;
			}),
		);

		MediaLinks = Uploads;
	}

	const data = await prisma.post.create({
		data: {
			description: description,
			media: MediaLinks,
			userId: session.user.id,
		},
	});


	return data;
}

"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { server_supabase } from "@/lib/server-supabase";
import { headers } from "next/headers";

export async function PostPfp(formdata: FormData) {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) return { data: null, error: "User not logged in!" };

	const file = formdata.get("file") as File;
	if (!file) {
		return { data: null, error: "No file provided" };
	}
	const path = `profile-picture/${session.user.id}`;

	const { data, error } = await server_supabase.storage
		.from("profile")
		.upload(path, file, {
			upsert: true,
		});

	if (error || !data) {
		return { data: null, error: error?.message || "Upload failed" };
	}

	const PublicURL = server_supabase.storage
		.from("profile")
		.getPublicUrl(data.path).data.publicUrl;

	await prisma.user.update({
		where: {
			id: session.user.id,
		},
		data: {
			image: PublicURL,
		},
	});

	return { data: PublicURL, error: null };
}

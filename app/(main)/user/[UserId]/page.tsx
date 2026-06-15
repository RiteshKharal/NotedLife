"use client";

import { getUserByUserId } from "@/app/actions/UserActions";
import { UserType } from "@/app/types/user";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as fonts from "@/app/fonts";
import { PostType } from "@/app/types/post";
import { FetchPosts } from "@/app/actions";
import { FetchUserPosts } from "@/app/actions/FetchPosts";
import { PostCard } from "@/app/components/PostCard";

export default function Page() {
	const params = useParams<{ UserId: string }>();
	const userId = params.UserId;
	const [user, setUser] = useState<UserType | null>();
	const router = useRouter();
	const [error, setError] = useState(false);
	const [posts, setPosts] = useState<PostType[]>();

	useEffect(() => {
		async function update() {
			try {
				const u = await getUserByUserId(userId);

				setUser(u);
			} catch (er) {
				console.warn("Failed to fetch user");
			}

			try {
				const p = await FetchUserPosts({ id: userId });

				setPosts(p);
			} catch (er) {
				console.warn("Failed to fetch posts.");
			}
		}

		update();
	}, [userId]);

	if (typeof user === "undefined") {
		return (
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-8xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
				<div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
				<div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
					<div className="flex items-center gap-3">
						<div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
						<div className="space-y-2">
							<div className="h-4 w-36 animate-pulse rounded bg-muted" />
							<div className="h-3 w-24 animate-pulse rounded bg-muted" />
						</div>
					</div>
					<div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-muted" />
					<div className="mt-4 aspect-4/3 w-full animate-pulse rounded-2xl bg-muted" />
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
				<div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
					<h1 className="text-lg font-semibold tracking-tight">
						This user is not available
					</h1>

					<p className="mt-2 text-sm text-muted-foreground">
						It may have been deleted or the link may be incorrect.
					</p>

					<button
						className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-background transition hover:bg-primary-hover"
						onClick={() => router.push("/")}
					>
						<ArrowLeft size={17} />
						Back
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			<button
				onClick={() => router.back()}
				className="mb-6 flex items-center gap-2 rounded-xl border bg-card px-4 py-2 transition hover:bg-accent"
			>
				<ArrowLeft size={18} />
				Back
			</button>

			<div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
				<div
					className={`h-52 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent relative`}
				>
					<Image
						src={user.image}
						alt={user.name}
						fill
						className="h-full object-cover"
					/>

					<div className="h-full bg-linear-to-t from-card/97 to-transparent inset-0 absolute" />
				</div>

				<div className="relative px-8 pb-8">
					<div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
						<div className="flex items-end gap-5">
							<div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-background shadow-lg">
								<Image
									src={user.image}
									alt={user.name}
									fill
									className="object-cover"
								/>
							</div>

							<div className="pb-2">
								<h1 className={`text-4xl font-bold ${fonts.exo2.className}`}>
									{user.name}
								</h1>

								<p className="mt-1 text-muted-foreground">
									Joined {user.createdAt.toLocaleDateString()}
								</p>
							</div>
						</div>

						<div className="grid grid-cols-3 gap-3">
							<div className="rounded-2xl border bg-background/50 px-5 py-4">
								<div className="text-2xl font-bold">{posts?.length ?? 0}</div>

								<div className="text-xs text-muted-foreground">Posts</div>
							</div>

							<div className="rounded-2xl border bg-background/50 px-5 py-4">
								<div className="text-sm font-semibold">Active</div>

								<div className="text-xs text-muted-foreground">Status</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mt-10">
				<div className="mb-6 flex items-center justify-between">
					<h2 className="text-2xl font-bold">Posts</h2>

					<div className="text-sm text-muted-foreground"></div>
				</div>

				<div className="space-y-5 flex flex-col w-full justify-center items-center">
					{posts?.length ? (
						posts.map((p) => <PostCard post={p} key={p.id} />)
					) : (
						<div className="rounded-3xl border border-dashed py-20 text-center">
							<h3 className="text-lg font-semibold">No posts yet</h3>

							<p className="mt-2 text-muted-foreground">
								This user hasn&apos;t shared anything.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

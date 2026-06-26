"use client";

import { getUserByUserId } from "@/app/actions/UserActions";
import { UserType } from "@/app/types/user";
import {
	ArrowLeft,
	CalendarDays,
	FileText,
	ImageIcon,
	Plus,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as fonts from "@/app/fonts";
import { PostType } from "@/app/types/post";
import { FetchUserPosts } from "@/app/actions/FetchPosts";
import { PostCard } from "@/app/components/PostCard";

export default function Page() {
	const params = useParams<{ UserId: string }>();
	const userId = params.UserId;

	const router = useRouter();

	const [user, setUser] = useState<UserType | null>();
	const [posts, setPosts] = useState<PostType[]>();

	useEffect(() => {
		async function update() {
			try {
				const [u, p] = await Promise.all([
					getUserByUserId(userId),
					FetchUserPosts({ id: userId }),
				]);

				setUser(u);
				setPosts(p);
			} catch {
				console.warn("Failed to fetch profile.");
				setUser(null);
			}
		}

		update();
	}, [userId]);

	if (typeof user === "undefined") {
		return (
			<div className="mx-auto max-w-6xl px-4 py-8">
				<div className="overflow-hidden rounded-3xl border bg-card">
					<div className="h-72 animate-pulse bg-gradient-to-r from-muted via-muted/50 to-muted" />

					<div className="relative px-8 pb-8">
						<div className="-mt-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
							<div className="flex items-end gap-5">
								<div className="h-36 w-36 animate-pulse rounded-full border-4 border-background bg-muted" />

								<div className="space-y-3">
									<div className="h-10 w-56 animate-pulse rounded-xl bg-muted" />
									<div className="h-4 w-32 animate-pulse rounded bg-muted" />
								</div>
							</div>

							{/* <div className="h-20 w-32 animate-pulse rounded-2xl bg-muted" /> */}
						</div>
					</div>
				</div>

				<div className="mt-10 space-y-6">
					{Array.from({ length: 3 }).map((_, i) => (
						<div key={i} className="rounded-3xl border bg-card p-6">
							<div className="flex items-center gap-3">
								<div className="h-12 w-12 animate-pulse rounded-full bg-muted" />

								<div className="space-y-2">
									<div className="h-4 w-32 animate-pulse rounded bg-muted" />
									<div className="h-3 w-20 animate-pulse rounded bg-muted" />
								</div>
							</div>

							<div className="mt-5 h-4 w-full animate-pulse rounded bg-muted" />
							<div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-muted" />
							<div className="mt-5 h-72 animate-pulse rounded-2xl bg-muted" />
						</div>
					))}
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center px-4">
				<div className="w-full rounded-3xl border bg-card p-10 text-center shadow-sm">
					<h1 className="text-xl font-bold">User not found</h1>

					<p className="mt-2 text-muted-foreground">
						This profile may have been deleted or the link is invalid.
					</p>

					<button
						onClick={() => router.push("/")}
						className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90"
					>
						<ArrowLeft size={18} />
						Go Home
					</button>
				</div>
			</div>
		);
	}

	const joinedDate = new Date(user.createdAt).toLocaleDateString();

	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			{/* <div className="mb-6">
				<button
					onClick={() => router.back()}
					className="flex items-center gap-2 rounded-xl border bg-card px-4 py-2 transition hover:bg-muted"
				>
					<ArrowLeft size={18} />
					Back
				</button>
			</div> */}

			<div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
				<div className="relative h-72 overflow-hidden">
					<Image
						src={user.image}
						alt={user.name}
						fill
						priority
						className="scale-110 object-cover blur-sm"
					/>

					<div className="absolute inset-0 bg-black/50" />

					<div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
				</div>

				<div className="relative px-8 pb-8">
					<div className="-mt-20 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
						<div className="flex flex-col gap-5 sm:flex-row sm:items-end">
							<div className="relative h-36 w-36 overflow-hidden rounded-full border-4 border-background shadow-2xl ring-1 ring-primary/15">
								<Image
									src={user.image}
									alt={user.name}
									fill
									className="object-cover"
								/>
							</div>

							<div>
								<h1
									className={`text-4xl font-bold tracking-tight ${fonts.exo2.className}`}
								>
									{user.name}
								</h1>

								<div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
									<div className="flex items-center gap-2">
										<CalendarDays size={15} />
										Joined {joinedDate}
									</div>
								</div>
							</div>
						</div>

							{/* <div className="flex gap-4">
								<div className="rounded-2xl border bg-background/60 px-6 py-4 backdrop-blur">
									<div className="flex items-center gap-2 text-muted-foreground">
										<Plus size={15} />
										New post
									</div>
								</div>
							</div> */}
					</div>
				</div>
			</div>

			<div className="mt-5 w-full rounded-2xl border border-border bg-card/85 backdrop-blur-2xl shadow-sm">
				<div className="p-5">
					<input
						type="text"
						placeholder="What's on your mind?"
						className="h-12 w-full rounded-xl border border-transparent bg-card2 px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
					/>

					<div className="mt-4 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<button
								type="button"
								className="flex h-10 w-10 items-center justify-center rounded-xl text-green-500 transition-colors hover:bg-green-500/10"
							>
								<ImageIcon size={20} />
							</button>

							<span className="text-sm text-muted-foreground">Add photo</span>
						</div>

						<button
							type="submit"
							className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
						>
							Post
						</button>
					</div>
				</div>
			</div>

			<div className="mt-10">
				<div className="mb-6 flex items-center justify-between">
					<div>{/* <h2 className="text-2xl font-bold">Posts</h2> */}</div>
				</div>

				<div className="flex flex-col gap-6 px-3">
					{posts?.length ? (
						posts.map((post) => <PostCard key={post.id} post={post} />)
					) : (
						<div className="rounded-3xl border bg-card py-24 text-center">
							<div className="mx-auto max-w-md">
								<div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
									<FileText size={28} />
								</div>

								<h3 className="mt-5 text-xl font-semibold">No posts yet</h3>

								<p className="mt-2 text-muted-foreground">
									This user hasn&apos;t shared anything with the community yet.
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

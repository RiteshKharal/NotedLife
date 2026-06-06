import Link from "next/link";
import { Plus } from "lucide-react";

import { PostCard } from "../components/PostCard";
import { FetchPosts } from "../actions/FetchPosts";
import { PostType } from "../types/post";

export default async function Home() {
	const posts = await FetchPosts(10);

	return (
		<section className="flex w-full flex-1 justify-center px-4 py-6 sm:px-6 lg:px-8 overflow-x-hidden overflow-y-auto scrollbar-none">
			<div className="flex w-full max-w-210 flex-col gap-6">
				{posts.length === 0 ? (
					<section className="rounded-3xl border border-border bg-card p-8 text-center">
						<p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
							No posts yet
						</p>
						<h2 className="mt-4 text-2xl font-black text-foreground">
							Ready to share your first idea?
						</h2>
						<p className="mt-2 text-sm leading-6 text-foreground/70">
							Posts will appear here once you publish them.
						</p>
						<div className="mt-6 flex justify-center">
							<Link
								href="/create"
								className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-background transition hover:bg-primary-hover"
							>
								Create a post
							</Link>
						</div>
					</section>
				) : (
					<div className="grid gap-4">
						{posts.map((post: PostType) => (
							<PostCard key={post.id} post={post} />
						))}
					</div>
				)}
			</div>
		</section>
	);
}

"use client";

import { FetchSaved } from "@/app/actions/SaveActions";
import { GetSession } from "@/app/actions/session";
import { PostCard } from "@/app/components/PostCard";
import { PostType } from "@/app/types/post";
import { Bookmark, ImageIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
	const session = GetSession();
	const [posts, setPosts] = useState<PostType[] | null>();

	useEffect(() => {
		const load = async () => {
			if (!session?.user) {
				return;
			}

			try {
				const dt = await FetchSaved({ userId: session.user.id });

				setPosts(dt);
			} catch (e) {
				setPosts(null);
			}
		};

		load();
	}, [session?.user]);

	if (typeof posts === "undefined" || !session?.user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<Loader2 className="h-10 w-10 animate-spin rounded-full border-t-primary" />
					<p className="text-sm text-muted-foreground">Loading library...</p>
				</div>
			</div>
		);
	}

	if (!posts) {
		return (
			<div className="min-h-screen flex items-center justify-center px-4">
				<div className="text-center max-w-sm">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
						<ImageIcon size={22} />
					</div>

					<h3 className="mt-4 text-base font-semibold">No saved posts</h3>

					<p className="mt-2 text-sm text-muted-foreground leading-6">
						Saved posts will appear here when you bookmark content.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-h-screen overflow-y-scroll scrollbar-none bg-background px-4 sm:px-6 lg:px-10 py-8">
				{/* <div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Bookmark size={18} />
					</div>

					<div>
						<h1 className="text-2xl font-bold tracking-tight">Library</h1>
						<p className="text-sm text-muted-foreground">
							Your saved posts collection
						</p>
					</div>
				</div> */}

				<div className="flex flex-col gap-5 items-center">
					{posts?.map((post) => (
						<PostCard post={post} key={post.id} />
					))}
				</div>
			</div>
	);
}

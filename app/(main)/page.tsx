"use client";

import { SendHorizonal, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { PostCard } from "../components/PostCard";
import { useSettleExit } from "../hooks/useSettleExit";
import { FetchPosts } from "../actions/FetchPosts";

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

export default function Home() {
	const [CommentsBoard, setCommentsBoards] = useState<null | boolean>(null);
	const CommentsBoardRef = useRef<null | HTMLDivElement>(null);
	const [posts, setPosts] = useState<PostType[] | null>(null);

	useSettleExit(CommentsBoardRef, () => {
		setCommentsBoards(false);
	});

	async function UpdatePosts() {
		try {
			const Updated = await FetchPosts();
			setPosts(Updated);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		UpdatePosts();
	}, []);

	return (
		<section className="flex w-full flex-1 justify-center px-4 py-6 sm:px-6 lg:px-8">
			{CommentsBoard && (
				<section className="fixed inset-0 z-50 flex items-center justify-center bg-background/55 px-4 backdrop-blur-sm">
					<div
						className="relative flex h-[min(34rem,88vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/10 animate-[PopIn_50ms_ease-in-out]"
						ref={CommentsBoardRef}
					>
						<div className="flex items-center justify-between border-b border-border px-4 py-3">
							<span className="text-sm font-semibold">Comments</span>

							<button
								onClick={() => setCommentsBoards(null)}
								className="rounded-xl p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
								aria-label="Close comments"
							>
								<X size={18} />
							</button>
						</div>

						<div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
							No comments yet.
						</div>

						<div className="border-t border-border p-3">
							<div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 transition focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/10">
								<input
									type="text"
									placeholder="Write a comment..."
									className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
								/>

								<button className="rounded-lg p-2 text-primary transition hover:bg-primary/10">
									<SendHorizonal size={18} />
								</button>
							</div>
						</div>
					</div>
				</section>
			)}

			<section className="flex w-full max-w-210 flex-col gap-4">
				{posts &&
					posts.map((post, i) => (
						<PostCard
							key={post.id}
							post={post}
							comment={() => setCommentsBoards(true)}
						/>
					))}
			</section>
		</section>
	);
}

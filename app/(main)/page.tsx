"use client";

import { SendHorizonal, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import * as fonts from "../fonts";
import { Test } from "./test";
import { PostCard } from "../components/PostCard";
import { useSettleExit } from "../hooks/useSettleExit";

export default function Home() {
	const [CommentsBoard, setCommentsBoards] = useState<null | boolean>(null);
	const CommentsBoardRef = useRef<null | HTMLDivElement>(null);

	useSettleExit(CommentsBoardRef, () => {
		setCommentsBoards(false);
	});

	return (
		<section className="flex w-full flex-1 justify-center px-4 py-6 flex-col gap-7 items-center">
			{CommentsBoard && (
				<section className="fixed z-50 flex w-full h-full items-center justify-center">
					<div
						className="relative flex flex-col w-125 max-w-[95vw] h-130 rounded-2xl border border-border bg-card/90 shadow-xl animate-[PopIn_50ms_ease-in-out] overflow-hidden backdrop-blur-lg"
						ref={CommentsBoardRef}
					>
						<div className="flex items-center justify-between border-b border-border px-4 py-3">
							<span className={fonts.cabin.className}>Comments</span>

							<button
								onClick={() => setCommentsBoards(null)}
								className="p-1 rounded-md hover:bg-muted transition"
							>
								<X size={18} />
							</button>
						</div>

						<div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
							No comments yet.
						</div>

						<div className="border-t border-border p-3">
							<div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2 focus-within:ring-2 focus-within:ring-primary/30">
								<input
									type="text"
									placeholder="Write a comment..."
									className={`flex-1 bg-transparent outline-none text-sm ${fonts.cabin.className}`}
								/>

								<button>
									<SendHorizonal size={18} />
								</button>
							</div>
						</div>
					</div>
				</section>
			)}

			<section className="w-full max-w-210 overflow-hidden rounded-3xl  p-4 transition hover:shadow-xl">
				<PostCard
					comment={() => {
						setCommentsBoards(true);
					}}
				/>
			</section>
		</section>
	);
}

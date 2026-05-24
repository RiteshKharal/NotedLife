import React from "react";
import Image from "next/image";
import {
	Bookmark,
	EllipsisIcon,
	MessageCircle,
	Send,
	ThumbsUp,
	User,
} from "lucide-react";

export function PostCard({ comment }: { comment: () => void }) {
	return (
		<div className="w-full rounded-2xl border border-border p-4 sm:p-5 lg:max-w-200">
			<div className="flex items-center justify-between">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card2 text-foreground">
						<User size={20} />
					</div>

					<div className="flex min-w-0 flex-col items-start leading-tight">
						<h2 className="text-sm font-semibold tracking-tight">Guest</h2>

						<p className="text-xs text-foreground/60">2 hours ago</p>
					</div>
				</div>

				<button className="rounded-full p-2 transition hover:bg-muted">
					<EllipsisIcon />
				</button>
			</div>

			<div className="mt-4 flex flex-col items-start text-left">
				<p className="text-[15px] font-medium leading-relaxed text-foreground/90">
					worshsflh
				</p>
			</div>

			<div className="mt-4 grid w-full overflow-hidden rounded-2xl sm:h-100 sm:grid-cols-[2fr_auto]">
				<div className="overflow-hidden border border-border">
					<Image
						src="/ishowspeed.jpg"
						alt="Post image"
						width={900}
						height={900}
						className="h-full max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] sm:h-auto"
						loading="eager"
					/>
				</div>

				<div className="grid overflow-hidden border-border sm:grid-rows-2">
					<div className="overflow-hidden border border-border">
						<Image
							src="/ishowspeed.jpg"
							alt="Post image"
							width={900}
							height={900}
							className="h-full max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] sm:h-auto"
							loading="eager"
						/>
					</div>
					<div className="overflow-hidden border border-border">
						<Image
							src="/ishowspeed.jpg"
							alt="Post image"
							width={900}
							height={900}
							className="h-full max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] sm:h-auto"
							loading="eager"
						/>
					</div>
				</div>
			</div>

			<div className="mt-4 grid grid-cols-4 items-center justify-between border-t border-border pt-3">
				<button className="flex min-h-10 items-center justify-center gap-2 rounded-xl px-2 text-sm font-medium transition hover:bg-muted">
					<ThumbsUp size={20} />
					<span className="hidden sm:inline">Like</span>
				</button>

				<button
					className="flex min-h-10 items-center justify-center gap-2 rounded-xl px-2 text-sm font-medium transition hover:bg-muted"
					onClick={() => {
						comment();
					}}
				>
					<MessageCircle size={20} />
					<span className="hidden sm:inline">Comment</span>
				</button>

				<button className="flex min-h-10 items-center justify-center gap-2 rounded-xl px-2 text-sm font-medium transition hover:bg-muted">
					<Bookmark size={20} />
					<span className="hidden sm:inline">Save</span>
				</button>

				<button className="flex min-h-10 items-center justify-center gap-2 rounded-xl px-2 text-sm font-medium transition hover:bg-muted">
					<Send size={20} />
					<span className="hidden sm:inline">Share</span>
				</button>
			</div>
		</div>
	);
}

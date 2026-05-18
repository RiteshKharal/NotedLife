import React from "react";
import Image from "next/image";
import { Bookmark, EllipsisIcon, MessageCircle, Send, ThumbsUp, User } from "lucide-react";

export function PostCard({ comment }: { comment: () => void }) {
	function setCommentsBoards(arg0: boolean) {
		throw new Error("Function not implemented.");
	}

	return (
		<div className="border border-border p-5 rounded-2xl w-200">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex h-11 w-11 items-center justify-center rounded-full bg-card2 text-foreground">
						<User size={20} />
					</div>

					<div className="flex flex-col items-start leading-tight">
						<h2 className="text-sm font-semibold tracking-tight">Guest</h2>

						<p className="text-xs text-foreground/60">2 hours ago</p>
					</div>
				</div>

				<button className="rounded-full p-2 transition hover:bg-muted">
					<EllipsisIcon/>
				</button>
			</div>

			<div className="mt-4 flex flex-col items-start text-left">
				<p className="text-[15px] font-medium leading-relaxed text-foreground/90">
					worshsflh 📸
				</p>
			</div>

			<div className="grid grid-cols-[2fr_auto] max-w-200 rounded-2xl overflow-hidden mt-4 h-100">
				<div className=" overflow-hidden  border border-border">
					<Image
						src="/ishowspeed.jpg"
						alt="Post image"
						width={900}
						height={900}
						className="h-auto max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] pointer-events-none"
						loading="eager"
					/>
				</div>

				<div className="overflow-hidden grid grid-rows-2 border-border">
					<div className=" overflow-hidden border border-border">
						<Image
							src="/ishowspeed.jpg"
							alt="Post image"
							width={900}
							height={900}
							className="h-auto max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] pointer-events-none"
							loading="eager"
						/>
					</div>
					<div className=" overflow-hidden border border-border">
						<Image
							src="/ishowspeed.jpg"
							alt="Post image"
							width={900}
							height={900}
							className="h-auto max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015] pointer-events-none"
							loading="eager"
						/>
					</div>
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between border-t border-border pt-3">
				<button className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-muted">
					<ThumbsUp size={20} /> Like
				</button>

				<button
					className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-muted"
					onClick={() => {
						comment();
					}}
				>
					<MessageCircle size={20} /> Comment
				</button>

				<button className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-muted">
					<Bookmark size={20} /> Save
				</button>

				<button className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-muted">
					<Send size={20} /> Share
				</button>
			</div>
		</div>
	);
}

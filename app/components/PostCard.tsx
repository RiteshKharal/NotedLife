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

export function PostCard({
	post,
	comment,
}: {
	post: PostType;
	comment: () => void;
}) {
	return (
		<div className="w-full rounded-2xl border border-border p-4 sm:p-5 lg:max-w-200">
			<div className="flex items-center justify-between">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card2 text-foreground">
						<User size={20} />
					</div>

					<div className="flex min-w-0 flex-col items-start leading-tight">
						<h2 className="text-sm font-semibold tracking-tight">
							{post.user.name}
						</h2>

						<p className="text-xs text-foreground/60">
							{post.createdAt.getDate()}
						</p>
					</div>
				</div>

				<button className="rounded-full p-2 transition hover:bg-muted">
					<EllipsisIcon />
				</button>
			</div>

			<div className="mt-4 flex flex-col items-start text-left">
				<p className="text-[15px] font-medium leading-relaxed text-foreground/90">
					{post.description}
				</p>
			</div>

			{post.media.length > 0 && (
				<div className="mt-4 grid w-full overflow-hidden rounded-2xl sm:h-100 sm:grid-cols-[2fr_auto]">
					{post.media.length === 1 && (
						<div className="overflow-hidden border border-border col-span-2">
							<Image
								src={post.media[0]}
								alt="Post image"
								width={900}
								loading="eager"
								height={900}
								className="h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
							/>
						</div>
					)}

					{post.media.length === 2 && (
						<>
							{post.media.map((img) => (
								<div key={img} className="overflow-hidden border border-border">
									<Image
										src={img}
										alt="Post image"
										width={900}
										loading="eager"
										height={900}
										className="h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
									/>
								</div>
							))}
						</>
					)}

					{post.media.length >= 3 && (
						<>
							<div className="overflow-hidden border border-border">
								<Image
									src={post.media[0]}
									alt="Post image"
									width={900}
									loading="eager"
									height={900}
									className="h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
								/>
							</div>

							<div className="grid overflow-hidden border-border sm:grid-rows-3">
								{post.media.slice(1, 4).map((img, i) => {
									const isLast = i === 2;
									const extra = post.media.length - 4;

									return (
										<div
											key={img}
											className="relative overflow-hidden border border-border"
										>
											<Image
												src={img}
												alt="Post image"
												width={900}
												height={900}
												loading="eager"
												className="h-full w-full object-cover transition duration-300 hover:scale-[1.015]"
											/>

											{isLast && extra > 0 && (
												<div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-lg font-semibold">
													+{extra}
												</div>
											)}
										</div>
									);
								})}
							</div>
						</>
					)}
				</div>
			)}

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

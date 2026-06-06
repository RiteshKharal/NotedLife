"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
	Bookmark,
	EllipsisIcon,
	MessageCircle,
	Send,
	SendHorizontal,
	ThumbsUp,
	User,
	X,
} from "lucide-react";
import { useSettleExit } from "../hooks/useSettleExit";
import {
	CheckLike,
	comment,
	FetchComments,
	ToggleLike,
} from "../actions/PostActions";
import { CommentType, PostType } from "../types/post";
import { GetSession } from "../actions/session";
import { useRouter } from "next/navigation";

export function PostCard({ post }: { post: PostType }) {
	const [CommentsBoard, setCommentsBoards] = useState<null | boolean>(null);
	const CommentsBoardRef = useRef<null | HTMLDivElement>(null);
	const [comments, setComments] = useState<CommentType[] | null>(null);
	const [NumberOfComments] = useState<number>(10);
	const InputRef = useRef<HTMLInputElement | null>(null);
	const [SendPending, setSendPending] = useState(false);
	const [liked, setLiked] = useState(false);
	const router = useRouter();

	const session = GetSession();

	useSettleExit(CommentsBoardRef, () => {
		setCommentsBoards(false);
	});

	const UpdateComments = async () => {
		const NewData = await FetchComments(post.id, NumberOfComments);
		setComments(NewData);
	};

	const UpdateLiked = async () => {
		if (!session?.user.id) return;
		const check = await CheckLike(post.id, session?.user.id);

		if (check) {
			setLiked(true);
		} else setLiked(false);
	};

	useEffect(() => {
		FetchComments(post.id, NumberOfComments).then(setComments);
	}, [post.id, NumberOfComments]);

	useEffect(() => {
		if (!session?.user.id) return;

		CheckLike(post.id, session.user.id).then((data) => {
			if (data) {
				setLiked(true);
			} else setLiked(false);
		});
	}, [session?.user.id, post.id]);

	return (
		<div
			className="w-full rounded-2xl border border-border p-4 sm:p-5 lg:max-w-200"
			onClick={() => {
				router.push(`/post/${post.id}`);
			}}
		>
			<div className="flex items-center justify-between">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-card2 text-foreground overflow-hidden relative">
						{post.user.image ? (
							<>
								<Image
									src={post.user.image}
									alt={post.user.name}
									fill
									sizes="30x30"
									loading="eager"
								></Image>
							</>
						) : (
							<>
								<User size={20} />
							</>
						)}
					</div>

					<div className="flex min-w-0 flex-col items-start leading-tight">
						<h2 className="text-sm font-semibold tracking-tight">
							{post.user.name}
						</h2>

						<p className="text-xs text-foreground/60 tracking-wide">
							{post.createdAt.getFullYear() +
								"/" +
								post.createdAt.getMonth() +
								"/" +
								post.createdAt.getDate()}
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
				<button
					className={`flex min-h-10 items-center justify-center gap-2 rounded-xl px-2 text-sm font-medium transition   ${liked ? "text-primary hover:bg-primary-hover/10 font-bold" : "hover:bg-muted "}`}
					onClick={async (e) => {
						e.stopPropagation();
						e.preventDefault();
						if (!session?.user.id) {
							return;
						}
						const data = await ToggleLike(post.id, session.user.id);

						if (data) {
							await UpdateLiked();
						}
					}}
				>
					<ThumbsUp size={20} />
					<span className="hidden sm:inline">Like{liked ? "d" : ""} </span>
				</button>

				<button
					className="flex min-h-10 items-center justify-center gap-2 rounded-xl px-2 text-sm font-medium transition hover:bg-muted"
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						setCommentsBoards(true);
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

			{CommentsBoard && (
				<section
					className="fixed inset-0 z-50 flex items-center justify-center bg-background/55 px-4 backdrop-blur-sm "
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
					}}
				>
					<div
						className="relative flex h-[min(34rem,88vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/10 animate-[PopIn_50ms_ease-in-out] overflow-x-hide overflow-y-scroll scrollbar-none"
						ref={CommentsBoardRef}
					>
						<div className="flex items-center justify-between border-b border-border px-4 py-3">
							<span className="text-sm font-semibold">Comments</span>

							<button
								onClick={(e) => {
									setCommentsBoards(null);
								}}
								className="rounded-xl p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
								aria-label="Close comments"
							>
								<X size={18} />
							</button>
						</div>

						<div className="flex-1 overflow-y-auto scrollbar-none px-4 py-4">
							{comments?.length ? (
								<div className="flex flex-col gap-4">
									{comments.map((com) => (
										<div
											key={com.id}
											className="flex items-start gap-3 rounded-2xl border border-border bg-background/60 p-3"
										>
											<div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-card2">
												{com.user.image ? (
													<Image
														src={com.user.image}
														alt={com.user.name}
														fill
														loading="eager"
														sizes="44px"
														className="object-cover"
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center text-muted-foreground">
														<User size={18} />
													</div>
												)}
											</div>

											<div className="flex min-w-0 flex-1 flex-col">
												<div className="flex items-center gap-2">
													<span className="truncate text-sm font-semibold text-foreground">
														{com.user.name}
													</span>

													<span className="text-xs text-muted-foreground">
														{new Date(com.createdAt).toLocaleDateString()}
													</span>
												</div>

												<p className="mt-1 wrap-break-word text-sm leading-relaxed text-foreground/85">
													{com.content}
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="flex h-full items-center justify-center text-sm text-muted-foreground">
									No comments yet.
								</div>
							)}
						</div>

						<div className="border-t border-border p-3">
							<form
								className=""
								action={async () => {
									try {
										setSendPending(true);
										const text = InputRef.current?.value;
										if (
											!text ||
											text.trim().length < 1 ||
											!InputRef.current?.value ||
											!session?.user.id
										) {
											return;
										}
										const data = await comment(post, session.user.id, text);

										if (data) {
											InputRef.current.value = "";
										}
									} finally {
										setSendPending(false);
										UpdateComments();
									}
								}}
							>
								<div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 transition focus-within:border-primary/60 focus-within:ring-4 focus-within:ring-primary/6">
									<input
										type="text"
										placeholder="Write a comment..."
										className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
										ref={InputRef}
									/>

									<button
										className="rounded-lg p-2 text-primary transition hover:bg-primary/10"
										type="submit"
									>
										{SendPending ? (
											<>
												<EllipsisIcon size={18} />
											</>
										) : (
											<>
												<SendHorizontal size={18} />
											</>
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>
			)}
		</div>
	);
}

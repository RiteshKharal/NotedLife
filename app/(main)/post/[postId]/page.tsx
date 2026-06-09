"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
	ArrowLeft,
	Bookmark,
	ChevronLeft,
	ChevronRight,
	EllipsisIcon,
	MessageCircle,
	Send,
	SendHorizontal,
	ThumbsUp,
	User,
} from "lucide-react";

import { FetchPostById } from "@/app/actions";
import {
	CheckLike,
	CheckSave,
	FetchComments,
	ToggleLike,
	ToggleSave,
	comment,
} from "@/app/actions/PostActions";
import { GetSession } from "@/app/actions/session";
import { CommentType, PostType } from "@/app/types/post";

const COMMENTS_TO_FETCH = 10;

function formatDate(value: Date | string) {
	return new Intl.DateTimeFormat(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(value));
}

export default function Page() {
	const router = useRouter();
	const params = useParams<{ postId: string }>();
	const postId = params.postId;
	const session = GetSession();

	const commentInputRef = useRef<HTMLInputElement | null>(null);
	const [post, setPost] = useState<PostType | null>();
	const [comments, setComments] = useState<CommentType[]>([]);
	const [commentsLoading, setCommentsLoading] = useState(false);
	const [sendPending, setSendPending] = useState(false);
	const [likePending, setLikePending] = useState(false);
	const [liked, setLiked] = useState(false);
	const [currentImgIndex, setCurrentImgIndex] = useState(0);
	const [shareCopied, setShareCopied] = useState(false);
	const [saved, setSaved] = useState(false);

	const createdDate = useMemo(() => {
		return post ? formatDate(post.createdAt) : "";
	}, [post]);

	useEffect(() => {
		let active = true;

		async function loadPost() {
			setPost(undefined);
			const data = await FetchPostById(postId);

			if (active) {
				setPost(data);
				setCurrentImgIndex(0);
			}
		}

		loadPost();

		return () => {
			active = false;
		};
	}, [postId]);

	useEffect(() => {
		let active = true;

		async function loadComments() {
			if (!post) return;
			setCommentsLoading(true);
			const data = await FetchComments(post.id, COMMENTS_TO_FETCH);

			if (active) {
				setComments(data);
				setCommentsLoading(false);
			}
		}

		loadComments();

		return () => {
			active = false;
		};
	}, [post]);

	useEffect(() => {
		if (!post || !session?.user.id) return;

		let active = true;

		CheckLike(post.id, session.user.id).then((data) => {
			if (active) {
				setLiked(Boolean(data));
			}
		});

		return () => {
			active = false;
		};
	}, [post, session?.user.id]);

	useEffect(() => {
		if (!post || !session?.user) return;
		let active = true;

		CheckSave(post.id, session.user.id).then((data) => {
			if (active) {
				setSaved(Boolean(data));
			}
		});

		return () => {
			active = false;
		};
	}, [post, session?.user]);

	async function updateComments() {
		if (!post) return;

		setCommentsLoading(true);
		const newData = await FetchComments(post.id, COMMENTS_TO_FETCH);
		setComments(newData);
		setCommentsLoading(false);
	}

	async function handleLike() {
		if (!post || !session?.user.id || likePending) return;

		try {
			setLikePending(true);
			setLiked((current) => !current);
			const data = await ToggleLike(post.id, session.user.id);

			if (!data) {
				setLiked((current) => !current);
			}
		} finally {
			setLikePending(false);
		}
	}

	async function handleCommentSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const text = commentInputRef.current?.value.trim() ?? "";
		if (!post || !session?.user.id || text.length < 1 || sendPending) return;

		try {
			setSendPending(true);
			const data = await comment(post, session.user.id, text);

			if (data) {
				setComments((current) =>
					[data, ...current].slice(0, COMMENTS_TO_FETCH),
				);

				if (commentInputRef.current) {
					commentInputRef.current.value = "";
				}
			}
		} finally {
			setSendPending(false);
		}
	}

	async function UpdateSave() {
		if (!session?.user.id || !post) return;

		const exists = await CheckSave(post.id, session.user.id);

		if (exists) {
			setSaved(true);
		} else {
			setSaved(false);
		}
	}

	function nextSlide() {
		if (!post?.media.length) return;

		setCurrentImgIndex((prev) =>
			prev === post.media.length - 1 ? 0 : prev + 1,
		);
	}

	function prevSlide() {
		if (!post?.media.length) return;

		setCurrentImgIndex((prev) =>
			prev === 0 ? post.media.length - 1 : prev - 1,
		);
	}

	async function handleShare() {
		if (typeof window === "undefined") return;

		const url = window.location.href;

		if (navigator.share) {
			await navigator.share({ title: "NotedLife post", url });
			return;
		}

		await navigator.clipboard.writeText(url);
		setShareCopied(true);
		window.setTimeout(() => setShareCopied(false), 1800);
	}

	if (typeof post === "undefined") {
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

	if (!post) {
		return (
			<div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
				<div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
					<h1 className="text-lg font-semibold tracking-tight">
						This post is not available
					</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						It may have been deleted or the link may be incorrect.
					</p>
					<button
						className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-background transition hover:bg-primary-hover"
						onClick={() => router.push("/")}
					>
						<ArrowLeft size={17} />
						Back to feed
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col gap-4 px-10 py-5 sm:px-6 lg:px-8 overflow-scroll scrollbar-none max-h-screen ">
			<div className="flex items-center justify-between gap-3">
				<button
					className="inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
					onClick={() => router.back()}
				>
					<ArrowLeft size={17} />
					Back
				</button>
			</div>

			<article className="mx-10">
				<section className="bg-card rounded-2xl border border-border shadow-sm">
					<header className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
						<div className="flex min-w-0 items-center gap-3">
							<div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-card2 text-foreground">
								{post.user.image ? (
									<Image
										src={post.user.image}
										alt={post.user.name}
										fill
										sizes="48px"
										loading="eager"
										className="object-cover"
									/>
								) : (
									<User size={21} />
								)}
							</div>

							<div className="min-w-0">
								<h1 className="truncate text-base font-semibold tracking-tight">
									{post.user.name}
								</h1>
								<p className="text-xs font-medium text-muted-foreground">
									Posted {createdDate}
								</p>
							</div>
						</div>

						<button
							className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
							aria-label="More post options"
						>
							<EllipsisIcon size={20} />
						</button>
					</header>

					{post.description && (
						<div className="px-4 py-4 sm:px-5">
							<p className="whitespace-pre-wrap text-[15px] font-medium leading-relaxed text-foreground/90">
								{post.description}
							</p>
						</div>
					)}

					{post.media.length > 0 && (
						<div className="relative w-full bg-background">
							<div className="relative h-[min(68vh,42rem)] min-h-72 w-full overflow-hidden sm:min-h-96">
								<div
									className="flex h-full w-full transition-transform duration-300 ease-out"
									style={{
										transform: `translateX(-${currentImgIndex * 100}%)`,
									}}
								>
									{post.media.map((img, idx) => (
										<div key={img} className="relative h-full w-full shrink-0">
											<Image
												src={img}
												alt={`Post media ${idx + 1}`}
												fill
												sizes="(max-width: 1024px) 100vw, 960px"
												loading={idx === 0 ? "eager" : "lazy"}
												className="object-contain"
											/>
										</div>
									))}
								</div>
							</div>

							{post.media.length > 1 && (
								<>
									<button
										onClick={prevSlide}
										className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
										aria-label="Previous image"
									>
										<ChevronLeft size={22} />
									</button>
									<button
										onClick={nextSlide}
										className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:bg-black/65"
										aria-label="Next image"
									>
										<ChevronRight size={22} />
									</button>

									<div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/45 px-2 py-1 backdrop-blur">
										{post.media.map((_, idx) => (
											<button
												key={idx}
												className={`h-2 rounded-full transition-all ${
													idx === currentImgIndex
														? "w-5 bg-white"
														: "w-2 bg-white/55 hover:bg-white/80"
												}`}
												onClick={() => setCurrentImgIndex(idx)}
												aria-label={`Show image ${idx + 1}`}
											/>
										))}
									</div>
								</>
							)}
						</div>
					)}

					<div className="grid grid-cols-4 items-center border-y border-border rounded-2xl bg-card px-2 py-3 sm:px-4">
						<button
							className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
								liked
									? "text-primary hover:bg-primary/10"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							}`}
							onClick={handleLike}
							disabled={!session?.user.id || likePending}
							aria-pressed={liked}
						>
							<ThumbsUp size={20} />
							<span className="hidden sm:inline">
								{liked ? "Liked" : "Like"}
							</span>
						</button>

						<button
							className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
							onClick={() => {
								commentInputRef.current?.focus();
							}}
						>
							<MessageCircle size={20} />
							<span className="hidden sm:inline">Comment</span>
						</button>

						<button
							className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground ${saved ? "text-saved" : ""}`}
							onClick={async (e) => {
								e.stopPropagation();
								e.preventDefault();

								if (!session?.user) return;

								await ToggleSave(post.id, session?.user.id);

								UpdateSave();
							}}
						>
							<Bookmark size={20} />
							<span className="hidden sm:inline">
								{saved ? "Saved" : "Save"}
							</span>
						</button>

						<button
							className="flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
							onClick={handleShare}
						>
							<Send size={20} />
							<span className="hidden sm:inline">
								{shareCopied ? "Copied" : "Share"}
							</span>
						</button>
					</div>
				</section>

				<section className="grid gap-4 px-4 py-4 sm:px-5 ">
					<form
						className="rounded-xl bg-background/70 p-2 "
						onSubmit={handleCommentSubmit}
					>
						<div className=" flex items-center gap-2 rounded-lg border border-border bg-card py-2 pl-3 pr-1.5 transition focus-within:border-primary/6 focus-within:ring-4 focus-within:ring-primary/10">
							<input
								id="comment"
								type="text"
								placeholder={
									session?.user.id ? "Write a comment..." : "Sign in to comment"
								}
								className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
								ref={commentInputRef}
								disabled={!session?.user.id || sendPending}
							/>

							<button
								className="flex h-9 w-9 items-center justify-center rounded-lg text-primary transition hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
								type="submit"
								disabled={!session?.user.id || sendPending}
								aria-label="Send comment"
							>
								{sendPending ? (
									<EllipsisIcon size={17} className="animate-pulse" />
								) : (
									<SendHorizontal size={17} />
								)}
							</button>
						</div>
					</form>
					<div className="flex min-w-0 flex-col gap-3">
						<div className="flex items-center justify-between gap-3">
							<h2 className="text-sm font-semibold tracking-tight">
								Comments
								{/* <span className="ml-2 text-muted-foreground">
									{comments.length}
								</span> */}
							</h2>

							<button
								className="text-xs font-semibold text-primary transition hover:text-primary-hover disabled:text-muted-foreground"
								onClick={updateComments}
								disabled={commentsLoading}
							>
								Refresh
							</button>
						</div>

						<div className="pr-1">
							{commentsLoading && comments.length === 0 ? (
								<div className="space-y-3">
									{[0, 1, 2].map((item) => (
										<div
											key={item}
											className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/60 p-3"
										>
											<div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-muted" />
											<div className="w-full space-y-2">
												<div className="h-3 w-28 animate-pulse rounded bg-muted" />
												<div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
											</div>
										</div>
									))}
								</div>
							) : comments.length ? (
								<div className="flex flex-col gap-3">
									{comments.map((com) => (
										<div
											key={com.id}
											className="flex items-start gap-3 rounded-xl border border-border/20 bg-background/60 p-3 transition hover:bg-muted/10"
										>
											<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-card2">
												{com.user.image ? (
													<Image
														src={com.user.image}
														alt={com.user.name}
														fill
														loading="lazy"
														sizes="40px"
														className="object-cover"
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center text-muted-foreground">
														<User size={16} />
													</div>
												)}
											</div>

											<div className="min-w-0 flex-1">
												<div className="flex items-baseline gap-3">
													<span className="truncate text-md font-semibold">
														{com.user.name}
													</span>
													<span className="shrink-0 text-xs text-muted-foreground">
														{formatDate(com.createdAt)}
													</span>
												</div>

												<p className="mt-1 whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-foreground/85">
													{com.content}
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<div className="flex min-h-32 items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-4 text-center text-sm text-muted-foreground">
									No comments yet. Start the conversation.
								</div>
							)}
						</div>
					</div>
				</section>
			</article>
		</div>
	);
}

"use client";
import { Plus, Send, User, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UserPost } from "@/app/actions/MakePost";
import { GetSession } from "@/app/actions/session";
import { useRouter } from "next/navigation";

export default function Page() {
	const [images, setImages] = useState<File[]>([]);
	const [imagePreviews, setImagePreviews] = useState<string[]>([]);
	const ImageInputRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);
	const router = useRouter();

	const { session } = GetSession();

	useEffect(() => {
		const urls = images.map((img) => URL.createObjectURL(img));
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setImagePreviews(urls);

		return () => {
			urls.forEach((url) => URL.revokeObjectURL(url));
		};
	}, [images]);

	return (
		<div className="w-full px-4 py-6 sm:px-6 lg:px-8">
			<form
				className="mx-auto w-full max-w-2xl"
				action={async (formdata: FormData) => {
					setPending(true);
					try {
						if (!session?.user) {
							setError("Sign in to make a post!");
							return;
						}

						await UserPost(
							formdata.get("description") as string,
							images,
							(er) => setError(er),
						);
					} finally {
						setPending(false);
						router.push("/");
					}
				}}
			>
				<div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm shadow-black/2.5">
					<div className="flex items-center gap-3 border-b border-border px-4 py-4 sm:px-5">
						<div className="flex h-11 w-11 items-center justify-center rounded-full bg-card2 text-muted-foreground ring-1 ring-border overflow-hidden relative">
							{session?.user.image ? (
								<Image
									src={session.user.image}
									alt={session.user.name}
									fill
									loading="eager"
									sizes="30x30"
								/>
							) : (
								<User size={20} />
							)}
						</div>

						<div className="flex flex-col items-start leading-tight">
							<h2 className="text-sm font-semibold tracking-tight">
								{session?.user.name}
							</h2>
							<p className="mt-1 text-xs text-muted-foreground">
								Create a new post
							</p>
						</div>
					</div>

					<div className="px-4 py-4 sm:px-5">
						<textarea
							className="min-h-28 w-full resize-none bg-transparent text-[15px] font-medium leading-relaxed text-foreground/90 outline-none placeholder:text-muted-foreground"
							placeholder="What would you like to share?"
							name="description"
						/>
					</div>

					<div className="mx-4 mb-4 grid min-h-80 overflow-hidden rounded-2xl border border-border bg-background sm:mx-5 sm:grid-cols-[0.85fr_1.15fr]">
						<label className="group flex min-h-52 cursor-pointer items-center justify-center border-b border-border bg-muted/30 transition hover:bg-muted/60 sm:border-b-0 sm:border-r">
							<input
								type="file"
								multiple
								ref={ImageInputRef}
								accept="image/*"
								className="hidden"
								onChange={(e) => {
									const files = e.target.files;
									if (!files) return;
									setImages((prev) => [...prev, ...Array.from(files)]);
								}}
							/>

							<div className="flex flex-col items-center gap-2 text-muted-foreground transition group-hover:text-foreground">
								<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card ring-1 ring-border">
									<Plus className="h-6 w-6" />
								</div>
								<p className="text-sm font-semibold">Add images</p>
							</div>
						</label>

						<div className="grid auto-rows-[10rem] grid-cols-2 gap-3 overflow-y-auto p-3">
							{imagePreviews.map((url, i) => (
								<div
									key={url}
									className="group relative overflow-hidden rounded-xl border border-border bg-muted"
								>
									<Image
										src={url}
										alt="preview"
										fill
										sizes="60x90"
										className="object-cover transition duration-300 group-hover:scale-105"
									/>

									<button
										type="button"
										className="absolute right-3 top-3 z-10 rounded-xl bg-background/85 p-2 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
										aria-label="Remove image"
										onClick={() => {
											setImages((prev) => prev.filter((_, ind) => ind !== i));
										}}
									>
										<X className="h-4 w-4" />
									</button>
								</div>
							))}
						</div>
					</div>

					{error && <div>{error}</div>}

					<div className="flex items-center justify-between gap-4 border-t border-border px-4 py-4 sm:px-5">
						<p className="text-sm text-muted-foreground">
							{images.length || "0"} image{images.length !== 1 && "s"} selected
						</p>

						<button
							type="submit"
							className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover active:scale-[0.99]"
						>
							{pending ? (
								<>Posting...</>
							) : (
								<>
									Publish
									<Send size={17} />
								</>
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

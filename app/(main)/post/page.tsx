"use client";
import * as fonts from "@/app/fonts";
import {
	Bookmark,
	EllipsisIcon,
	MessageCircle,
	Plus,
	Send,
	ThumbsUp,
	User,
	X,
} from "lucide-react";
import React, { useRef, useState } from "react";
import Image from "next/image";

export default function Page() {
	const [images, setImages] = useState<File[] | null>(null);
	const ImageInputRef = useRef<HTMLInputElement | null>(null);

	return (
		<div className="flex flex-col justify-center text-center items-center content-center h-full p-3 mb-10">
			<form
				action={(formdata: FormData) => {
					images?.map((img) => {
						formdata.append("image", img);
					});

					console.log([...formdata.entries()]);
				}}
			>
				<div className="border-2 border-border p-5 rounded-2xl scale-105 lg:w-210 md:w-70   mt-10">
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
					</div>

					<div className="mt-4 flex flex-col items-start text-left">
						<input
							className="text-[15px] font-medium leading-relaxed text-foreground/90 w-full  outline-none"
							placeholder="Type anything..."
							name="description"
						/>
					</div>

					<div className="grid grid-cols-[2fr_3fr] max-w-5xl w-full h-104 mt-4 rounded-2xl overflow-hidden border border-border bg-background shadow-sm">
						<label className="relative flex items-center justify-center cursor-pointer group bg-muted/20 hover:bg-muted/40 transition">
							<input
								type="file"
								multiple
								ref={ImageInputRef}
								accept="image/*"
								className="hidden"
								onChange={(e) => {
									const files = e.target.files;
									if (!files) return;
									setImages((prev) => [...(prev ?? []), ...Array.from(files)]);
								}}
							/>

							<div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-foreground transition">
								<Plus className="w-10 h-10" />
								<p className="text-sm">Click to add images</p>
							</div>
						</label>

						<div className="p-3 overflow-y-auto grid grid-cols-2 auto-rows-[10rem] gap-3">
							{images?.map((img, i) => (
								<div
									key={i}
									className="relative overflow-hidden rounded-xl border border-border group"
								>
									<Image
										src={URL.createObjectURL(img)}
										alt="preview"
										fill
										className="object-cover transition duration-300 group-hover:scale-105"
									/>

									<section
										className="bg-background/70 rounded-3xl hover:bg-background/50 z-2 absolute top-3 right-3 p-2"
										onClick={() => {
											setImages(
												images.filter((img, ind) => {
													return ind !== i;
												}),
											);
										}}
									>
										<X className="w-4 h-4" />
									</section>
								</div>
							))}
						</div>
					</div>

					<div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
						<p className="text-sm text-foreground/40">
							{images?.length || "0"} image{images?.length !== 1 && "s"}{" "}
							selected
						</p>

						<button
							type="submit"
							className="
									group relative overflow-hidden
									rounded-2xl px-7 py-3.5
									bg-primary font-semibold text-background
									shadow-[0_10px_40px_hsl(var(--primary)/0.15)]
									transition-all duration-300
									hover:-translate-y-0.5
									hover:shadow-[0_18px_20px_hsl(var(--primary)/0.05)]
									active:scale-[0.97]
								"
						>
							<div
								className="
										absolute inset-0 opacity-0 transition duration-300
										group-hover:opacity-100
										bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.18),transparent)]
									"
							/>

							<span
								className={`relative flex items-center gap-2 text-[15px] tracking-wide ${fonts.cabin.className}`}
							>
								Publish Post
								<Send
									size={17}
									className="transition group-hover:translate-x-1"
								/>
							</span>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

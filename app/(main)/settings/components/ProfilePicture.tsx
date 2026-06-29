"use client";

import React, { useRef, useState } from "react";
import { Camera, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { PostPfp } from "@/app/actions/PostPfp";
import { GetSession } from "@/app/actions/session";

type State = "idle" | "uploading";

export default function ProfilePicture() {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const { session } = GetSession();

	const [open, setOpen] = useState(false);
	const [state, setState] = useState<State>("idle");
	const [preview, setPreview] = useState<string | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const [error, setError] = useState<null | string>(null);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selected = e.target.files?.[0];
		if (!selected || !selected.type.startsWith("image/")) return;

		setFile(selected);

		const url = URL.createObjectURL(selected);
		setPreview(url);
	};

	const save = async () => {
		if (!file) return;
		const formdata = new FormData();
		formdata.append("file", file);

		setState("uploading");

		const { data, error } = await PostPfp(formdata);

		setState("idle");
		setOpen(false);
		setPreview(null);
		setFile(null);

		if (error) {
			setError(error);
			throw error;
		}
	};

	const close = () => {
		setOpen(false);
		setState("idle");
		setPreview(null);
		setFile(null);
	};

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className={`flex items-center gap-2 rounded-xl border border-border bg-linear-to-b from-card to-card/70 px-5 py-2.5 text-sm font-medium ${!session?.user && "cursor-not-allowed"}`}
			>
				<Camera size={16} />
				Change photo
			</button>

			<input
				ref={fileInputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={onChange}
			/>

			{open && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/4 backdrop-blur-md"
					onClick={(e) => e.target === e.currentTarget && close()}
				>
					<div className="w-full max-w-110 overflow-hidden rounded-2xl border border-border/60 bg-card">
						<div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
							<p className="text-sm font-semibold">Profile photo</p>

							<button onClick={close}>
								<X
									size={20}
									className="text-muted-foreground hover:text-foreground"
								/>
							</button>
						</div>

						<div className="flex flex-col items-center gap-6 px-6 py-8">
							<div
								onClick={() => fileInputRef.current?.click()}
								className="relative h-44 w-44 cursor-pointer overflow-hidden rounded-full border-2 border-border bg-linear-to-br from-card2/80 to-card"
							>
								{preview ? (
									<Image
										src={preview}
										alt="preview"
										fill
										className="object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center">
										<Camera
											size={56}
											className="text-muted-foreground/40"
											strokeWidth={1.2}
										/>
									</div>
								)}

								{state === "uploading" && (
									<div className="absolute inset-0 flex items-center justify-center bg-black/50">
										<Loader2 className="animate-spin text-white" size={32} />
									</div>
								)}
							</div>

							<p
								className={`text-xs ${error ? "text-danger font-bold" : "text-muted-foreground "}`}
							>
								{error ? error : "Upload an image"}
							</p>
						</div>

						<div className="flex gap-3 border-t border-border/40 px-6 py-4">
							<button
								onClick={close}
								className="flex-1 rounded-xl border px-4 py-3 text-sm hover:bg-muted"
							>
								Cancel
							</button>

							<button
								onClick={save}
								disabled={!file || state === "uploading"}
								className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm cursor-pointer text-primary-foreground hover:bg-primary-hover disabled:opacity-40  disabled:cursor-not-allowed "
							>
								{state === "uploading" ? (
									<Loader2 className="animate-spin" size={16} />
								) : (
									"Save"
								)}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

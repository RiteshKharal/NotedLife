"use client";

import { Bookmark, ImageIcon } from "lucide-react";

export default function Home() {
	return (
		<div className="w-full px-4 py-6 sm:px-6 lg:px-8">
			<div className="mx-auto flex max-w-5xl flex-col gap-6">
				<h1 className="text-2xl font-bold tracking-tight mb-4">Library</h1>

				<div className="mb-5 gap-4 border-b border-border pb-4 flex items-center">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
						<Bookmark size={19} />
					</div>
					<div>
						<h2 className="text-sm font-semibold">Saved media</h2>
						<p className="text-sm text-muted-foreground">0 items</p>
					</div>
				</div>

				<div className="grid min-h-72 place-items-center rounded-2xl  text-center">
					<div className="max-w-sm">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-card2 text-muted-foreground">
							<ImageIcon size={22} />
						</div>
						<h3 className="mt-4 text-sm font-semibold">No media saved</h3>
						<p className="mt-2 text-sm leading-6 text-muted-foreground">
							Posts you save from the feed will appear in this library.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

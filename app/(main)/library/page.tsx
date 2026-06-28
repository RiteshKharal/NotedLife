"use client";

import { FetchSaved } from "@/app/actions/SaveActions";
import { GetSession } from "@/app/actions/session";
import { PostCard, PostCardFull } from "@/app/components/PostCard";
import { useNotification } from "@/app/hooks/useGlobalNotification";
import { PostType } from "@/app/types/post";
import { Bookmark, ImageIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
	const session = GetSession();
	const [posts, setPosts] = useState<PostType[] | null>();
	const { notify } = useNotification();
	const [SessionLoaded, setSessionLoaded] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setSessionLoaded(Boolean(session?.user));
	}, [session?.user]);

	useEffect(() => {
		const load = async () => {
			if (!session?.user) {
				return;
			}

			try {
				const dt = await FetchSaved({ userId: session.user.id });

				setPosts(dt);
			} catch (e) {
				setPosts(null);
				notify({ message: "Could not fetch saved media" });
			}
		};

		load();
	}, [notify, session?.user]);

	if (SessionLoaded && !session?.user) {
		notify({ message: "Sign in to view saved media!" });
	}
	if (typeof posts === "undefined" || !session?.user) {
		return (
			<div className="max-h-screen min-h-screen h-full flex items-center justify-center">
				<div className="flex flex-col items-center gap-3">
					<Loader2 className="h-10 w-10 animate-spin rounded-full border-t-primary" />
					<p className="text-sm text-muted-foreground">Loading library...</p>
				</div>
			</div>
		);
	}

	if (!posts || posts.length < 1) {
		return (
			<div className=" h-screen flex items-center justify-center px-4 overflow-y-hidden w-full overflow-x-hidden">
				<div className="text-center max-w-sm">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
						<ImageIcon size={22} />
					</div>

					<h3 className="mt-4 text-base font-semibold">No saved posts</h3>

					<p className="mt-2 text-sm text-muted-foreground leading-6">
						Saved posts will appear here when you bookmark content.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-h-screen overflow-y-scroll scrollbar-none bg-background px-4 sm:px-6 lg:px-10 py-8">

			<div className="flex flex-col gap-5 items-center w-full">
				{posts?.map((post) => (
					<PostCardFull post={post} key={post.id} />
				))}
			</div>
		</div>
	);
}

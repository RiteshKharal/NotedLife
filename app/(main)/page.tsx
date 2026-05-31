"use client";

import { SendHorizonal, X } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { PostCard } from "../components/PostCard";
import { useSettleExit } from "../hooks/useSettleExit";
import { FetchPosts } from "../actions/FetchPosts";
import { PostType } from "../types/post";

export default function Home() {
	const [posts, setPosts] = useState<PostType[] | null>(null);

	async function UpdatePosts() {
		try {
			const Updated = await FetchPosts();
			setPosts(Updated);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		UpdatePosts();
	}, []);

	return (
		<section className="flex w-full flex-1 justify-center px-4 py-6 sm:px-6 lg:px-8 overflow-x-hidden overflow-y-scroll scrollbar-none max-h-screen">
			<section className="flex w-full max-w-210 flex-col gap-4 ">
				{posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
			</section>
		</section>
	);
}

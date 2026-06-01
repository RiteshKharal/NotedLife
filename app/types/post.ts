export type PostType = {
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

	// likes: LikeType[];
};

export type LikeType = {
	id: string;
	createdAt: Date;
	userId: string;
	postId: string;
};

export type CommentType = {
	user: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		name: string;
		email: string;
		image: string | null;
		emailVerified: boolean;
	};

	id: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	postId: string;
};

"use client";

import { useEffect, useState } from "react";
import { AuthClient } from "@/lib/auth-client";

type SessionType = {
	user: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		email: string;
		emailVerified: boolean;
		name: string;
		image?: string | null;
	};
	session: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		userId: string;
		expiresAt: Date;
		token: string;
		ipAddress?: string | null;
		userAgent?: string | null;
	};
} | null;

export function GetSession() {
	const [session, setSession] = useState<SessionType>(null);
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		let active = true;

		AuthClient.getSession()
			.then(({ data }) => {
				if (active) {
					setSession(data);
				}
			})
			.catch(() => {
				if (active) {
					setSession(null);
				}
			})
			.finally(() => {
				if (active) {
					setIsPending(false);
				}
			});

		return () => {
			active = false;
		};
	}, []);

	return { session, isPending };
}

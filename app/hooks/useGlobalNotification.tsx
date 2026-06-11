"use client";

import {
	createContext,
	useContext,
	useState,
	ReactNode,
} from "react";
import { X } from "lucide-react";

type Notification = {
	id: string;
	message: string;
	color?: string;
	duration?: number;
};

type NotificationContextType = {
	notify: (options: Omit<Notification, "id">) => void;
};

const NotificationContext =
	createContext<NotificationContextType | null>(null);

export function NotificationProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [notifications, setNotifications] = useState<
		Notification[]
	>([]);

	const notify = ({
		message,
		color = "bg-red-500",
		duration = 3000,
	}: Omit<Notification, "id">) => {
		const id = crypto.randomUUID();

		setNotifications((prev) => [
			...prev,
			{
				id,
				message,
				color,
				duration,
			},
		]);

		setTimeout(() => {
			setNotifications((prev) =>
				prev.filter((n) => n.id !== id)
			);
		}, duration);
	};

	const remove = (id: string) => {
		setNotifications((prev) =>
			prev.filter((n) => n.id !== id)
		);
	};

	return (
		<NotificationContext.Provider value={{ notify }}>
			{children}

			<div className="fixed top-5 right-5 z-50 flex flex-col gap-3">
				{notifications.map((notification) => (
					<div
						key={notification.id}
						className={`${notification.color} min-w-80 rounded-xl px-4 py-3 text-white shadow-lg animate-in slide-in-from-right`}
					>
						<div className="flex items-center gap-3">
							<p className="flex-1">
								{notification.message}
							</p>

							<button
								onClick={() =>
									remove(notification.id)
								}
							>
								<X size={18} />
							</button>
						</div>
					</div >
				))}
			</div>
		</NotificationContext.Provider>
	);
}

export function useNotification() {
	const context = useContext(NotificationContext);

	if (!context) {
		throw new Error(
			"useNotification must be used inside NotificationProvider"
		);
	}

	return context;
}
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [exiting, setExiting] = useState<Record<string, boolean>>({});

	const notify = ({
		message,
		color = "bg-zinc-900",
		duration = 3000,
	}: Omit<Notification, "id">) => {
		const id = crypto.randomUUID();

		setNotifications((p) => [...p, { id, message, color, duration }]);

		setTimeout(() => remove(id), duration);
	};

	const remove = (id: string) => {
		setExiting((p) => ({ ...p, [id]: true }));

		setTimeout(() => {
			setNotifications((p) => p.filter((n) => n.id !== id));
			setExiting((p) => {
				const c = { ...p };
				delete c[id];
				return c;
			});
		}, 200);
	};

	return (
		<NotificationContext.Provider value={{ notify }}>
			{children}

			<div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
				{notifications.map((n) => (
					<div
						key={n.id}
						className={`
							${n.color}
							w-180 max-w-[95vw]
							overflow-hidden rounded-xl
							border border-border
							backdrop-blur-xl shadow-xl
							transition-all duration-200
							hover:bg-muted/50
							${
								exiting[n.id]
									? "opacity-0 -translate-y-4 scale-95"
									: "opacity-100 translate-y-0 scale-100"
							}
						`}
						onClick={() => {
							remove(n.id);
						}}
					>
						<div className="flex items-center gap-3 px-4 py-3">
							<div className="h-2 w-2 rounded-full bg-white" />

							<p className="flex-1 text-sm text-white font-medium">
								{n.message}
							</p>

							<button
								onClick={() => remove(n.id)}
								className="p-1.5 hover:bg-white/10 rounded-md"
							>
								<X size={16} />
							</button>
						</div>
					</div>
				))}
			</div>
		</NotificationContext.Provider>
	);
}

export function useNotification() {
	const ctx = useContext(NotificationContext);
	if (!ctx) throw new Error("useNotification must be used inside provider");
	return ctx;
}

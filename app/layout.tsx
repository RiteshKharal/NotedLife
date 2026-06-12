import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviderWrapper } from "./providers/ThemeProvider";
import { NotificationProvider } from "./hooks/useGlobalNotification";

export const metadata: Metadata = {
	title: "NotedLife",
	description: "A beautiful workspace for notes, rituals, and ideas.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className="h-full antialiased"
			suppressHydrationWarning
			data-scroll-behavior="smooth"
		>
			<body className="min-h-full flex flex-col">
				<ThemeProviderWrapper>
					<NotificationProvider>{children}</NotificationProvider>
				</ThemeProviderWrapper>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviderWrapper } from "./providers/ThemeProvider";

export const metadata: Metadata = {
	title: "NoteLife",
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
				<ThemeProviderWrapper>{children}</ThemeProviderWrapper>
			</body>
		</html>
	);
}

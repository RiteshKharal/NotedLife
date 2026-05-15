import {
	Bell,
	BookOpenText,
	CalendarDays,
	CheckCircle2,
	ChevronRight,
	Clock3,
	Compass,
	Flame,
	FolderKanban,
	GalleryHorizontalEnd,
	MessageCircle,
	Mic2,
	NotebookPenIcon,
	PenLine,
	Plus,
	Search,
	Send,
	Sparkles,
	Star,
	ThumbsUp,
	TrendingUp,
	User,
} from "lucide-react";
import Image from "next/image";

import { ThemeToggle } from "./components/ThemeToggle";

const navItems = [
	{ label: "Today", icon: Compass, active: true },
	{ label: "Library", icon: BookOpenText },
	{ label: "Projects", icon: FolderKanban },
	{ label: "Media", icon: GalleryHorizontalEnd },
];

export default function Home() {
	return (
		<main className="min-h-screen overflow-hidden bg-[#f7f1e7] text-[#201a16] dark:bg-[#101316] dark:text-[#f7efe5]">
			<div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(238,90,70,0.18),transparent_30%),radial-gradient(circle_at_80%_8%,rgba(58,147,139,0.22),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.76),rgba(242,229,206,0.62))] dark:bg-[radial-gradient(circle_at_16%_16%,rgba(238,90,70,0.2),transparent_30%),radial-gradient(circle_at_78%_4%,rgba(74,170,157,0.2),transparent_30%),linear-gradient(135deg,rgba(17,20,23,0.92),rgba(31,32,30,0.84))]" />

			<section className="mx-auto grid min-h-screen w-full max-w-360 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)]">
				<aside className="hidden border-r border-[#2f2419]/10 bg-[#fffaf0]/70 px-5 py-6 backdrop-blur-xl dark:border-white/10 dark:bg-[#15191b]/72 lg:block">
					<div className="flex items-center gap-3">
						<div className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#243d3a] text-[#f6c35f] shadow-lg shadow-[#243d3a]/20">
							<NotebookPenIcon size={22} className="-rotate-20" />
						</div>
						<div>
							<p className="text-lg font-black leading-none tracking-[0.08em]">
								NotedLife
							</p>
						</div>
					</div>

					<nav className="mt-7 space-y-2">
						{navItems.map((item) => (
							<button
								key={item.label}
								className={`flex h-12 w-full items-center justify-between rounded-[8px] px-3 text-sm font-bold transition ${
									item.active
										? "bg-[#ca8a00] text-white shadow-lg shadow-[#ef5a46]/20"
										: "text-[#5f4c41] hover:bg-[#fff4df] dark:text-[#cfc3b7] dark:hover:bg-white/8"
								}`}
							>
								<span className="flex items-center gap-3">
									<item.icon size={19} />
									{item.label}
								</span>
								{item.active ? <ChevronRight size={17} /> : null}
							</button>
						))}
					</nav>

					<div className="mt-8 border-t border-[#2f2419]/10 pt-6 dark:border-white/10">
						<p className="text-xs font-bold uppercase tracking-[0.18em] text-[#806a58] dark:text-[#b7a99d]">
							Spaces
						</p>
						<div className="mt-4 space-y-3 text-sm font-semibold">
							<button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-[#4c3c33] hover:bg-[#fff4df] dark:text-[#d9cec2] dark:hover:bg-white/8">
								Personal
							</button>

							<button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-[#4c3c33] hover:bg-[#fff4df] dark:text-[#d9cec2] dark:hover:bg-white/8">
								Groups
							</button>

							<button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-[#4c3c33] hover:bg-[#fff4df] dark:text-[#d9cec2] dark:hover:bg-white/8">
								Settings
							</button>
						</div>
					</div>
				</aside>

				<div className="flex min-w-0 flex-col">
					<header className="sticky top-0 z-20 border-b border-[#2f2419]/10 bg-[#f7f1e7]/82 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#101316]/80 sm:px-6">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#243d3a] text-[#f6c35f] lg:hidden">
								<Sparkles size={20} />
							</div>

							<label className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-lg border border-[#2f2419]/10 bg-white/76 px-3 text-sm shadow-sm dark:border-white/10 dark:bg-white/8">
								<Search size={18} className="shrink-0 text-[#7f6a59]" />
								<input
									type="text"
									placeholder="Search anything..."
									className="min-w-0 flex-1 bg-transparent font-semibold outline-none placeholder:text-[#8a7766] dark:placeholder:text-[#b6aa9e]"
								/>
							</label>

							<button className="hidden h-11 items-center gap-2 rounded-lg bg-[#201a16] px-4 text-sm font-bold text-[#fff7e8] shadow-lg shadow-[#201a16]/15 transition hover:-translate-y-0.5 dark:bg-[#f7efe5] dark:text-[#15191b] sm:flex">
								<Plus size={18} />
								New post
							</button>

							<button className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#2f2419]/10 bg-white/76 shadow-sm dark:border-white/10 dark:bg-white/8">
								<Bell size={19} />
							</button>

							<ThemeToggle />
						</div>
					</header>

					<section className="flex w-full flex-1 justify-center px-4 py-6">
						<article className="w-full  overflow-hidden rounded-3xl border border-card-light bg-card p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-card-dark text-foreground">
										<User size={20} />
									</div>

									<div className="flex flex-col items-start leading-tight">
										<h2 className="text-sm font-semibold tracking-tight">
											Guest
										</h2>

										<p className="text-xs text-foreground/60">2 hours ago</p>
									</div>
								</div>

								<button className="rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10">
									•••
								</button>
							</div>

							<div className="mt-4 flex flex-col items-start text-left">
								<p className="text-[15px] font-medium leading-relaxed text-foreground/90">
									My sister! 📸
								</p>
							</div>

							<div className="mt-4 overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
								<Image
									src="/ishowspeed.jpg"
									alt="Post image"
									width={900}
									height={900}
									className="h-auto max-h-125 w-full object-cover transition duration-300 hover:scale-[1.015]"
								/>
							</div>

							<div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 dark:border-white/10">
								<button className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/10">
									<ThumbsUp size={20}/> Like
								</button>

								<button className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/10">
								<MessageCircle size={20}/> Comment
								</button>

								<button className="flex flex-1 flex-row gap-2 items-center justify-center rounded-xl py-2 text-sm font-medium transition hover:bg-black/5 dark:hover:bg-white/10">
									<Send size={20}/> Share
								</button>
							</div>
						</article>
					</section>
				</div>
			</section>
		</main>
	);
}

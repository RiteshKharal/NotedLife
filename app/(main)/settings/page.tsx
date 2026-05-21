"use client";
import React from "react";
import * as fonts from "@/app/fonts";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export default function Page() {
	return (
		<div className="flex flex-col p-7 px-15 text-xl gap-10">
			<section className={`${fonts.cabin.className} text-3xl font-bold`}>
				Settings
			</section>
			<section className={`${fonts.exo2.className} mt-6`}>
				<div className="flex justify-between">
					<span className="">Theme</span>
					<span>
						<ThemeToggle />
					</span>
				</div>
			</section>
		</div>
	);
}

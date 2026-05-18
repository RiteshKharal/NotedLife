"use client";

import { SendHorizonal, X } from "lucide-react";

import { useRef, useState } from "react";
import * as fonts from "@/app/fonts";

export default function Home() {
	

	return (
		<div className="flex w-full flex-1  px-4 py-6 flex-col gap-7 items-center p-3">
            <span className={`${fonts.cabin.className} opacity-50 text-left w-full border-b-3 border-border py-3`}>Saved media</span>

            <div className={`${fonts.inconsolata.className} mt-10 text-left w-full flex flex-col`}>
                <span className="opacity-55">No media saved</span>
            </div>
        </div>
	);
}

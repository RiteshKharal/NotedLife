"use client";

import React, { useEffect } from "react";

export function useSettleExit(
	ContainerRef: React.RefObject<HTMLElement | null>,
	OnAction: () => void,
) {
	useEffect(() => {
		const event = (ev: MouseEvent) => {
			if (
				ContainerRef &&
				ContainerRef.current &&
				!ContainerRef.current.contains(ev.target as Node)
			) {
				OnAction();
			}
		};

		document.addEventListener("mousedown", event);
      
		return () => {
			document.removeEventListener("mousedown", event);
		};
	}, []);
}

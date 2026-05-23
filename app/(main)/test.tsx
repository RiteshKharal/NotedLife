"use server";

import { prisma } from "@/lib/prisma";
import React from "react";

export async function Test() {
	const q = await prisma.user.findMany();
  
  console.log("prisma: ",q)
}

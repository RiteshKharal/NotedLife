import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { dash } from "@better-auth/infra";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
	
	emailAndPassword: {
		enabled: true,
	},
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	plugins:[
		dash()
	]
});

import { PrismaClient } from "@prisma/client";
import { userSeeder } from "./user.seeder";
import { storeSeeder } from "./store.seeder";
import { couponSeeder } from "./coupon.seeder";
import { lotterySeeder } from "./lottery.seeder";

async function seed() {
    const prismaService = new PrismaClient();
    const usersCount = await prismaService.user.count();

    if (usersCount > 0) {
        console.log('Seed: [SKIPED]');
        return;
    }

    console.log('Seed: [RUNNING]');

    await userSeeder(prismaService);
    await storeSeeder(prismaService);
    await lotterySeeder(prismaService);
    await couponSeeder(prismaService);

    console.log('Seed: [DONE]');

    await prismaService.$disconnect();
}

seed();
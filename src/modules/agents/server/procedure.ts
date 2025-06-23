import { db } from '@/db';
import { agents } from '@/db/schema';
import { createTRPCRouter, baseProcedure } from '@/trpc/init';

export const agentsProcedure = createTRPCRouter({
        getMany: baseProcedure.query(async () => {
                const data = await db.select().from(agents);

                return data;
        }),
});

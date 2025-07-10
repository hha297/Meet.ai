import { meetingsProcedure } from '@/modules/meetings/server/procedure';
import { createTRPCRouter } from '../init';
import { agentsProcedure } from '@/modules/agents/server/procedure';
import { premiumRouter } from '@/modules/premium/server/procedure';
export const appRouter = createTRPCRouter({
        agents: agentsProcedure,
        meetings: meetingsProcedure,
        premium: premiumRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

import { createTRPCRouter } from '../init';
import { agentsProcedure } from '@/modules/agents/server/procedure';
export const appRouter = createTRPCRouter({
        agents: agentsProcedure,
});
// export type definition of API
export type AppRouter = typeof appRouter;

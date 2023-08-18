
import { publicProcedure, router } from '@/lib/trpc';
import { circleRouter } from './circle';
 
export const appRouter = router({
   health: publicProcedure.query(() => 'ok'),
   circle: circleRouter
});
 
// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
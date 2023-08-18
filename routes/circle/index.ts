import { router } from "@/lib/trpc";
import { publicProcedure } from '../../lib/trpc';
import { z } from "zod";
 
export const circleRouter = router({
    html: publicProcedure.meta({
        openapi: {
          method: 'GET',
          path: '/circle/html',
          tags: ['circle'],
          summary: 'Get html by url',
        },
      }).input(z.object({
        url: z.string(),
    })).output(z.string()).query(() => {
        return 'asdasdasdas'
    }),
})
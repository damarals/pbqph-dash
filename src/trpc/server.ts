import { headers } from 'next/headers'
import { type AppRouter } from '@/server/api/root'
import {
  createTRPCProxyClient,
  loggerLink,
  // eslint-disable-next-line camelcase
  unstable_httpBatchStreamLink,
} from '@trpc/client'

import { getUrl, transformer } from './shared'

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === 'development' ||
        (op.direction === 'down' && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      url: getUrl(),
      headers() {
        const heads = new Map(headers())
        heads.set('x-trpc-source', 'rsc')
        return Object.fromEntries(heads)
      },
    }),
  ],
})
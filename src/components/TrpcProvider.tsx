"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TRPCClientError, httpBatchLink, loggerLink } from "@trpc/client"

import { useConstant } from "@utils/hooks/useConstant"
import { trpc } from "@utils/trpc"

import { FCC } from "@typings/FCC"

export const TrpcProvider: FCC = ({ children }) => {
	const queryClient = useConstant(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry(failureCount, error): boolean {
							return !(
								error instanceof TRPCClientError &&
								error.data?.httpStatus
							)
						},
					},
				},
			}),
	)
	const trpcClient = useConstant(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: () => true,
				}),
				httpBatchLink({
					url: "/api/trpc",
				}),
			],
		}),
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</trpc.Provider>
	)
}

import { QueryKey, QueryState, dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { isEqual } from "es-toolkit";
import { cache } from "react";

export const getQueryClient = cache(() => new QueryClient());

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;
  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

export async function getDehydratedQuery<Q extends QueryProps>({ queryKey, queryFn }: Q) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);
  const [dehydratedQuery] = queries.filter((query) => {
    return isEqual(query.queryKey, queryKey);
  });

  return dehydratedQuery as DehydratedQueryExtended<UnwrapPromise<ReturnType<Q["queryFn"]>>>;
}

export const Hydrate = HydrationBoundary;

export default {};

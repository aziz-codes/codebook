"use client";
import { useMutation, useQueryClient, MutationFunction, UseMutationResult } from "@tanstack/react-query";

interface UseMutationHookOptions<TVariables, TData> {
  mutationFn: MutationFunction<TData, TVariables>;
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
  invalidateQueriesKeys?: string[];
}

const useCustomMutation = <TVariables = any, TData = any>({
  mutationFn,
  onSuccess,
  onError,
  invalidateQueriesKeys = [],
}: UseMutationHookOptions<TVariables, TData>): UseMutationResult<TData, unknown, TVariables> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<TData, unknown, TVariables>({
    mutationFn,
    onSuccess: (data) => {
      // Invalidate queries after a successful mutation
      invalidateQueriesKeys.forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      if (onError) {
        onError(error);
      }
    },
  });

  return mutation; // Return the whole mutation object
};

export default useCustomMutation;

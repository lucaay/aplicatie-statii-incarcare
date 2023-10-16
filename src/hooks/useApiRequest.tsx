import { HttpMethod } from "@/types/requestsTypes";
import { useRequestState } from "./useRequestState";
import { useCallback } from "react";

export function useApiRequest<
    Resp = unknown,
    Body = { [key: string]: unknown }
>(path: string, method: HttpMethod = "POST") {
    const { setError, setLoading, setData, state } = useRequestState<
        Resp,
        string
    >();

    const fn = useCallback(
        async (body: Body) => {
            setLoading(true);
            try {
                const payload = JSON.stringify(body);

                let response = await fetch(path, {
                    method: method,
                    body: method === "GET" ? null : payload,
                });

                let data = await response.json();

                setData(data);
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : `Unknown error`;

                setError(message);

                return Promise.reject(error);
            }
        },
        [method, setLoading, setData, setError, path]
    );

    return [fn, state] as [typeof fn, typeof state];
}

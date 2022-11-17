import { useQuery } from "@apollo/client";
import { TAGS_QUERY } from "helpers/gqlQueries";
import { useEffect } from "react";

export const useFetchTags = ({ filter, withItems, withPublished } = Object) => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    TAGS_QUERY,
    {
      variables: {
        filter,
        withItems,
        withPublished,
      },
    }
  );
  useEffect(() => {
    const pollingIntervalTime = 1000 * 1;
    startPolling(pollingIntervalTime);
    const stopTimeout = setTimeout(stopPolling, pollingIntervalTime * 2);
    return () => {
      stopPolling();
      clearTimeout(stopTimeout);
    };
  }, []);
  return { data, loading, error };
};

import { axiosInstance } from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";

type useGetIdeasProps = {
  queryKey: string[];
  params?: {
    "page[number]": number;
    "page[size]": number;
    "append[]": string[];
    sort: string;
  };
};

const DEFAULT_PARAMS: useGetIdeasProps["params"] = {
  "page[number]": 1,
  "page[size]": 10,
  "append[]": ["small_image", "medium_image"],
  sort: "-published_at",
};

export const useGetIdeas = ({
  queryKey,
  params = DEFAULT_PARAMS,
}: useGetIdeasProps) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/ideas", {
        params,
      });

      return response.data;
    },
    queryKey,
  });

  return {
    data,
    isLoading,
    isError,
  };
};

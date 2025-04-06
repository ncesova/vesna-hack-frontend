import { useQuery } from "@tanstack/react-query";
import NpaService from "./NpaServise";

export const useGetNpa = () => {
  return useQuery({
    queryKey: ["npa"],
    queryFn: () => NpaService.getNpa(),
  });
};

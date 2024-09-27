import axios from "axios";
import {
  DeleteSaleRequest,
  getSaleByIDRequest,
  PostSaleRequest,
  SalesApiResponse,
  UpdateSaleRequest,
} from "./types";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

interface CommonMutateProps {
  queryClient: QueryClient;
}

export const salesApi = () => {
  const getAllSales = async (): Promise<SalesApiResponse[]> => {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/sales"
    );
    return response.data.data.sales;
  };

  const getSaleByID = async ({
    id,
  }: getSaleByIDRequest): Promise<SalesApiResponse> => {
    const response = await axios.get(
      import.meta.env.VITE_API_URL + "/api/sales/" + id
    );
    return response.data.data.sale;
  };

  const postSale = async ({
    product,
    quantity,
    unit_price,
  }: PostSaleRequest): Promise<SalesApiResponse> => {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/sales",
      {
        product,
        quantity,
        unit_price,
      }
    );
    return response.data.data.sales;
  };

  const deleteSale = async ({
    id,
  }: DeleteSaleRequest): Promise<SalesApiResponse> => {
    const response = await axios.delete(
      import.meta.env.VITE_API_URL + "/api/sales/" + id
    );
    return response.data.status;
  };

  const updateSale = async ({
    id,
    product,
    quantity,
    unit_price,
  }: UpdateSaleRequest): Promise<SalesApiResponse> => {
    const response = await axios.patch(
      import.meta.env.VITE_API_URL + "/api/sales/" + id,
      {
        product,
        quantity,
        unit_price,
      }
    );
    return response.data.data.sales;
  };

  return {
    useGetAllSales: () => {
      return useQuery({
        queryKey: ["sales"],
        queryFn: getAllSales,
      });
    },

    useGetSaleByID: ({ id }: { id: number | null }) => {
      return useQuery({
        queryKey: ["sale"],
        queryFn: () => getSaleByID({ id: id }),
      });
    },

    usePostSale: ({ queryClient }: CommonMutateProps) => {
      return useMutation({
        mutationKey: ["sales"],
        mutationFn: postSale,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["sales"] });
        },
      });
    },

    useDeleteSale: ({ queryClient }: CommonMutateProps) => {
      return useMutation({
        mutationKey: ["sales"],
        mutationFn: deleteSale,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["sales"] });
        },
      });
    },

    useUpdateSale: ({ queryClient }: CommonMutateProps) => {
      return useMutation({
        mutationKey: ["sales"],
        mutationFn: updateSale,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["sales"] });
        },
      });
    },
  };
};

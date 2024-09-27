import { QueryClient } from "@tanstack/react-query";
import { salesApi } from "../../../services/sales-api";
import HomeView from "../view/home.view";
import { useState } from "react";

interface HomeControllerProps {
  queryClient: QueryClient;
}

export default function HomeController({ queryClient }: HomeControllerProps) {
  const [showUpdateSale, setShowUpdateSale] = useState(false);
  const [showCreateSale, setShowCreateSale] = useState(false);
  const [currentSaleID, setCurrentSaleID] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { useGetAllSales, usePostSale, useDeleteSale, useUpdateSale } =
    salesApi();

  const { data: getSalesData } = useGetAllSales();
  const { mutate: postSaleMutationTrigger } = usePostSale({ queryClient });
  const { mutate: deleteSaleTrigger } = useDeleteSale({
    queryClient,
  });
  const { mutate: updateSaleTrigger } = useUpdateSale({ queryClient });

  const updateSaleHandler = (id: number) => {
    setCurrentSaleID(id);
    showUpdateSaleHandler();
  };

  const showCreateSaleHandler = () => {
    setShowCreateSale(!showCreateSale);
  };

  const showUpdateSaleHandler = () => {
    setShowUpdateSale(!showUpdateSale);
  };

  return (
    <HomeView
      data={getSalesData}
      currentSaleID={currentSaleID}
      postSale={postSaleMutationTrigger}
      deleteSale={deleteSaleTrigger}
      updateSale={updateSaleTrigger}
      updateSaleHandler={updateSaleHandler}
      showCreateSaleHandler={showCreateSaleHandler}
      showUpdateSaleHandler={showUpdateSaleHandler}
      showUpdateSale={showUpdateSale}
      showCreateSale={showCreateSale}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
}

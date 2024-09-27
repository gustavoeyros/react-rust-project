import { useEffect, useState } from "react";
import { UpdateSaleRequest } from "../../../../services/types";
import SaleProductManagement from "../sale-product-management";
import { salesApi } from "../../../../services/sales-api";
import Modal from "../modal";

interface UpdateSaleProductProps {
  currentSaleID: number | null;
  showModal: boolean;
  updateSale: (params: UpdateSaleRequest) => void;
  showModalHandler: () => void;
}

export default function UpdateSaleProduct({
  updateSale,
  currentSaleID,
  showModal,
  showModalHandler,
}: UpdateSaleProductProps) {
  const { useGetSaleByID } = salesApi();

  const { data } = useGetSaleByID({
    id: currentSaleID,
  });

  const [product, setProduct] = useState(data?.product ?? "");
  const [quantity, setQuantity] = useState(data?.quantity ?? "");
  const [unitPrice, setUnitPrice] = useState(data?.unit_price ?? "");

  const onClickHandler = (
    product: string,
    quantity: number,
    unit_price: number
  ) => {
    updateSale({ product, quantity, unit_price, id: currentSaleID });
    showModalHandler();
  };

  useEffect(() => {
    if (data) {
      setProduct(data.product);
      setQuantity(data.quantity);
      setUnitPrice(data.unit_price);
    }
  }, [data]);

  return (
    <Modal isOpen={showModal} onClose={showModalHandler}>
      <SaleProductManagement
        product={product}
        setProduct={setProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        unitPrice={unitPrice}
        setUnitPrice={setUnitPrice}
        onClickHandler={onClickHandler}
        textContent="Atualizar"
        title="Atualizar Produto"
      />
    </Modal>
  );
}

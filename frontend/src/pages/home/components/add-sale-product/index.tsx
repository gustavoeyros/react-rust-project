import { useState } from "react";
import { PostSaleRequest } from "../../../../services/types";
import SaleProductManagement from "../sale-product-management";
import Modal from "../modal";

interface AddSaleProductProps {
  postSale: (params: PostSaleRequest) => void;
  showModal: boolean;
  showModalHandler: () => void;
}

export default function AddSaleProduct({
  postSale,
  showModal,
  showModalHandler,
}: AddSaleProductProps) {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [unitPrice, setUnitPrice] = useState<number | string>("");

  const onClickHandler = (
    product: string,
    quantity: number,
    unit_price: number
  ) => {
    postSale({ product, quantity, unit_price });
    showModalHandler();
  };

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
        textContent="Adicionar"
        title="Adicionar Produto"
      />
    </Modal>
  );
}

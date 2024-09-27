import {
  DeleteSaleRequest,
  UpdateSaleRequest,
} from "../../../../services/types";
import {
  Buttons,
  SaleCardComponent,
  SaleCardWrapper,
  SaleInformations,
  SaleInformationsWrapper,
} from "./styled";
import { MdDelete, MdEdit } from "react-icons/md";

interface SaleCardProps {
  id: number;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
  deleteSale: (params: DeleteSaleRequest) => void;
  updateSale: (params: UpdateSaleRequest) => void;
  updateSaleHandler: (id: number) => void;
}

export default function SaleCard({
  id,
  product,
  quantity,
  unitPrice,
  total,
  deleteSale,
  updateSaleHandler,
}: SaleCardProps) {
  return (
    <SaleCardWrapper>
      <SaleCardComponent>
        <SaleInformationsWrapper>
          <h1>{product}</h1>
          <SaleInformations>
            <p>Quantidade: {quantity}</p>
            <p>Preço unitário: {unitPrice}</p>
            <p>Total: {total}</p>
          </SaleInformations>
        </SaleInformationsWrapper>
        <Buttons>
          <button onClick={() => deleteSale({ id })}>
            <MdDelete />
          </button>
          <button onClick={() => updateSaleHandler(id)}>
            <MdEdit />
          </button>
        </Buttons>
      </SaleCardComponent>
    </SaleCardWrapper>
  );
}

import {
  SaleProductButton,
  SaleProductInput,
  SaleProductManagementComponent,
  SaleProductTitle,
} from "./styled";

interface SaleProductManagementProps {
  onClickHandler: (
    product: string,
    quantity: number,
    unitPrice: number
  ) => void;
  product: string;
  textContent: string;
  setProduct: (product: string) => void;
  quantity: number | string;
  setQuantity: (quantity: number) => void;
  unitPrice: number | string;
  setUnitPrice: (unit_price: number) => void;
  title: string;
}

export default function SaleProductManagement({
  onClickHandler,
  product,
  setProduct,
  quantity,
  setQuantity,
  unitPrice,
  setUnitPrice,
  textContent,
  title,
}: SaleProductManagementProps) {
  return (
    <SaleProductManagementComponent>
      <SaleProductTitle>{title}</SaleProductTitle> {/* Adicionando o título */}
      <SaleProductInput
        type="text"
        placeholder="Produto"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <SaleProductInput
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <SaleProductInput
        type="number"
        placeholder="Preço unitário"
        value={unitPrice}
        onChange={(e) => setUnitPrice(Number(e.target.value))}
      />
      <SaleProductButton
        onClick={() =>
          onClickHandler(product, Number(quantity), Number(unitPrice))
        }
      >
        {textContent}
      </SaleProductButton>
    </SaleProductManagementComponent>
  );
}

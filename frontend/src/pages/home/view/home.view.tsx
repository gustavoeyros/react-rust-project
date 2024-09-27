import {
  DeleteSaleRequest,
  PostSaleRequest,
  SalesApiResponse,
  UpdateSaleRequest,
} from "../../../services/types";
import AddSaleProduct from "../components/add-sale-product";
import Header from "../components/header";
import SaleCard from "../components/sale-card";
import UpdateSaleProduct from "../components/update-sale-product";
import {
  ButtonHome,
  ButtonWrapper,
  Container,
  SalesWrappers,
  Wrappper,
} from "./styled";

interface HomeViewProps {
  data: SalesApiResponse[] | undefined;
  currentSaleID: number | null;
  showUpdateSale: boolean;
  showCreateSale: boolean;
  searchTerm: string;
  postSale: (params: PostSaleRequest) => void;
  deleteSale: (params: DeleteSaleRequest) => void;
  updateSale: (params: UpdateSaleRequest) => void;
  showCreateSaleHandler: () => void;
  showUpdateSaleHandler: () => void;
  setSearchTerm: (term: string) => void;
  updateSaleHandler: (id: number) => void;
}

export default function HomeView({
  data,
  currentSaleID,
  postSale,
  deleteSale,
  updateSale,
  showUpdateSale,
  updateSaleHandler,
  showCreateSale,
  showCreateSaleHandler,
  showUpdateSaleHandler,
  searchTerm,
  setSearchTerm,
}: HomeViewProps) {
  return (
    <Wrappper>
      <Container>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ButtonWrapper>
          <ButtonHome onClick={showCreateSaleHandler}>Adicionar</ButtonHome>
        </ButtonWrapper>
        {showCreateSale && (
          <AddSaleProduct
            showModal={showCreateSale}
            showModalHandler={showCreateSaleHandler}
            postSale={postSale}
          />
        )}
        {showUpdateSale && (
          <UpdateSaleProduct
            showModal={showUpdateSale}
            showModalHandler={showUpdateSaleHandler}
            currentSaleID={currentSaleID}
            updateSale={updateSale}
          />
        )}
        <SalesWrappers>
          {data
            ?.filter((sale) =>
              sale.product.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((sale) => (
              <SaleCard
                key={sale.id}
                id={sale.id}
                product={sale.product}
                quantity={sale.quantity}
                total={sale.total}
                unitPrice={sale.unit_price}
                deleteSale={deleteSale}
                updateSale={updateSale}
                updateSaleHandler={updateSaleHandler}
              />
            ))}
        </SalesWrappers>
      </Container>
    </Wrappper>
  );
}

import { HeaderComponent, SearchContainer, SearchInput } from "./styled";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  return (
    <HeaderComponent>
      <h1>TerraForma Vendas</h1>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Procure por um produto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
    </HeaderComponent>
  );
}

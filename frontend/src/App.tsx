import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeController from "./pages/home/controller/home.controller";
import { GlobalStyle } from "./styled";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <HomeController queryClient={queryClient} />
    </QueryClientProvider>
  );
}

export default App;

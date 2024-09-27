import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HomeController from "../../src/pages/home/controller/home.controller";
import { expect, test } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import nock from "nock";

test("should render correctly app", async () => {
  nock(process.env.VITE_API_URL!)
    .defaultReplyHeaders({
      "access-control-allow-origin": "*",
    })
    .get("/api/sales")
    .reply(200, {
      data: {
        sales: [
          {
            id: 153,
            product: "Feijão",
            quantity: "20",
            total: "200",
            unit_price: "10",
          },
        ],
      },
      status: "success",
    });

  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <HomeController queryClient={queryClient} />
    </QueryClientProvider>
  );

  await waitFor(() => {
    const productTitle = screen.getAllByText("Feijão");
    const productQuantity = screen.getAllByText("Quantidade: 20");
    const productUnitPrice = screen.getAllByText("Preço unitário: 10");
    const productTotal = screen.getAllByText("Total: 200");

    expect(productTitle).toBeTruthy();
    expect(productQuantity).toBeTruthy();
    expect(productUnitPrice).toBeTruthy();
    expect(productTotal).toBeTruthy();
  });
});

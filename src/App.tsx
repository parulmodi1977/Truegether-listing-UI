import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import ListingDetailsPage from "@/pages/ListingDetailsPage";
import ReviewPurchasePage from "@/pages/ReviewPurchasePage";
import OrderConfirmationPage from "@/pages/OrderConfirmationPage";

type Page = "listing" | "review" | "confirmation";

function App() {
  const [page, setPage] = useState<Page>("listing");

  return (
    <MainLayout>
      {page === "listing" && (
        <ListingDetailsPage
          onBuyNow={() => setPage("review")}
          onAddToCart={() => setPage("review")}
        />
      )}
      {page === "review" && (
        <ReviewPurchasePage
          onBack={() => setPage("listing")}
          onOrderPlaced={() => setPage("confirmation")}
        />
      )}
      {page === "confirmation" && (
        <OrderConfirmationPage />
      )}
    </MainLayout>
  );
}

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import InstantSearch from "./Components/InstantSearch";
import EndOfArticle from "./Analytics/EndOfArticle";

const searchElement = document.getElementById("Algolia");
const endOfArticle = document.getElementById("end-of-article");

if (searchElement) {
    const search = createRoot(searchElement);

    search.render(
        <StrictMode>
            <InstantSearch />
        </StrictMode>
    );
}

if (endOfArticle) {
    const endOfArticleRoot = createRoot(endOfArticle);

    endOfArticleRoot.render(
        <StrictMode>
            <EndOfArticle />
        </StrictMode>
    );
}
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import InstantSearch from "./Components/InstantSearch";

const rootElement = document.getElementById("Algolia");

if (rootElement) {
    const root = createRoot(rootElement);

    root.render(
        <StrictMode>
            <InstantSearch />
        </StrictMode>
    );
}

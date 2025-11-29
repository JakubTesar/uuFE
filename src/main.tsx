// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

async function enableMocks() {
    const enableMocks = true;
    if (enableMocks) {
        const { worker } = await import("./mocks/browser");
        await worker.start();
    }
}

enableMocks().then(() => {
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});

import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { AppRoute } from "./Routes";

export default function App() {
  return (
    <>
      <BrowserRouter>
       <Suspense>
        <AppRoute />
       </Suspense>
      </BrowserRouter>
    </>
  )
}

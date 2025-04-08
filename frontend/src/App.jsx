import { Toaster } from "sonner";
import AppRoutes from "./AppRoutes";
import Auth from "./shared/pages/Auth";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors />
    </>
  );
}

export default App;

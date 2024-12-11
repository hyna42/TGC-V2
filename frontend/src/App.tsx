import { Route, Routes } from "react-router-dom";
import "./App.css";

import RecentAds from "./components/RecentAds";
import LayoutPage from "./pages/LayoutPage";
// import AboutPage from "./pages/AboutPage";
import AdDetailsPage from "./pages/AdDetailsPage";
import NewAddFormPage from "./pages/NewAddFormPage";
import { ToastContainer } from "react-toastify";
import NewCategoryForm from "./pages/NewCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<RecentAds />} />
          {/* <Route path="about" element={<AboutPage />} /> */}
          <Route path="ad/new" element={<NewAddFormPage />} />

          <Route path="ad/category" element={<NewCategoryForm />} />
          
          <Route path="ad/:id" element={<AdDetailsPage />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;

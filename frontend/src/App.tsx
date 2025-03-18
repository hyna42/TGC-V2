import { Route, Routes } from "react-router-dom";
import "./App.css";
import RecentAds from "./components/RecentAds";
import LayoutPage from "./pages/LayoutPage";
import AdDetailsPage from "./pages/AdDetailsPage";
import NewAddFormPage from "./pages/NewAddFormPage";
import { ToastContainer } from "react-toastify";
import NewCategoryForm from "./pages/NewCategory";
import SearchAds from "./components/SearchAds";
import UpdateAdPage from "./pages/UpdateAdPage";
import UploadAdImg from "./components/UploadAdImg";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<RecentAds />} />

          <Route path="ad/new" element={<NewAddFormPage />} />

          <Route path="ad/category" element={<NewCategoryForm />} />
          
          <Route path="ad/:id" element={<AdDetailsPage />} />

          <Route path="ad/search" element={<SearchAds />} />

          <Route path="img/upload" element={<UploadAdImg />} />

          <Route path="ad/update/:id" element={<UpdateAdPage />} />
          
        </Route>
      </Routes>
      <ToastContainer theme="colored" autoClose={2000}/>
    </>
  );
}

export default App;

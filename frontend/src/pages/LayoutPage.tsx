import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const LayoutPage = () => {
  return (
    <main className="main-content">
      <Header />
      <Outlet />
    </main>
  );
};

export default LayoutPage;

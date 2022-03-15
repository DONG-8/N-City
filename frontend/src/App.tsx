import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Admin, FAQ, Main, Mypage, NFTStore } from "./pages/index";
import Login from "./pages/Login/Login";
import Apply from "./pages/Apply/Apply";
import GlobalStyle from "./styles/global";
import DetailItem from "./pages/NFTStore/DetailItem";
import SalesResistration from "./pages/SalesResistration/SalesResistration";
import ProfileSetting from "./pages/Mypage/ProfileSetting";
import EventPage from "./pages/FAQ/EventPage";
import EventDetail from "./pages/FAQ/EventDetail";
import Rank from "./pages/Rank/Rank";
function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/store" element={<NFTStore />} />
          <Route path="/store/detail" element={<DetailItem />} />
          <Route path="/SalesResistration" element={<SalesResistration />} />
          <Route path="/profilesetting" element={<ProfileSetting />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/event/detail" element={<EventDetail />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

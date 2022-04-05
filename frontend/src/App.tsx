import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Admin, FAQ, Main, Mypage, NFTStore } from "./pages/index";
import Login from "./pages/Login/Login";
import Apply from "./pages/Apply/Apply";
import GlobalStyle from "./styles/global";
import DetailItem from "./pages/NFTStore/DetailItem";
import ProfileSetting from "./pages/Mypage/ProfileSetting";
import EventPage from "./pages/Community/EventPage";
import EventDetail from "./pages/Community/EventDetail";
import Rank from "./pages/Rank/Rank";
import Mint from "./pages/Mint/Mint";
import Artists from "./pages/NFTStore/Artists";
import GameApp from "./ingame/GameApp";
import { Provider } from "react-redux";
import gamestore from "./ingame/stores";
import phaserGame from "./ingame/PhaserGame";
import YNTest from "./pages/Test/YNTest";
import SearchPage from "./pages/NFTStore/SearchPage";
import MapChoice from "./pages/Room/MapChoice";
import Character from "./pages/Mypage/Character";

function App() {
  useEffect(() => {
    if (window.location.pathname === "/ingame") {
      (window as any).game = phaserGame;
    } else {
      (window as any).game.destroy(true);
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Provider store={gamestore}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/mypage/:userId" element={<Mypage />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/store" element={<NFTStore />} />
            <Route path="/store/detail/:productId" element={<DetailItem />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/profilesetting" element={<ProfileSetting />} />
            <Route path="/event" element={<EventPage />} />
            <Route path="/event/detail" element={<EventDetail />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/YNTest" element={<YNTest />} />
            <Route path="/search/:data" element={<SearchPage />} />
            <Route path="/ingame" element={<GameApp />} />
            <Route path="/character" element={<Character />} />
          </Routes>
        </Provider>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

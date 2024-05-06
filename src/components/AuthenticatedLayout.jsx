// AuthenticatedLayout.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import NewsPage from "./News/NewsPage.jsx";
import Sidebar from "./SideBar/Sidebar.jsx";
import LiveDashboard from "./Live/Dashboard.jsx";
import BacktestDashboard from "./Backtest/Dashboard.jsx";
import { NewsProvider } from "../contexts/NewsContext.jsx";
import { LiveProvider } from "../contexts/LiveContext.jsx";
import { BacktestProvider } from "../contexts/BacktestContext.jsx";
import TradingViewChart from "./TradingView/Chart/TradingView.jsx";
import TradingViewTickerTape from "./TradingView/TickerTape/TickerTape.jsx";

function AuthenticatedLayout() {
    return (
        <div className="grid-container">
        <Sidebar />
        <div className="ticker-tape">
            <TradingViewTickerTape />
        </div>
        <NewsProvider>
            <BacktestProvider>
                <LiveProvider>
                    <Routes>
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/backtest" element={<BacktestDashboard />} />
                        <Route path="/live" element={<LiveDashboard />} />
                        <Route path="/chart" element={<TradingViewChart />} />
                    </Routes>
                </LiveProvider>
            </BacktestProvider>
        </NewsProvider>
        </div>
    );
}

export default AuthenticatedLayout;

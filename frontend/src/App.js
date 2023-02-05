import React from 'react';
import './styles.css'
import Search from './pages/search'
import Cards from './pages/cards';
import { Switch, Link, Route, Routes } from "react-router-dom";


export default function App() {

    return (
        <>
            <Routes>
                <Route path="/" element=<Search/> />
                <Route path="/cards" element=<Cards/> />
            </Routes>
        </>
    );
}
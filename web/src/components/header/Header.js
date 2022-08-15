import React, { useState } from "react";

import logo from "../static/logo.svg";

import "./style/Header.css";
import "./style/MobileNavbar.css";


const Header = () => {
    const [isSearchActive, setSearchActive] = useState(false);
    const toggleSearchClass = () => {
        setSearchActive(!isSearchActive);
    };

    const [isMobileNavbarActive, setMobileNavbarActive] = useState(false);
    const toggleMobileNavbarClass = () => {
        setMobileNavbarActive(!isMobileNavbarActive);
    };

    return (
        <div className="header-wrapper">
            <nav id="mobile-nav" className={isMobileNavbarActive ? "mobile-navbar-wrapper active" : "mobile-navbar-wrapper"}>
                <div className="mobile-navbar-panels">
                    <ul className="mobile-navbar-listview">
                        <li>
                            <a className="mm-title" href="/">
                                Меню
                            </a>
                        </li>
                        <li>
                            <a href="http://kinokino.tv/">
                                Фильмы
                            </a>
                        </li>
                        <li>
                            <a href="/series/">
                                Все сериалы
                            </a>
                        </li>
                        <li>
                            <a href="/#popular">
                                Популярные
                            </a>
                        </li>
                        <li>
                            <a href="/newest/">
                                Новинки
                            </a>
                        </li>
                        <li className="u-underlined-bottom">
                            <a href="/?do=search">
                                Поиск
                            </a>
                        </li>
                        <li>
                            <a href="http://myseria.pro/serials/69-euphoria-1.html">
                                Эйфория
                            </a>
                        </li>
                        <li>
                            <a className="mm-title" href="/">
                                Меню
                            </a>
                        </li>
                        <li>
                            <a href="http://kinokino.tv/">
                                Фильмы
                            </a>
                        </li>
                        <li>
                            <a href="/series/serials/">
                                Новые серии
                            </a>
                        </li>
                        <li>
                            <a href="/#popular">
                                Популярные
                            </a>
                        </li>
                        <li>
                            <a href="/newest/">
                                Новинки
                            </a>
                        </li>
                        <li className="u-underlined-bottom">
                            <a href="/?do=search">
                                Поиск
                            </a>
                        </li>
                        <li>
                            <a href="http://myseria.pro/serials/69-euphoria-1.html">
                                Эйфория
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <header role="presentation">
                <div className="l-header">
                    <div className="row">
                        <div className="small-12 columns">
                            <div className="l-header-content clearfix">
                                <button id="show_mobile_menu" className="hamburger hamburger--spin" type="button" onClick={toggleMobileNavbarClass}>
                                    <span className="hamburger-box">
                                        <span className="hamburger-inner">
                                            
                                        </span>
                                    </span>
                                </button>
                                <div className="logo">
                                    <a href="/" className="logotype">
                                        <img src={logo} alt="logo" />
                                    </a>
                                </div>
                                <nav className="top-nav">
                                    <ul className="nav-list">
                                        <li>
                                            <a href="/news">
                                                Новости
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/episodes">
                                                Новые серии
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/popular">
                                                Популярное
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/novelty">
                                                Новинки
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/series">
                                                Все сериалы
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/orderdesc">
                                                Стол заказов
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                <div className="block-search">
                                    <div className={isSearchActive ? "search-container focused" : "search-container"} id="search-container" onClick={toggleSearchClass}>
                                        <div className="wrap">
                                            <form autoComplete="off" method="get" action="/" id="serial_search_form">
                                                <input type="hidden" name="do" value="search" />
                                                <input type="hidden" name="subaction" value="search" />
                                                <button type="submit" className="input-area">
                                                    <span className="icon-search"></span>
                                                </button>
                                                <input type="text" name="story" placeholder="Поиск" id="search" className="input-search" />
                                            </form>
                                            <span className="close-search"></span>
                                        </div>
                                    </div>
                                    <div className="response-container" id="response-container"></div>
                                </div>
                                <div className="box-login">
                                    <div className="login-wget">
                                        <div className="info" data-toggle="modal" data-target="modalLogin">
                                            <div className="help">
                                                <span className="icon-login"></span>
                                                <span className="text">
                                                    Вход
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
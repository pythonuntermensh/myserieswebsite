import React from "react";

import "./style/NoveltyBanner.css";

const NoveltyBanner = () => {
    return (
        <div className="novelty-banner">
            <div className="novelty-banner__text">
                Подпишись на наши сообщества и оставайся с нами на связи:
            </div>
            <div className="novelty-banner__links">
                <a href="https://vk.com/myserianet">
                    <i className="icon-vk" />
                    <span>ВКонтакте</span>
                </a>
                <a href="https://t.me/myseriatv">
                    <i className="icon-telegram-1" />
                    <span>Telegram</span>
                </a>
            </div>
        </div>
    );
};

export default NoveltyBanner;
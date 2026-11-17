"use strict";

document.addEventListener("DOMContentLoaded", () => {

// =====================================
// DATE AND COPYRIGHT
// =====================================

const dateElement = document.getElementById("today-date");
const yearElement = document.getElementById("year");

const currentYear = new Date().getFullYear();

if (yearElement) {
    yearElement.textContent = currentYear;
}

// =====================================
// LANGUAGE TRANSLATIONS
// =====================================

const translations = {

    en: {
        home: "Home",
        world: "World",
        africa: "Africa",
        tanzania: "Tanzania",
        church: "Church",
        business: "Business",
        sports: "Sports",
        technology: "Technology",
        breaking: "BREAKING NEWS",
        hero_title: "Your World. Your News. Your Voice.",
        hero_description: "Get the latest news, trusted stories and important updates from Tanzania, Africa and around the world.",
        read_news: "Explore Latest News",
        latest: "Latest News",
        newsletter_title: "Stay Informed",
        newsletter_description: "Subscribe to receive important news and updates.",
        subscribe: "Subscribe",
        newsletter_success: "Thank you! Newsletter subscription is not connected yet.",
        newsletter_error: "Please enter a valid email address.",
        breaking_text: "Welcome to MLIPUKA GLOBAL MEDIA — Your World. Your News. Your Voice."
    },

    sw: {
        home: "Nyumbani",
        world: "Dunia",
        africa: "Afrika",
        tanzania: "Tanzania",
        church: "Kanisa",
        business: "Biashara",
        sports: "Michezo",
        technology: "Teknolojia",
        breaking: "HABARI ZA HARAKA",
        hero_title: "Dunia Yako. Habari Zako. Sauti Yako.",
        hero_description: "Pata habari za hivi karibuni, taarifa za kuaminika na matukio muhimu kutoka Tanzania, Afrika na dunia nzima.",
        read_news: "Soma Habari Mpya",
        latest: "Habari za Hivi Karibuni",
        newsletter_title: "Usipitwe na Habari",
        newsletter_description: "Jisajili ili kupokea habari muhimu na taarifa mpya.",
        subscribe: "Jisajili",
        newsletter_success: "Asante! Mfumo wa kupokea majarida bado haujaunganishwa.",
        newsletter_error: "Tafadhali weka barua pepe sahihi.",
        breaking_text: "Karibu MLIPUKA GLOBAL MEDIA — Dunia Yako. Habari Zako. Sauti Yako."
    },

    zh: {
        home: "首页",
        world: "世界",
        africa: "非洲",
        tanzania: "坦桑尼亚",
        church: "教会",
        business: "商业",
        sports: "体育",
        technology: "科技",
        breaking: "突发新闻",
        hero_title: "你的世界。你的新闻。你的声音。",
        hero_description: "获取来自坦桑尼亚、非洲和世界各地的最新新闻、可信报道和重要资讯。",
        read_news: "阅读最新新闻",
        latest: "最新新闻",
        newsletter_title: "获取最新资讯",
        newsletter_description: "订阅以接收重要新闻和最新消息。",
        subscribe: "订阅",
        newsletter_success: "谢谢！新闻订阅系统尚未连接。",
        newsletter_error: "请输入有效的电子邮件地址。",
        breaking_text: "欢迎来到 MLIPUKA GLOBAL MEDIA — 你的世界，你的新闻，你的声音。"
    },

    fr: {
        home: "Accueil",
        world: "Monde",
        africa: "Afrique",
        tanzania: "Tanzanie",
        church: "Église",
        business: "Économie",
        sports: "Sports",
        technology: "Technologie",
        breaking: "DERNIÈRES NOUVELLES",
        hero_title: "Votre Monde. Vos Actualités. Votre Voix.",
        hero_description: "Découvrez les dernières nouvelles, des reportages fiables et des informations importantes de Tanzanie, d'Afrique et du monde entier.",
        read_news: "Lire les Actualités",
        latest: "Dernières Actualités",
        newsletter_title: "Restez Informé",
        newsletter_description: "Abonnez-vous pour recevoir les actualités et informations importantes.",
        subscribe: "S'abonner",
        newsletter_success: "Merci ! Le système d'abonnement n'est pas encore connecté.",
        newsletter_error: "Veuillez saisir une adresse e-mail valide.",
        breaking_text: "Bienvenue sur MLIPUKA GLOBAL MEDIA — Votre Monde. Vos Actualités. Votre Voix."
    }

};

// =====================================
// LANGUAGE SYSTEM
// =====================================

const languageSelect = document.getElementById("language-select");

function updateDate(language) {

    if (!dateElement) return;

    const locales = {
        en: "en-US",
        sw: "sw-TZ",
        zh: "zh-CN",
        fr: "fr-FR"
    };

    dateElement.textContent = new Intl.DateTimeFormat(
        locales[language] || "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).format(new Date());

}

function changeLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    const selectedTranslations = translations[language];

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (selectedTranslations[key]) {
            element.textContent = selectedTranslations[key];
        }

    });

    const breakingNews = document.getElementById("breaking-news");

    if (breakingNews) {
        breakingNews.textContent = selectedTranslations.breaking_text;
    }

    updateDate(language);

    localStorage.setItem("mlipuka_language", language);

    if (languageSelect) {
        languageSelect.value = language;
    }

}

const savedLanguage = localStorage.getItem("mlipuka_language") || "en";

changeLanguage(savedLanguage);

if (languageSelect) {

    languageSelect.addEventListener("change", function () {
        changeLanguage(this.value);
    });

}

// =====================================
// NEWSLETTER FORM
// =====================================

const newsletterForm = document.getElementById("newsletter-form");
const newsletterMessage = document.getElementById("newsletter-message");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');

        const language = localStorage.getItem("mlipuka_language") || "en";

        if (!emailInput || !emailInput.checkValidity()) {

            if (newsletterMessage) {
                newsletterMessage.textContent = translations[language].newsletter_error;
            }

            return;
        }

        if (newsletterMessage) {
            newsletterMessage.textContent = translations[language].newsletter_success;
        }

        newsletterForm.reset();

    });

}

});
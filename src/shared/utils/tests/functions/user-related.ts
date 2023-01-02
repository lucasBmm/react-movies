export function getUserLanguage() {
    return navigator.languages.forEach(lang => {
        if (lang) return lang;
    });
}
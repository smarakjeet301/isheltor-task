// src/utils/debounce.js
export const debounce = (func, delay) => {
    let timer;

    const debounced = (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };

    debounced.cancel = () => {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };

    return debounced;
};

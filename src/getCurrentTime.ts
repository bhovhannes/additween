export function getCurrentTime(): number {
    if (window.performance && window.performance.now) {
        return window.performance.now();
    }

    if (Date.now) {
        return Date.now();
    }

    return new Date().getTime();
}

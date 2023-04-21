export default function myDebounce(func, delay) {
    let timeoutId;

    return function () {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(function () {
            func.apply(context, args);
        }, delay);
    };
}

export default function throttle(func, limit) {
    let inThrottle = false;

    return function () {
        const context = this;
        const args = arguments;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;

            setTimeout(function () {
                inThrottle = false;
            }, limit);
        }
    };
}

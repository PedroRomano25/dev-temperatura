export function debounce<Params extends any[]>(
    func: (...args: Params) => any,
    timeout: number
): (...args: Params) => void {
    let timer: NodeJS.Timeout;
    return (...args: Params) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, timeout);
    };
}

export const validLocalStorage = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("language");
    } else {
        return '"pt_br"';
    }
};

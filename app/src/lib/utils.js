export const round = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
}

export const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
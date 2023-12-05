export const getCurrentDate = () => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date().toLocaleDateString(undefined, options);
};

export const getCurrentTime = () => {
    const options = { hour12: false };
    return new Date().toLocaleTimeString("th-TH", options);
};
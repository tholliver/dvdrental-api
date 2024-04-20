"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGroupByKey = exports.timeLapseConverter = void 0;
const timeLapseConverter = (time, lapse) => {
    const splitedDate = dateLapseParser(time, lapse);
    return splitedDate === null || splitedDate === void 0 ? void 0 : splitedDate.toISOString().split('T')[0];
};
exports.timeLapseConverter = timeLapseConverter;
// To get some date ago given a lapse 
function dateLapseParser(time, lapse) {
    const currentNowDate = new Date();
    // CASE LAST N [YEARS] AGO
    if (time === 'y')
        return new Date(currentNowDate.getFullYear() - lapse, currentNowDate.getMonth(), currentNowDate.getDate());
    // CASE LAST N MONTHS AGO
    if (time === 'm') {
        return new Date(currentNowDate.getFullYear(), currentNowDate.getMonth() - lapse, currentNowDate.getDate());
    }
    // CASE LAST N DAYS AGO
    if (time === 'd') {
        return new Date(currentNowDate.getFullYear(), currentNowDate.getMonth(), currentNowDate.getDate() - lapse);
    }
}
function getGroupByKey(key) {
    const groupByEnums = {
        day: { spec: 'day', format: 'YYYY-MM-DD' },
        month: { spec: 'month', format: 'YYYY-MM' },
        year: { spec: 'year', format: 'YYYY' },
    };
    return groupByEnums[key];
}
exports.getGroupByKey = getGroupByKey;

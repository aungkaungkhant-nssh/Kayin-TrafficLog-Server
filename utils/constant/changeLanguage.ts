export const myanmarToEnglish = (myanmar: string): number => {
    const map: Record<string, string> = {
        '၀': '0',
        '၁': '1',
        '၂': '2',
        '၃': '3',
        '၄': '4',
        '၅': '5',
        '၆': '6',
        '၇': '7',
        '၈': '8',
        '၉': '9',
    };
    const arabic = myanmar.split('').map(c => map[c] ?? c).join('');
    return parseInt(arabic, 10) || 0;
}

export const englishToMyanmar = (english: number | string): string => {
    const map: Record<string, string> = {
        '0': '၀',
        '1': '၁',
        '2': '၂',
        '3': '၃',
        '4': '၄',
        '5': '၅',
        '6': '၆',
        '7': '၇',
        '8': '၈',
        '9': '၉',
    };
    return english
        .toString()
        .split('')
        .map(c => map[c] ?? c)
        .join('');
};
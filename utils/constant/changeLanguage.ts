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
module.exports = function toReadable (n) {
    // 1. setting things up
    let str = n.toString().split('');
    let size = str.length;
    let a = Number(size >= 3 ? str.slice(-3, -2) : 0);
    let b = Number(size >= 2 ? str.slice(-2, -1) : 0);
    let c = Number(str.slice(-1));
    let result;

    // 2. convert to HRN
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const dozens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (b === 0) {
        a = c === 0 ? ones[a] + ' hundred' : ones[a] + ' hundred '; // remove spaces in whole hundreds
        b = '';
        c = c !== 0 ? ones[c] : ''; // remove ones in whole hundreds
    } else if (b === 1) {
        a = ones[a] + ' hundred ';
        b = teens[c]; // replace dozens with teens
        c = '';
    } else {
        a = ones[a] + ' hundred ';
        b = dozens[b];
        c = c !== 0 ? ' ' + ones[c] : ''; // remove ones in whole tens
    }

    // 3. return
    if (n === 0) {
        result = ones[0]; // 0
    } else if (n < 10) {
        result = c; // 1 - 9
    } else if (n < 100) {
        result = b + c; // 10 - 99
    } else if (n < 1000) {
        result = a + b + c; // 100 - 999
    } else {
        result = 'wrong input'; // error
    }

    return result;
}

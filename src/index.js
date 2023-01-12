module.exports = function toReadable (n) {
    // 1. setting things up
    const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const dozens = ['empty', 'empty', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const util = [' ', 'wrong input', 'minus', 'hundred', 'thousand'];

    const str = n.toString().split('');
    const size = str.length;
    let x = Number(size >= 3 ? str.slice(-3, -2) : 0); // getting number of hundreds
    let y = Number(size >= 2 ? str.slice(-2, -1) : 0); // getting number of tens
    let z = Number(str.slice(-1)); // getting number of ones
    let result;
    
    // 2. convert to HRN
    if (y === 0) {
        x = z === 0 ? ones[x] + util[0] + util[3] : ones[x] + util[0] + util[3] + util[0]; // remove spaces in whole hundreds
        y = '';
        z = z !== 0 ? ones[z] : ''; // remove ones in whole hundreds
    } else if (y === 1) {
        x = ones[x] + util[0] + util[3] + util[0];
        y = teens[z]; // replace dozens with teens
        z = '';
    } else {
        x = ones[x] + util[0] + util[3] + util[0];
        y = dozens[y];
        z = z !== 0 ? util[0] + ones[z] : ''; // remove ones in whole tens
    }

    // 3. return
    if (n === 0) {
        result = ones[0]; // 0
    } else if (n < 10) {
        result = z; // 1 - 9
    } else if (n < 100) {
        result = y + z; // 10 - 99
    } else if (n < 1000) {
        result = x + y + z; // 100 - 999
    } else {
        result = util[1]; // error
    }

    return result;
}
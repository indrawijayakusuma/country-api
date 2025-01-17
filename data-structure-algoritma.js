//problem A
const zero = (n) => {
    var count  = 0, multiple = 5
    while(multiple <= n) {
        count += Math.floor(n/multiple)
        multiple *= 5
    }
    return count

};

console.log(zero(10)) // 2





// Problem B
// disini saya menggunakan teknik sliding windows
// dimana saya membuat 2 pointer left dan right sebagai windows yang akan bergerak
// jika nilai dari right lebih kecil dari left maka left akan bergerak ke right / left = right
// jika nilai dari right lebih besar dari left maka profit akan dihitung 'profit = 'prices[i] - prices[left]' dan pinter right akan bergerak
// dan jika profit lebih besar dari profit sebelumnya maka profit akan diupdate
// dan akan mengembalikan nilai profit yang paling besar

const profit = (prices) => {
    let profit = 0;
    let left = 0;

    for (let right = 0; right < prices.length; right++) {
        if (prices[right] < prices[left]) {
            left = right;
        }
        profit = Math.max(profit, prices[right] - prices[left]);
    }
    return profit;
};

console.log(profit([5, 1 ,4 ,3, 6, 2])) // 5
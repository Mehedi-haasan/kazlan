export function getFormattedDate() {
    const date = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-EN', options);
}


export function handleDateConvert(date) {
    const formatted = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return formatted
};



export async function PrepareOrderData(allData, userId, name, values, info, lastTotal, paking, delivary, due, special_discount) {
    let orderData = [];
    allData?.forEach((v) => {
        let sale = 0;
        const price = parseInt(v?.price) || 0;
        const discount = parseInt(v?.discount) || 0;
        const qty = parseInt(v?.qty) || 0;
        if (v?.discount_type === "Fixed") {
            sale = (price - discount) * qty;
        } else if (v?.discount_type === "Percentage") {
            const discountedPrice = price - (price * discount / 100);
            sale = discountedPrice * qty;
        }

        orderData.push({
            active: true,
            product_id: v?.product ? v?.product?.id : v?.id,
            code: v?.product ? v?.product?.code : v?.code,
            username: name,
            userId: userId,
            name: v?.name,
            shop: info?.shopname,
            price: price,
            discount: discount,
            discount_type: v?.discount_type,
            sellprice: sale,
            qty: qty,
            contact: values?.phone,
            date: getFormattedDate(),
            deliverydate: values?.deliverydate
        });
    });
    return {
        shop: info?.shopname,
        customername: name,
        userId: userId,
        date: getFormattedDate(),
        paymentmethod: values?.pay_type,
        methodname: "Online",
        total: lastTotal,
        packing: paking,
        delivery: delivary,
        lastdiscount: values?.lastdiscount,
        previousdue: due,
        pay_type: values?.pay_type,
        paidamount: values?.pay,
        amount: lastTotal - values?.pay,
        orders: orderData,
        updatedata: allData,
        deliverydate: values?.deliverydate,
        special_discount: special_discount,
        sup_invo: values?.sup_invo,
        status:values?.status
    }
}


export async function EditPrepareOrderData(allData, userId, name, values, info) {
    let orderData = [];
    allData?.forEach((v) => {
        let sale = 0;
        const price = parseInt(v?.price) || 0;
        const discount = parseInt(v?.discount) || 0;
        const qty = parseInt(v?.qty) || 0;
        if (v?.discount_type === "Fixed") {
            sale = (price - discount) * qty;
        } else if (v?.discount_type === "Percentage") {
            const discountedPrice = price - (price * discount / 100);
            sale = discountedPrice * qty;
        }

        orderData.push({
            active: true,
            product_id: v?.product ? v?.product?.id : v?.id,
            code: v?.product ? v?.product?.code : v?.code,
            username: name,
            userId: userId,
            name: v?.name,
            shop: info?.shopname,
            price: price,
            discount: discount,
            discount_type: v?.discount_type,
            sellprice: sale,
            qty: qty,
            contact: values?.phone,
            date: getFormattedDate(),
            deliverydate: values?.deliverydate,
        });
    });
    return orderData
}


export function PrepareWholeSaleData(allData, userId, name, values, info, lastTotal, paking, delivary, due, special_discount) {
    let orderData = [];
    allData?.forEach((v) => {
        let sale = 0;
        const price = parseInt(v?.cost) || 0;
        const discount = parseInt(v?.discount) || 0;
        const qty = parseInt(v?.qty) || 0;
        if (v?.discount_type === "Fixed") {
            sale = (price - discount) * qty;
        } else if (v?.discount_type === "Percentage") {
            const discountedPrice = price - (price * discount / 100);
            sale = discountedPrice * qty;
        }

        orderData.push({
            active: true,
            product_id: v?.id,
            code: v?.code,
            username: name,
            userId: userId,
            name: v?.name,
            shop: info?.shopname,
            price: price,
            discount: discount,
            discount_type: v?.discount_type,
            sellprice: sale,
            qty: qty,
            contact: values?.phone,
            date: getFormattedDate(),
            deliverydate: values?.deliverydate
        });
    });

    return {
        shop: info?.shopname,
        customername: name,
        userId: userId,
        date: getFormattedDate(),
        paymentmethod: values?.pay_type,
        methodname: "Online",
        total: lastTotal,
        packing: paking,
        delivery: delivary,
        lastdiscount: values?.lastdiscount,
        previousdue: due,
        pay_type: values?.pay_type,
        paidamount: values?.pay,
        amount: lastTotal - values?.pay,
        orders: orderData,
        deliverydate: values?.deliverydate,
        special_discount: special_discount,
        sup_invo: values?.sup_invo,
        status:values?.status
    }
}


export async function PrepareData(allData, userId, name, values, info, lastTotal, paking, delivary, due, sup_invo, special_discount) {
    let orderData = [];
    allData?.forEach((v) => {
        let sale = 0;
        const price = parseInt(v?.price) || 0;
        const discount = parseInt(v?.discount) || 0;
        const qty = parseInt(v?.qty) || 0;
        if (v?.discount_type === "Fixed") {
            sale = (price - discount) * qty;
        } else if (v?.discount_type === "Percentage") {
            const discountedPrice = price - (price * discount / 100);
            sale = discountedPrice * qty;
        }

        orderData.push({
            active: true,
            product_id: v?.product ? v?.product?.id : v?.id,
            code: v?.product ? v?.product?.code : v?.code,
            username: name,
            userId: userId,
            name: v?.name,
            shop: info?.shopname,
            price: price,
            discount: discount,
            discount_type: v?.discount_type,
            sellprice: sale,
            qty: qty,
            contact: values?.phone,
            date: getFormattedDate(),
            deliverydate: values?.deliverydate
        });
    });

    return {
        shop: info?.shopname,
        customername: name,
        userId: userId,
        date: getFormattedDate(),
        paymentmethod: values?.pay_type,
        methodname: "Online",
        total: lastTotal,
        packing: paking,
        delivery: delivary,
        lastdiscount: values?.lastdiscount,
        previousdue: due,
        pay_type: values?.pay_type,
        paidamount: values?.pay,
        amount: lastTotal - values?.pay,
        orders: orderData,
        deliverydate: values?.deliverydate,
        special_discount: special_discount,
        sup_invo: sup_invo,
        status:values?.status
    }
}


export async function CalculateAmount(allData, delivary = 0, paking = 0, lastdiscount = 0, spDis = 0) {

    let amount = allData?.reduce((acc, item) => {
        let cost = item?.cost ? item?.cost : item?.price
        let discount = item?.discount;
        if (item?.discount_type === "Fixed") {
            let price = cost - discount
            return acc + (parseInt(item?.qty) * price)
        } else {
            let dis = cost * discount / 100;
            return acc + (parseInt(item?.qty) * cost - dis)
        }

    }, 0);

    return {
        amount: parseInt(amount),
        lastTotal: parseInt(amount) + parseInt(delivary) + parseInt(paking) - parseInt(lastdiscount) - parseInt(spDis)
    }
}




export function DiscountCal(itm) {

    let sale = 0;
    const price = parseInt(itm?.price) || 0;
    const cost = parseInt(itm?.cost ? itm?.cost : itm?.price);
    const discount = parseInt(itm?.discount) || 0;
    if (price != cost) {
        sale = price
    } else {
        if (itm?.discount_type === "Fixed") {
            sale = (price - discount);
        } else if (itm?.discount_type === "Percentage") {
            const discountedPrice = price - (price * discount / 100);
            sale = discountedPrice;
        }
    }
    return parseInt(sale)
}


export function DiscountCalculate(itm) {

    let sale = 0;
    const price = parseInt(itm?.price);
    const cost = parseInt(itm?.cost ? itm?.cost : itm?.price);
    const discount = parseInt(itm?.discount);
    const qty = parseInt(itm?.qty);
    if (price == cost) {
        if (itm?.discount_type === "Fixed") {
            sale = (price - discount) * qty;
        } else if (itm?.discount_type === "Percentage") {
            const discountedPrice = price - (price * discount / 100);
            sale = discountedPrice * qty;
        }
    } else {
        sale = price
    }

    return parseInt(sale)
}


export function BanglaToEnglish(v) {
    if (typeof v !== 'string') v = String(v);

    const banglaDigits = {
        '০': '0',
        '১': '1',
        '২': '2',
        '৩': '3',
        '৪': '4',
        '৫': '5',
        '৬': '6',
        '৭': '7',
        '৮': '8',
        '৯': '9',
        '০': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9'
    };


    let num = v.split('').map(char => banglaDigits[char] || char).join('');
    return num - 0
};

export function numberToWords(num) {
    if (num === 0) return "Zero Taka Only";

    const ones = [
        "", "One", "Two", "Three", "Four", "Five", "Six",
        "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
        "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
        "Eighteen", "Nineteen"
    ];

    const tens = [
        "", "", "Twenty", "Thirty", "Forty", "Fifty",
        "Sixty", "Seventy", "Eighty", "Ninety"
    ];

    const twoDigits = (n) => {
        if (n === 0) return "";
        if (n < 20) return ones[n];
        return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    };

    const threeDigits = (n) => {
        if (n === 0) return "";
        const hundred = Math.floor(n / 100);
        const rest = n % 100;
        let s = "";
        if (hundred) s += ones[hundred] + " Hundred";
        if (rest) s += (s ? " " : "") + twoDigits(rest);
        return s;
    };

    // Indian scales: after the rightmost 3 digits, take groups of 2
    const scales = ["Thousand", "Lakh", "Crore", "Arab", "Kharab"];

    const abs = Math.floor(Math.abs(num));
    const units = abs % 1000;                 // rightmost 3 digits
    let higher = Math.floor(abs / 1000);      // everything to the left of 3-digit group

    const parts = [];

    // process 2-digit groups for Thousand, Lakh, Crore, ...
    let i = 0;
    while (higher > 0 && i < scales.length) {
        const group = higher % 100;             // take 2 digits
        if (group) parts.unshift(`${twoDigits(group)} ${scales[i]}`);
        higher = Math.floor(higher / 100);
        i++;
    }

    if (units) parts.push(threeDigits(units));

    return parts.join(" ").trim() + " Taka Only";
}


export function ReturnSaleCode(type) {
    let saleType = "SL"
    if (type === "Sale") {
        saleType = "SL"
    } else if (type === "Sale Return") {
        saleType = "SR"
    } else if (type === "Return Purchase") {
        saleType = "PR"
    } else if (type === "Purchase items") {
        saleType = "PO"
    } else if (type === "Opening") {
        saleType = "OP"
    } else if (type === "Make Payment") {
        saleType = "MP"
    } else if (type === "Yearly Bonus") {
        saleType = "YB"
    }

    return saleType
}
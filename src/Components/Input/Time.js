export function getFormattedDate() {
    const date = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-EN', options);
}

export function convertToBengaliNumber(num) {
    if (num === null || num === undefined || num === "") return "";

    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (digit) => bengaliDigits[digit]);
}


export function handleDateConvert(date) {
    const formatted = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return formatted
};

export function formatDate(isoString) {
    const date = new Date(isoString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

export function formatShortDate(isoString) {
    const date = new Date(isoString);

    const day = String(date.getDate()).padStart(2, '0'); // ensures 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export async function PrepareOrderData(allData, userId, name, values, info, lastTotal, paking, delivary, due, special_discount) {
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
            product_id: v?.product ? v?.product?.id : v?.id,
            code: v?.product ? v?.product?.code : v?.code,
            username: name,
            userId: userId,
            name: v?.name,
            shop: info?.shopname,
            cost: price,
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
    let return_amount = lastTotal - values?.pay;
    let final_amount = due + return_amount

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
        amount: final_amount,
        orders: orderData,
        updatedata: allData,
        deliverydate: values?.deliverydate,
        special_discount: special_discount,
        sup_invo: values?.sup_invo,
        status: values?.status
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
            cost: price,
            price: price,
            discount: discount,
            discount_type: v?.discount_type,
            sellprice: sale,
            qty: qty,
            type: v?.type,
            contact: values?.phone,
            date: v?.date,
            deliverydate: v?.deliverydate,
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
            cost: price,
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
    let return_amount = values?.pay - lastTotal;
    let final_amount = due + return_amount

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
        amount: final_amount,
        orders: orderData,
        deliverydate: values?.deliverydate,
        special_discount: special_discount,
        sup_invo: values?.sup_invo,
        status: values?.status
    }
}


export async function PreparePurchaseReData(allData, userId, name, values, info, lastTotal, paking, delivary, due, sup_invo, special_discount) {
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
            cost: price,
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
    let return_amount = values?.pay - lastTotal
    let final_amount = due + return_amount
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
        amount: final_amount,
        orders: orderData,
        deliverydate: values?.deliverydate,
        special_discount: special_discount,
        sup_invo: sup_invo,
        status: values?.status
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
            cost: price,
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
    let return_amount = lastTotal - values?.pay
    let final_amount = due + return_amount
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
        amount: final_amount,
        orders: orderData,
        deliverydate: values?.deliverydate,
        special_discount: special_discount,
        sup_invo: sup_invo,
        status: values?.status
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
            return acc + (item?.qty * (cost - dis))
        }

    }, 0);

    return {
        amount: parseInt(amount),
        lastTotal: parseInt(amount) + parseInt(delivary) + parseInt(paking) - parseInt(lastdiscount) - parseInt(spDis)
    }
}


export async function CalculateEditAmount(allData, delivary = 0, paking = 0, lastdiscount = 0, spDis = 0) {

    let amount = allData?.reduce((acc, item) => {
        let cost = item?.cost ? item?.cost : item?.price
        let discount = item?.discount;
        if (item?.discount_type === "Fixed") {
            let price = cost - discount
            return acc + (parseInt(item?.qty) * price)
        } else {
            let dis = cost * discount / 100;
            return acc + (item?.qty * (cost - dis))
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
    if (num === 0) return "শূন্য টাকা মাত্র";

    const words = [
        "", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়", "দশ",
        "এগারো", "বারো", "তেরো", "চৌদ্দ", "পনেরো", "ষোল", "সতেরো", "আঠারো", "উনিশ",
        "বিশ", "একুশ", "বাইশ", "তেইশ", "চব্বিশ", "পঁচিশ", "ছাব্বিশ", "সাতাশ", "আটাশ", "ঊনত্রিশ",
        "ত্রিশ", "একত্রিশ", "বত্রিশ", "তেত্রিশ", "চৌত্রিশ", "পঁয়ত্রিশ", "ছত্রিশ", "সাঁইত্রিশ", "আটত্রিশ", "ঊনচল্লিশ",
        "চল্লিশ", "একচল্লিশ", "বিয়াল্লিশ", "তেতাল্লিশ", "চুয়াল্লিশ", "পঁয়তাল্লিশ", "ছেচল্লিশ", "সাতচল্লিশ", "আটচল্লিশ", "ঊনপঞ্চাশ",
        "পঞ্চাশ", "একান্ন", "বায়ান্ন", "তিপ্পান্ন", "চুয়ান্ন", "পঞ্চান্ন", "ছাপ্পান্ন", "সাতান্ন", "আটান্ন", "ঊনষাট",
        "ষাট", "একষট্টি", "বাষট্টি", "তেষট্টি", "চৌষট্টি", "পঁয়ষট্টি", "ছেষট্টি", "সাতষট্টি", "আটষট্টি", "ঊনসত্তর",
        "সত্তর", "একাত্তর", "বাহাত্তর", "তিয়াত্তর", "চুয়াত্তর", "পঁচাত্তর", "ছিয়াত্তর", "সাতাত্তর", "আটাত্তর", "ঊনআশি",
        "আশি", "একাশি", "বিরাশি", "তিরাশি", "চুরাশি", "পঁচাশি", "ছিয়াশি", "সাতাশি", "আটাশি", "ঊননব্বই",
        "নব্বই", "একানব্বই", "বিরানব্বই", "তিরানব্বই", "চুরানব্বই", "পঁচানব্বই", "ছিয়ানব্বই", "সাতানব্বই", "আটানব্বই", "নিরানব্বই"
    ];

    const threeDigits = (n) => {
        if (n === 0) return "";
        const hundred = Math.floor(n / 100);
        const rest = n % 100;
        let s = "";
        if (hundred) s += words[hundred] + " শত";
        if (rest) s += (s ? " " : "") + words[rest];
        return s;
    };

    const scales = ["হাজার", "লক্ষ", "কোটি", "আরব", "খরব"];

    const abs = Math.floor(Math.abs(num));
    const units = abs % 1000;
    let higher = Math.floor(abs / 1000);

    const parts = [];

    let i = 0;
    while (higher > 0 && i < scales.length) {
        const group = higher % 100;
        if (group) parts.unshift(`${words[group]} ${scales[i]}`);
        higher = Math.floor(higher / 100);
        i++;
    }

    if (units) parts.push(threeDigits(units));

    return parts.join(" ").trim() + " টাকা মাত্র";
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
    } else if (type === "Online Collection") {
        saleType = "MP"
    } else if (type === "Expense") {
        saleType = "EX"
    }

    return saleType
}
export function getFormattedDate() {
    const date = new Date();
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-EN', options);
}


export function handleDateConvert(date) {
    const formatted = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
    return formatted
};



export async function PrepareOrderData(allData, userId, name, values, info, lastTotal, paking, delivary, due) {
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
        paymentmethod: "",
        methodname: "",
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
        deliverydate: values?.deliverydate
    }
}


export async function PrepareData(allData, userId, name, values, info, lastTotal, paking, delivary, due) {
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
        paymentmethod: "",
        methodname: "",
        total: lastTotal,
        packing: paking,
        delivery: delivary,
        lastdiscount: values?.lastdiscount,
        previousdue: due,
        pay_type: values?.pay_type,
        paidamount: values?.pay,
        amount: lastTotal - values?.pay,
        orders: orderData,
        deliverydate: values?.deliverydate
    }
}


export async function CalculateAmount(allData, delivary = 0, paking = 0, lastdiscount = 0) {

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
        lastTotal: parseInt(amount) + parseInt(delivary) + parseInt(paking) - parseInt(lastdiscount)
    }
}








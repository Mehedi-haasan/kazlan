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



export async function PrepareOrderData(allData, userId, name, values, info) {
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
    return orderData
}


export async function PrepareData(allData, userId, name, values, info) {
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

    return orderData
}


export async function CalculateAmount(allData, delivary = 0, paking = 0) {
    let amount = allData?.reduce((acc, item) => {
        if (item?.discount_type === "Fixed") {
            let price = parseInt(parseInt(item?.price) - item?.discount);
            return acc + (parseInt(item?.qty) * parseInt(price))
        } else {
            let discount = parseInt(parseInt(item?.price) * parseInt(item?.discount) / 100);
            return acc + (parseInt(item?.qty) * parseInt(item?.price - discount))
        }

    }, 0);
    let lastamount = (parseInt(amount) + parseInt(delivary) + parseInt(paking))

    return {
        amount,
        lastamount
    }
}
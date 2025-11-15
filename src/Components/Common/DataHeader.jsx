


const DataHeader = ({ pruchase = "S. Price" }) => {
    return (
        <div className='text-[15px] grid grid-cols-12 text-black'>
            <div className="grid col-span-2">
                <div className="grid grid-cols-3 text-center">
                    <div className="p-2 text-center font-semibold border-y border-l">Action</div>
                    <div className="p-2 border-y border-l h-full">Qty</div>
                    <div className="p-2 border-y border-l">Year</div>
                </div>
            </div>
            <div className="p-2 border-y border-l grid col-span-2">Category</div>
            <div className="p-2 border-y border-l grid col-span-2">Brand</div>
            <div className="p-2 border-y border-l grid col-span-2">Item name</div>            
            <div className="grid col-span-4">
                <div className="grid grid-cols-5 text-center">
                    <div className="p-2 border-y border-l">M.R.P</div>
                    <div className="p-2 border-y border-l">Discount</div>
                    <div className="p-2 border-y border-l">Dis Type</div>
                    <div className="p-2 border-y border-l">{pruchase}</div>
                    <div className="p-2 border">Total</div>
                </div>
            </div>
        </div>
    )
}

export default DataHeader
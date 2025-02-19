import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BaseUrl from "../../Constant";


const CategoryShow = ({onChange}) => {
    const [data, setData] = useState([])
    const [selected, setSelected] = useState("")

    const fetchData = async () => {
        const response = await fetch(`${BaseUrl}/api/get/category/by/productValue`);
        const data = await response.json();
        setData(data.items)
    }
    useEffect(() => {
        // fetchData();
    }, [])


    return (
        <div className="grid grid-cols-12 z-50 w-[90%] mx-auto">

            {/* CategoryShow */}
            <div className="grid col-span-3 bg-[#FF0000] rounded-l">
                <ul className="w-full font-bold">
                    {data.map((item) => {
                        return <li onClick={()=>{onChange(false)}} onMouseEnter={() => { setSelected(item.name) }} className="hover:bg-white hover:text-black pl-5 py-1"><NavLink to={`/category/${item.id}/${item.name}`} className="flex py-1 text-sm rounded-lg">{item.name}</NavLink></li>
                    })}
                </ul>
            </div>

            <div className="grid col-span-9 rounded-r bg-white text-sm">
                <div>
                    {data.filter((item) => item.name === selected).map((data) => (
                        <div className={`grid grid-cols-2`}>{data.value.map((data) => {
                            return <div><NavLink to={`/product/details/${data.id}`} onClick={()=>{onChange(false)}} className={`text-black pl-4 py-1 font-semibold`}>{data.name}</NavLink></div>
                        })}</div>
                    ))}
                </div>
            </div>


            
        </div>
    );
};

export default CategoryShow;

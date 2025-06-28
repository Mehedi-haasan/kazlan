import { useEffect, useState, useRef } from 'react';
import InvoiceCard from '../Invoice/InvoiceCard';
import DownModal from '../Input/DownModal';
import PaymentTotal from './PaymentTotal';
import BaseUrl from '../../Constant';
import Tabeheader from '../Invoice/Tableheader';
import { useToImage } from '@hcorta/react-to-image'
import generatePDF from 'react-to-pdf';
import { useParams } from 'react-router-dom';
import InvoHeader from '../Invoice/InvoHeader';



const ReturnInvoice = ({ isOrder = true, }) => {

    const params = useParams();
    const targetRef = useRef();
    const option = { backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [isGen, setIsGen] = useState(false)
    const [user, setUser] = useState({});
    const [allData, setAllData] = useState([]);
    const [total, setTotal] = useState(0)


    const GetReturnProduct = async (id) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${BaseUrl}/api/get/order/${id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
            },
        });
        const data = await response.json();
        let amount = data?.items?.reduce((acc, item) => {
            return acc + parseInt(item?.sellprice)
        }, 0);
        setTotal(amount || 0)
        setAllData(data?.items);
        setUser(data?.user)
    }

    useEffect(() => {
        document.title = "Invoice "
        GetReturnProduct(params?.id)
    }, [params?.id])


    const PrintInvoice = () => {
        window.print()
    }

    return (
        <div className="min-h-screen">

            <div className='w-full mx-auto border rounded py-4 px-2'>
                <div className="bg-[#FFFFFF] rounded p-4">

                    <InvoHeader user={user} params={params} />



                    <div className='relative overflow-x-auto my-5'>
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <Tabeheader />
                            <tbody>

                                {allData?.map((item) => {
                                    return <InvoiceCard key={item?.id} item={item} />
                                })}
                                <PaymentTotal user={user} total={total} />

                            </tbody>
                        </table>
                    </div>
                </div>

                <DownModal show={isGen} handleClose={() => { setIsGen(false) }} className={`w-[800px] overflow-hidden overflow-y-auto`}>
                    <div className='max-h-[700px] '>
                        <div ref={ref} className=''>
                            <div ref={targetRef} className='bg-white w-[750px]'>
                                <div className="p-8">
                                    <InvoHeader user={user} params={params} />

                                    <div className='relative overflow-x-auto py-5'>
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                            <Tabeheader />
                                            <tbody>
                                                {allData?.map((item) => {
                                                    return <InvoiceCard key={item?.id} item={item} />
                                                })}
                                                <PaymentTotal user={user} total={total} />

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end items-end pr-8 gap-2'>
                            <button onClick={getPng} className='border rounded px-4 py-1.5 font-thin'>Download JPG</button>
                            <button onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} className='border rounded px-4 py-1.5 font-thin'>Download PDF</button>
                        </div>
                    </div>
                </DownModal>



                <div className="flex justify-end my-3 mr-2">
                    <button onClick={() => { setIsGen(true) }} className='border border-green-500 rounded-lg px-4 py-1.5 mx-3 font-thin'>PDF/PNG</button>
                    <button onClick={PrintInvoice} className='border border-green-500 rounded-lg px-4 py-1.5 mr-1 font-thin'>Print</button>

                </div>
            </div>



        </div>
    );
}

export default ReturnInvoice;
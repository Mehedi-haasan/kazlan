import { useState, useEffect } from "react"
import InputComponent from "../Input/InputComponent"
import BaseUrl from '../../Constant';
import Button from "../Input/Button";
import Notification from "../Input/Notification";
import logo from '../Logo/userProfile.png'
import SelectionComponent from "../Input/SelectionComponent";
import { useNavigate } from "react-router-dom";


const CreateAttribute = ({ entries }) => {

    const [image_url, setImage_Url] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [values, setValues] = useState({ name: "", });
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });
     const [showlotti, setLottiShow] = useState(false);
     const [show, setShow] = useState(false);
    const [first, setFirst] = useState({
        first: true,
        value: 'Select a filter'
    })
    const goto = useNavigate()


    useEffect(() => {
        document.title = `Brand - Kazaland Brothers`;

    }, []);


    const handleCreate = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/attribute`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setShow(false);
            setLottiShow(true)
            setValues({ ...values, name: '' })
            setMessage({ id: Date.now(), mgs: data?.message });
            goto('/attribute')
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }

    const handleCreateLocally = async () => {
        if (BaseUrl === "http://localhost:8050") {
            return
        }
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8050/api/create/attribute`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setShow(false);
            setLottiShow(true)
            setValues({ ...values, name: '' })
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }


    return (
        <div className="px-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                <div className="border-b">
                    <h1 className="pl-5 text-xl py-2">Attribute Details</h1>
                </div>
                <div className="px-6 py-4">
                    <SelectionComponent options={[{ id: 0, name: 'Payment Type' }, { id: 1, name: 'Bank Transfar' }, { id: 2, name: "Mobile Banking" }, { id: 3, name: 'Edition' }, { id: 4, name: 'Quantity' },, { id: 5, name: 'Expense' }]} default_select={first?.first} default_value={first?.value}
                        onSelect={(v) => {
                            setValues({
                                ...values,
                                type: v?.name,
                            })
                            setFirst({ ...first, value: v?.name })
                        }} label={"Type*"} className='rounded-r' />
                    <InputComponent placeholder={`Enter name`} input_focus={true} value={values?.name} label={`Name`} handleEnter={() => { handleCreate(); handleCreateLocally() }} onChange={(e) => { setValues({ ...values, name: e }) }} className='lg:text-lg font-thin' />
                    <Button isDisable={isLoading} name="Create" onClick={() => { handleCreate(); handleCreateLocally() }} className="mt-3 border bg-blue-500 text-white font-thin text-lg" />
                </div>
            </div>
        </div>
    )
}

export default CreateAttribute
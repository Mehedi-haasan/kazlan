import React, { useEffect, useState } from 'react';
import InputComponent from '../Input/InputComponent';
import Button from '../Input/Button';
import BaseUrl from '../../Constant'

const Company = () => {

    const [values, setValues] = useState({})

    const PostInfo = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/create/company/info`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
    }

    const UpdateInfo = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/update/company/info`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
    }



    const GetCompanyInfo = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/company/info`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json();
        setValues(data?.items)
    }

    useEffect(() => {
        GetCompanyInfo()
    }, [])


    return (
        <div>
            <InputComponent onChange={(e) => { setValues({ ...values, name: e }) }} label={'Company Name'} placeholder={values?.name || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, email: e }) }} label={'Email'} placeholder={values?.email || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, email2: e }) }} label={'2nd Email'} placeholder={values?.email2 || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, phone: e }) }} label={'Phone'} placeholder={values?.phone || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, phone2: e }) }} label={'2nd Phone'} placeholder={values?.phone2 || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, address: e }) }} label={'Address'} placeholder={values?.address || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, fb_url: e }) }} label={'Facebook Url'} placeholder={values?.fb_url || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, yu_url: e }) }} label={'Youtube Url'} placeholder={values?.yu_url || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, wh_url: e }) }} label={'Whatsapp Url'} placeholder={values?.wh_url || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, tw_url: e }) }} label={'Tweitter Url'} placeholder={values?.tw_url || 'N/A'} />
            <InputComponent onChange={(e) => { setValues({ ...values, description: e }) }} label={'Description'} placeholder={values?.description || 'N/A'} />
            {values ? <Button onClick={UpdateInfo} name={'Update'} /> : <Button onClick={PostInfo} name={'Create'} />}
        </div>
    );
};

export default Company;
import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const data = [
    {
        id: 1,
        name: "Mehedi Hasan",
        position: "Frontend Developer",
        department: "Engineering",
        email: "mehedi@example.com",
        joiningDate: "2022-01-15",
        salary: 55000,
    },
    {
        id: 2,
        name: "Sarah Khan",
        position: "UI/UX Designer",
        department: "Design",
        email: "sarah@example.com",
        joiningDate: "2021-11-10",
        salary: 50000,
    },
    {
        id: 3,
        name: "Rifat Karim",
        position: "Backend Developer",
        department: "Engineering",
        email: "rifat@example.com",
        joiningDate: "2020-07-23",
        salary: 60000,
    },
    {
        id: 4,
        name: "Nadia Rahman",
        position: "HR Manager",
        department: "HR",
        email: "nadia@example.com",
        joiningDate: "2019-05-30",
        salary: 52000,
    },
    {
        id: 5,
        name: "Tanvir Islam",
        position: "Project Manager",
        department: "Management",
        email: "tanvir@example.com",
        joiningDate: "2018-03-18",
        salary: 75000,
    }
];


const ExcelSheet = ({ filename = 'data.xlsx', buttonLabel = 'Export to Excel' }) => {
    const exportToExcel = () => {
        if (!data || data.length === 0) {
            alert('No data to export!');
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, filename);
    };

    return (
        <button
            onClick={exportToExcel}
            style={{
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
        >
            {buttonLabel}
        </button>
    );
};

export default ExcelSheet;

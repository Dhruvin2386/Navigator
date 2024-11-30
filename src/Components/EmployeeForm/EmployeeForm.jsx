import React, { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const EmployeeForm = () => {
    
    const [inputValue, setInputValue] = useState({
        name: "",
        age: "",
        email: "",
        phoneNumber: "",
        password: "",
        city: "",
        address: "",
    });

    const [storage, setStorage] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); 

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("employees")) || [];
        setStorage(storedData);


    }, []);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setInputValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const storedData = JSON.parse(localStorage.getItem("employees")) || [];


        if (editingIndex !== null) {
            const updatedStorage = [...storage];
            updatedStorage[editingIndex] = inputValue;

            setStorage(updatedStorage);
            localStorage.setItem("employees", JSON.stringify(updatedStorage));
            setEditingIndex(null);

        } else {
            const newStorage = [...storedData, inputValue];
            setStorage(newStorage);
            localStorage.setItem("employees", JSON.stringify(newStorage));
        }

        setInputValue({
            name: "",
            age: "",
            email: "",
            phoneNumber: "",
            password: "",
            city: "",
            address: "",
        });
    };

    const handleEdit = (index) => {

        const employee = storage[index];
        setInputValue(employee);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updatedStorage = storage.filter((_, i) => i !== index);
        setStorage(updatedStorage);
        localStorage.setItem("employees", JSON.stringify(updatedStorage));
    };

    const handleSort = () => {
        const sortedStorage = [...storage].sort((rec1, rec2) => rec1.name.localeCompare(rec2.name));
        setStorage(sortedStorage);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredEmployees = storage.filter((employee) =>
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleView = () => {

        console.log("Click");
        
    }

    return (
        <>
            <div className="container" style={{ display: "block", width: 1200, padding: 30 }}>
                <h2 className="text-center mb-5">Employee Form</h2>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6 mb-2">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter Name" onChange={handleChange} value={inputValue.name} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" name="age" placeholder="Enter Age" onChange={handleChange} value={inputValue.age} />
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email" onChange={handleChange} value={inputValue.email} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleChange} value={inputValue.phoneNumber} />
                    </div>
                    <div className="col-md-6 mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" onChange={handleChange} value={inputValue.password} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name="city" placeholder="Enter City" onChange={handleChange} value={inputValue.city} />
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St" onChange={handleChange} value={inputValue.address} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-dark">{editingIndex !== null ? "Update" : "Submit"}</button>
                    </div>
                </form>
            </div>

            <h2 className="text-center mb-5">Employee Data</h2>

            <div className="container mb-3">
                <div className="col-5">
                    <input type="text" className="form-control" placeholder="Search by name" value={searchQuery} onChange={handleSearch}/>
                </div>
            </div>


            
            <div className="container" style={{ marginTop: "100px" }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">PhoneNumber</TableCell>
                            <TableCell align="right">Password</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEmployees.map((employee, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.age}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.phoneNumber}</TableCell>
                                    <TableCell>{employee.password}</TableCell>
                                    <TableCell>{employee.city}</TableCell>
                                    <TableCell>{employee.address}</TableCell>
                                    <TableCell>
                                        <button className="btn btn-dark" onClick={() => handleEdit(index)}>Edit</button> ||
                                        <button className="btn btn-dark" onClick={() => handleDelete(index)}>Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default EmployeeForm;

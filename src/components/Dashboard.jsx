import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { jwtDecode as jwt_decode} from "jwt-decode";
import { useNavigate } from 'react-router-dom';

import BookList from './BookList';
import SearchBox from './SearchBox';
import Navbar from './Navbar';
import UseFetch from './UseFetch';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col, Button} from 'react-bootstrap';

 
const Dashboard = () => {
    const [term, setTerm] = useState('How to Code');
	const {data:books,isLoading,error}=UseFetch(`https://www.googleapis.com/books/v1/volumes?q=${term}&key=AIzaSyBnmBCjGXeUW-q9_jUXPZmYsgURbHiYq58`)

    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        refreshToken();
        getUsers();
    }, []);
 
    const refreshToken = async () => {
        try {
           const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    }
 
    const axiosJWT = axios.create();
 
    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
 
    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setUsers(response.data);
    }
 
    return (
        <div>
            <>
            <Navbar />
        <div className="container mt-5">
            <h1>Welcome Back: {name}</h1>
           
            <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                        </tr>
                    ))}
                <div className='header'>
					<div className='overlay'>
						<h2 className='Heading-text'>Books on {term}</h2>

						<SearchBox searchBooks={(search) => setTerm(search)} />
					</div>
				</div>
                <div className='max-w-7xl mx-auto'>
					{!isLoading && <BookList books={books} />}
				</div>
				{error && (
					<div className='text-center md:text-2xl font-mono font-bold mt-3'>
						{error}
					</div>
                    )}
            </tbody>
        </div>
        </>
        </div>
        
    );
}
 
export default Dashboard
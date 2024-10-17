import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
	const navigate = useNavigate();
 
    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
	
	return (
		<div>
			<div className='logo'>
				<h1 className='lg:text-3xl'>The Slightly Better Searcher</h1>
				<nav>
					<ul className='flex ml-5'>
						<li>
							<a href="/dashboard" className='mr-5 focus:text-black'>
								Home
							</a>
						</li>
						</ul>
						
						<button onClick={Logout} className="button is-light">
                                    Log Out
                                </button>
						
					
				</nav>
			</div>
		</div>
	);
}
export default Navbar
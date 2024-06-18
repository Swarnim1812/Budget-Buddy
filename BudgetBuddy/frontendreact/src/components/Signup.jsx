import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Signup = () => {
    const history = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastname: '',
        phone_number: '',
        email: '',
        password: '',
        userType: ''
    });

    let name, value;

    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    };

    const PostData = async (e) => {
        e.preventDefault();
        const { firstName, lastname, phone_number, email, password, userType } = user;
        console.log("hello");
        const res = await fetch('http://localhost:5000/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName: lastname,
                phone_number,
                email,
                password,
                userType
            })
        });
        if (res.ok) {
            window.alert('Registration Successful');
            console.log('Registration Successful');
            if(userType.toLowerCase() === "trader")history('/collections');
            else history('/login');
        }
        else if (res.status === 400) {
            const data = await res.json();
            console.log(data);
            window.alert(data.error.message);
        }
    };

    return (

        <div className='signup'>
            <div className='signuppage'>
                <form className='signupform' id='register-form'>
                    <h1>Sign Up</h1>
                        <input
                            className='forminput'
                            type='text'
                            name='firstName'
                            id='firstName'
                            autoComplete='off'
                            value={user.firstName}
                            onChange={handleInputs}
                            placeholder='First Name'
                        />

                    <div className='form-group'>
                        <input
                            className='forminput'
                            type='text'
                            name='lastname'
                            id='lastname'
                            autoComplete='off'
                            value={user.lastname}
                            onChange={handleInputs}
                            placeholder='Last Name'
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            className='forminput'
                            type='number'
                            name='phone_number'
                            id='phone_number'
                            autoComplete='off'
                            value={user.phone_number}
                            onChange={handleInputs}
                            placeholder='Phone'
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            className='forminput'
                            type='email'
                            name='email'
                            id='email'
                            autoComplete='off'
                            value={user.email}
                            onChange={handleInputs}
                            placeholder='Email'
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            className='forminput'
                            type='password'
                            name='password'
                            id='password'
                            autoComplete='off'
                            value={user.password}
                            onChange={handleInputs}
                            placeholder='Password'
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            className='forminput'
                            type='text'
                            name='userType'
                            id='userType'
                            autoComplete='off'
                            value={user.userType}
                            onChange={handleInputs}
                            placeholder='User / Trader'
                        />
                    </div>

                    <div className='form-group form-button'>
                        <input
                            type='submit'
                            name='signup'
                            id='signup'
                            className='signupbtn'
                            value='REGISTER'
                            onClick={PostData}
                        />
                    </div>
                    <NavLink to='http://localhost:3000/login' className='alreadyacc'>
                        Already have an Account?
                    </NavLink>
                </form>
            </div>
        </div>
    )
}

export default Signup;

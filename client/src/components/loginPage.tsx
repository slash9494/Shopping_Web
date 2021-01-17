import React, {useState, ChangeEvent, FormEvent} from 'react'
import styled from 'styled-components'

const LoginBlock = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    background:black;
    color:white;
    cursor:pointer;
    outline:none;
    border:none;
    border-radius:4px;
    font-size:16px;
    padding-left:16px;
    padding-right:16px;
    height:100%;
    font-weight:bold;
    &:hover{background: #495057;}
`;


function LoginPage () {
    const [inputs,setInputs] = useState({
        email:'',
        password:''
    });
    const {email,password} = inputs

    const onChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {value,name} =e.target ;
        setInputs({
            ...inputs,
            [name] : value
        });
    }


    const onSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <LoginBlock>
            <Form onSubmit={onSubmit}>
                <label>Email</label>
                <input type='email' name='email' onChange={onChange} value={email}/>
                <label>Password</label>
                <input type="password" name='password' onChange={onChange} value={password}/>
                <br/>
                <Button type='submit'>Login</Button>
            </Form>
        </LoginBlock>
        
        
    );
}

export default LoginPage;
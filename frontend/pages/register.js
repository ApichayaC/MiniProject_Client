
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'
import { Form, Input, Button, message } from 'antd'
import { useRouter } from 'next/router'
import { Footer } from 'antd/lib/layout/layout'
import loginCss from '../styles/Login.module.css'


export default function Register({ token }) {
    const router = useRouter()

    const [user,setUser]=useState({
        name:"",
        surname:"",
        email:"",
        username:"",
        password:"",
        confirmpassword:""
    })

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish = async () => {
        const { username, password, confirmpassword, email, name, surname } = { ...user }
        console.log(user.email.includes('@'));
        if(!user.email.includes('@')){
            return message.error('wrong email')
        }
        if (password !== confirmpassword) {
            return message.error('Password not match');
        } else {
            const users = await axios.post(config.URL + "/api/register", { username, password, email, name, surname })
            console.log(users.data);
            if (users.data.register) {
                message.success(users.data.message)
                router.push('/')
            } else {
                message.error(users.data.message);
            }
        }


    };

    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <Navbar />
            <div style={{ backgroundColor: "#e8b298", height: "100vh" }}>
                <div className={loginCss.form}>
                    <div >
                        {/*<Footer>
                    <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'surname']} label="Surname" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'username']} label="username" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item name={['user', 'confirmPassword']} label="Confrim Password" rules={[{ required: true }]}>
                            <Input.Password />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                </Button>
                        </Form.Item>
                    </Form>
                </Footer>*/}
                        <div className="container" id="container">

                            <div className="form-container sign-in-container">
                                <form >
                                    <h1>Register</h1>
                                    <input onChange={e => setUser({ ...user, username: e.target.value })} type="text" placeholder="Username" />
                                    <input onChange={e => setUser({ ...user, name: e.target.value })} type="text" placeholder="name" />
                                    <input onChange={e => setUser({ ...user, surname: e.target.value })} type="text" placeholder="surname" />
                                    <input onChange={e => setUser({ ...user, email: e.target.value })} type="email" placeholder="E-mail" />
                                    <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" />
                                    <input onChange={e => setUser({ ...user, confirmpassword: e.target.value })} type="password" placeholder="Confrim Password" />
                                    <button onClick={onFinish}>Register</button>
                                </form>
                            </div>
                            <div className="overlay-container">
                                <div className="overlay">
                                    <div className="overlay-panel overlay-left">
                                        <h1>Welcome Back!</h1>
                                        <p>
                                            To keep connected with us please login with your personal info
</p>
                                        <button className="ghost" id="signIn">
                                            Sign In
</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <style jsx>{`
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");

* {
box-sizing: border-box;
}

body {
background: #f6f5f7;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
font-family: "Montserrat", sans-serif;
height: 100vh;
margin: -20px 0 50px;
}

h1 {
font-weight: bold;
margin: 0;
}

h2 {
text-align: center;
}

p {
font-size: 14px;
font-weight: 100;
line-height: 20px;
letter-spacing: 0.5px;
margin: 20px 0 30px;
}

span {
font-size: 12px;
}

a {
color: #333;
font-size: 14px;
text-decoration: none;
margin: 15px 0;
}

button {
border-radius: 20px;
border: 1px solid #ff4b2b;
background-color: #ff4b2b;
color: #ffffff;
font-size: 12px;
font-weight: bold;
padding: 12px 45px;
letter-spacing: 1px;
text-transform: uppercase;
transition: transform 80ms ease-in;
}

button:active {
transform: scale(0.95);
}

button:focus {
outline: none;
}

button.ghost {
background-color: transparent;
border-color: #ffffff;
}

form {
margin:30px;

background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 50px;
height: 100%;
text-align: center;
}

input {
background-color: #eee;
border: none;
padding: 12px 15px;
margin: 8px 0;
width: 100%;
}

.container {
background-color: #fff;
border-radius: 10px;
box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
0 10px 10px rgba(0, 0, 0, 0.22);
position: relative;
overflow: hidden;
width: 768px;
max-width: 100%;
min-height: 480px;
}

.form-container {
top: 0;
height: 100%;
transition: all 0.6s ease-in-out;
}

.sign-in-container {
left: 0;

width: 50%;
z-index: 2;
}


@keyframes show {
0%,
49.99% {
opacity: 0;
z-index: 1;
}

50%,
100% {
opacity: 1;
z-index: 5;
}
}

.overlay-container {
position: absolute;
top: 0;
left: 50%;
width: 50%;
height: 100%;
overflow: hidden;
transition: transform 0.6s ease-in-out;
z-index: 100;
}

.container.right-panel-active .overlay-container {
transform: translateX(-100%);
}

.overlay {
background: #ff416c;
background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
background: linear-gradient(to right, #ff4b2b, #ff416c);
background-repeat: no-repeat;
background-size: cover;
background-position: 0 0;
color: #ffffff;
position: relative;
left: -100%;
height: 100%;
width: 200%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
transform: translateX(50%);
}

.overlay-panel {
position: absolute;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 0 40px;
text-align: center;
top: 0;
height: 100%;
width: 50%;
transform: translateX(0);
transition: transform 0.6s ease-in-out;
}

.overlay-left {
transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
transform: translateX(0);
}

.overlay-right {
right: 0;
transform: translateX(0);
}

.container.right-panel-active .overlay-right {
transform: translateX(20%);
}


`}</style>
                </div>
            </div>
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

import Head from 'next/head'
import Layout from '../components/layout'
import { Form, Input, Button, message, Space } from 'antd';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router'
import axios from 'axios'
import config from '../config/config'
import 'bootstrap/dist/css/bootstrap.css'
import { Footer } from 'antd/lib/layout/layout';
import loginCss from '../styles/Login.module.css'
import { useState } from 'react';

export default function Login({ token }) {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const onFinish = async () => {
        if (!user.username || !user.password) message.error('invalid user or password')
        else {

            const data = await axios.post(config.URL + "/api/login", { ...user }, { withCredentials: true })
            if (data.data.token) {
                message.success(data.data.message)
                router.push('/')
            } else {
                message.error(data.data.message)
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        // <div>
        //     <Head>
        //         <title>login</title>
        //     </Head>
        //     <Navbar />

        //     <div class="input-group mb-3">
        //         <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
        //         <div class="col-sm-10">
        //             <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
        //                 label="Username"
        //                 name="username"
        //                 rules={[{ required: true, message: 'Please input your username!' }]}></input>
        //         </div>

        //     </div>

        //     <div class="input-group mb-3 ">
        //         {/* <label for="inputPassword" class="col-sm-2 col-form-label">Password</label> */}
        //         <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
        //         <div class="col-sm-10">
        //             <input type="password" class="form-control" id="inputPassword"
        //                 label="Password"
        //                 name="password"
        //                 rules={[{ required: true, message: 'Please input your password!' }]}></input>
        //         </div>
        //     </div>

        // </div>
        <Layout >
            <Head>
                <title>login</title>
            </Head>
            <div style={{ backgroundColor: "#e8b298" }}>
                <Navbar />
                <div className="space-align-container" className={loginCss.form} >
                    <div className="space-align-block" >
                        {/* <Space align="center" style={{ alignItems: "baseline" }}>
                            <Footer>
                                

                            </Footer>
                        </Space>
                    </div>
                </div> */}
                        <div className="container" id="container">

                            <div className="form-container sign-in-container">
                                <form >
                                    <h1>Log in</h1>
                                    <span>or use your account</span>
                                    <input onChange={e => setUser({ ...user, username: e.target.value })} type="email" placeholder="Username" />
                                    <input onChange={e => setUser({ ...user, password: e.target.value })} type="password" placeholder="Password" />
                                    <button onClick={onFinish}>Sign In</button>
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
          position: absolute;
          top: 0;
          height: 100%;
          transition: all 0.6s ease-in-out;
        }

        .sign-in-container {
          left: 0;
          width: 50%;
          z-index: 2;
        }

        .container.right-panel-active .sign-in-container {
          transform: translateX(100%);
        }

        .sign-up-container {
          left: 0;
          width: 50%;
          opacity: 0;
          z-index: 1;
        }

        .container.right-panel-active .sign-up-container {
          transform: translateX(100%);
          opacity: 1;
          z-index: 5;
          animation: show 0.6s;
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

import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import { Form, Input, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'

export default function Login({ token }) {
    const allaction = bindActionCreators(allActions, useDispatch())

    const onFinish = (values) => {
        console.log('Success:', values);
        allaction.login({...values})
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input/>
                {/* <Input onChange={e => setUser({ ...user, username: e.target.value })} /> */}
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password/>
                {/* <Input.Password onChange={e => setUser({ ...user, password: e.target.value })} /> */}
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Login
            </Button>
            </Form.Item>
        </Form>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

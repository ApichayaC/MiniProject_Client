import { Form, Input, InputNumber, Button } from 'antd';
import { allActions } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import CatCard from '../components/catCard';
import { useEffect } from 'react';
import withAuth from '../components/withAuth'
import Navbar from '../components/navbar'

function Sell() {
    const allaction = bindActionCreators(allActions, useDispatch())
    const cats = useSelector(state => state.cats)

    const onFinish = async (values) => {
        console.log(values);
        allaction.addCat({ ...values.user })
        console.log("redux cat:", cats);
    };

    const validateMessages = {
        required: '${label} is required!',
    };
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    useEffect(()=>{
        allaction.getCats()
    },[])
    return (
        <div>
            <Navbar />
            <div>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'dob']} label="Date of Birthbay" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'sex']} label="Sex" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            ADD
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div>
                {
                    cats? cats.map((item,index)=>{
                        return(
                            <div key={index}>
                                <CatCard index={false} sell={true} cat={item}/>
                            </div>
                        )
                    }):""
                }
            </div>
        </div>
    )
}

export default withAuth(Sell)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}

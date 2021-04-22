import { Card } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { allActions } from '../store/actions'

const { Meta } = Card;
const CatCard = (props) => {
    const allaction = bindActionCreators(allActions, useDispatch())

    const sellCat = async () => {
        allaction.deleteCat(props.cat) ;
    }

    return (
        <div>
            <Card
                style={{ width: 300 }}
            
                actions={[
                    <SettingOutlined key="setting" onClick={sellCat}/>,
                    <EditOutlined key="edit" />,
                    //<EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    //avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={`${props.cat.id}.${props.cat.name}`}
                    description={`Date of Birth : ${props.cat.dob} Sex : ${props.cat.sex}`}
                    
                />
            </Card>
        </div>
    )
}

export default CatCard
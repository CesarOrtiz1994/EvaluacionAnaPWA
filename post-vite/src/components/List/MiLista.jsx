import React from 'react';
import { Avatar, List } from 'antd';
import './List.css';
const MiLista = (props) => {
    const data = props.notes;
    //console.log('Esta es la data', data);
    return (
        <List className='List'
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item >
                    <List.Item.Meta
                        avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                        title={item.title}
                        description={item.text}
                    />
                </List.Item>
            )}
        />
    );
}

export default MiLista;
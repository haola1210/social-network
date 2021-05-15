import React, { useState, useEffect, } from 'react';

import 'antd/dist/antd.css';
import { PageHeader, Button, Descriptions } from 'antd';

import CreateUser from "../CreateUser/CreateUser"
import ManageUser from "../ManageUser/ManageUser"

import "./AdminContainer.scss"
export default function AdminContainer () {

    const [state, setState] = useState(false);

    useEffect(() => {

    }, [])

    return(
        <div className="admin-container">
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={state?"Tạo mới tài khoản":"Quản lý tài khoản"}
                // subTitle="This is a subtitle"
                extra={[
                    <Button key="create" onClick={()=>setState(prev => !prev)} type={state?"primary":"default"}>
                        Tạo mới tài khoản
                    </Button>,
                    <Button key="manage" onClick={()=>setState(prev => !prev)} type={!state?"primary":"default"}>
                        Quản lý tài khoản
                    </Button>,
                ]}
            >
                {state && <CreateUser />}
                {!state && <ManageUser />}
            </PageHeader>
        </div>
    )
}
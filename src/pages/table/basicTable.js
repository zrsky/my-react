import React from 'react'
import { Card, Table, Tag, message } from 'antd'
import axios from '../../axios'

export default class BasicTable extends React.Component{

    state={
        dataSource: [],
        dataSource2: [],
        pagination: {},
        selectedRowKeys: [],
    }

    params={
        page: 1
    }

    componentDidMount() {
        const data = [{
            key: 1,
            name: 'Jshn Brown',
            age: 22,
            address: '河南省',
            tags: ['活泼','开朗']
        },{
            key: 2,
            name: 'Jshn Brown',
            age: 22,
            address: '河南省',
            tags: ['活泼','开朗']
        },{
            key: 3,
            name: 'Jshn Brown',
            age: 22,
            address: '河南省',
            tags: ['活泼','开朗']
        },{
            key: 4,
            name: 'Jshn Brown',
            age: 22,
            address: '河南省',
            tags: ['活泼','开朗']
        }];
        
        this.setState({
            dataSource: data
        })

        this.request();
    }

    request = ()=>{
        axios.ajax({
            type: 'get',
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((data) => {
            const pagination = {...this.state.pagination};
            pagination.pageSize = data.result['page_size'];
            pagination.total = data.result['total_count'];
            pagination.showQuickJumper = true;
            const list = data.result.list;
            list.map((item,index)=>{
                item.key = index;
            })
            this.setState({
                dataSource2: list,
            })
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log(filters)
        console.log(sorter)
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });

    }

    onSelectChange = (selectedRowKeys)=>{
        message.info(selectedRowKeys.join(), 1)
        this.setState({
            selectedRowKeys
        })
    }

    render(){

        const { selectedRowKeys } = this.state;

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },{
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },{
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
                </span>
            )
        }];
        const columns2 = [{
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
        },{
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            render: sex => <span>{sex === '2' ? '女' : '男'}</span>
        },{
            title: '状态',
            dataIndex: 'state',
            key: 'state',
        },{
            title: '爱好',
            dataIndex: 'interest',
            key: 'interest',
        },{
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '早起时间',
            dataIndex: 'time',
            key: 'time',
        },];
       
        const rowSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: this.onSelectChange

        }

        return(
            <div className="basicTable">
                <Card title="基础表格">
                    <Table columns={columns} dataSource={this.state.dataSource} pagination={false}/>
                </Card>
                <Card style={{marginTop:10}} title="动态数据渲染表格-mock">
                    <Table columns={columns2} dataSource={this.state.dataSource2} pagination={this.state.pagination} onChange={this.handleTableChange}/>
                </Card>
                <Card style={{marginTop:10}} title="表格单选">
                    <Table columns={columns} dataSource={this.state.dataSource} rowSelection={rowSelection} pagination={false}/>
                </Card>
            </div>
        )
    }
}
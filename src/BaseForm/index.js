import React from 'react'
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd'
import FormItem from 'antd/lib/form/FormItem';
import { getOptionList } from '../utils/utils'

// const FormItem = Form.Item;
// const Option = Select.Option;

class BaseForm extends React.Component{
    
    handleFormSubmit = (e)=>{
        const handleSubmit = this.props.handleSubmit;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            handleSubmit(values);
            console.log('Received values of form: ', values);
        }
        });
    }

    handleReset = ()=>{
        this.props.form.resetFields();
    }
    

    initFormList = ()=>{
        const formList = this.props.formList || [];
        const { getFieldDecorator } = this.props.form;
        const getFormList = [];

        formList.forEach((list)=>{
            let label = list.label;
            let field = list.field;
            let initialValue = list.initialValue || '';
            let placeholder = list.placeholder;
            let width = list.width;
            if(list.type === 'select') {
                const select = <FormItem label={label}>
                {getFieldDecorator(field)(
                    <Select style={{width:width}} placeholder={placeholder}>
                        { getOptionList(list.list) }
                    </Select>
                )}
            </FormItem>
            getFormList.push(select);
            }else if(list.type === '时间查询'){
                const startTime = <FormItem label={list.label}>
                {getFieldDecorator('start_time')(
                    <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="开始时间"
                    />
                )}
            </FormItem>
            const endTime = <FormItem label="~" colon={false}>
                {getFieldDecorator('end_time')(
                    <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="结束时间"
                    />
                )}
            </FormItem>
            getFormList.push(startTime, endTime);
            }else if(list.type === 'checkbox'){
                const checkbox = <FormItem label={label}>
                {getFieldDecorator(field, {
                    valuePropName: 'checked',
                    initialValue: true,
                })(
                    <Checkbox>{label}</Checkbox>
                )}
                </FormItem>
                getFormList.push(checkbox);
            }else if(list.type === 'input'){
                const input = <FormItem label={label}>{getFieldDecorator(field, {
                    initialValue: initialValue,
                })(
                    <Input placeholder={placeholder}>{label}</Input>
                )}
                </FormItem>
                getFormList.push(input);
            }else if(list.type === 'date'){
                const date = <FormItem label={list.label}>
                {getFieldDecorator('date')(
                    <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="请输入日期"
                    />
                )}
            </FormItem>
            getFormList.push(date);
            }
        })
        const button = <FormItem>
            <Button type="primary" onClick={this.handleFormSubmit} style={{marginRight:20,marginLeft:20}}>查询</Button>
            <Button onClick={this.handleReset}>重置</Button>
        </FormItem>;
        getFormList.push(button);
        return getFormList;
    }

    render() {

        return(
            <div>
                { this.initFormList() }
            </div>
        )
    }
}

export default Form.create()(BaseForm)
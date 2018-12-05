import 'antd/es/date-picker/style/css'
import 'antd/es/select/style/css'
import 'antd/es/spin/style/css'
import 'antd/es/switch/style/css'
import locale from 'antd/lib/date-picker/locale/en_US'

import RangePicker from 'antd/es/date-picker/RangePicker'
import Select from 'antd/es/select'
import Spin from 'antd/es/spin'
import Switch from 'antd/es/switch'
import moment from 'moment'
import React, { ChangeEventHandler, FormEventHandler, ReactNode } from 'react'
import { Field } from 'redux-form'

import InputGroup from '../../src/view/components/InputGroup'
import { SectionTitle } from './form.styled'

const disabledDate = (current) => {
    return current && current < moment().endOf('day')
}

export interface FormInput {
    title?: string
    type?: string
    id?: number | string
    name?: string
    size?: 'large' | 'default' | 'small'
    maxLength?: number
    disabled?: boolean
    readOnly?: boolean
    addonBefore?: ReactNode
    addonAfter?: ReactNode
    onPressEnter?: FormEventHandler<HTMLInputElement>
    onKeyDown?: FormEventHandler<HTMLInputElement>
    onKeyUp?: FormEventHandler<HTMLInputElement>
    onChange?: ChangeEventHandler<HTMLInputElement>
    onClick?: FormEventHandler<HTMLInputElement>
    onFocus?: FormEventHandler<HTMLInputElement>
    onBlur?: FormEventHandler<HTMLInputElement>
    autoComplete?: string
    prefix?: ReactNode
    suffix?: ReactNode
    spellCheck?: boolean
    autoFocus?: boolean
    formInputType?: 'select' | 'switch' | 'sectionTitle' | 'datetime'
    label?: string
    options?: Option[]
    loading?: boolean
    staticLabel?: string
    customRender?: React.ReactNode
    placeholder?: string
    componentProps?: any
}

export interface Option {
    value?: string
    name?: string
}

const Option = Select.Option

export default function formGenerator(fields: FormInput[]) {
    return fields.map((data: FormInput, key: number) => {
        return <Field key={key} name={data.name} {...data} component={renderField} />
    })
}

const renderField = (props) => {
    const { input, loading, meta } = props

    if (loading) {
        return <Spin size="small" />
    }

    switch (props.formInputType) {
        case 'switch': {
            return (
                <InputGroup
                    {...props}
                    onChange={input.onChange}
                    onFocus={input.onFocus}
                    onBlur={input.onBlur}
                    isCustomLabel={props.label}
                    customInput={
                        <div style={{ float: 'right' }}>
                            <Switch defaultChecked={!!input.value} {...input} />
                        </div>
                    }
                />
            )
        }
        case 'sectionTitle': {
            return <InputGroup {...props} isCustomLabel={false} label={null} customInput={<SectionTitle>{props.label}</SectionTitle>} />
        }
        case 'select': {
            return (
                <InputGroup
                    {...props}
                    onChange={input.onChange}
                    onFocus={input.onFocus}
                    onBlur={input.onBlur}
                    customInput={
                        <Select style={{ marginBottom: '20px' }} {...meta} {...input} {...props.componentProps}>
                            {props.options.map((option: Option, key: number) => {
                                return (
                                    <Option key={option.value || String(key)} value={option.value || option.name}>
                                        {option.name || option.value}
                                    </Option>
                                )
                            })}
                        </Select>
                    }
                />
            )
        }
        case 'datetime': {
            return (
                <div>
                    <RangePicker
                        {...props}
                        locale={locale}
                        onChange={input.onChange}
                        disabledDate={disabledDate}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                    />
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
            )
        }
        default: {
            return (
                <InputGroup
                    {...props}
                    onChange={input.onChange}
                    onFocus={input.onFocus}
                    onBlur={input.onBlur}
                    formInput={props.formInput}
                />
            )
        }
    }
}

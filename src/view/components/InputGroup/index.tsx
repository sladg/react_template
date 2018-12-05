import Input from 'antd/es/input'
import 'antd/es/input/style/css'
import React from 'react'

import Label from '../Label'
import { Error, InputGroupWrapper } from './styled'

const InputGroup = ({ input, meta, label, staticLabel, formInput, customInput, isCustomLabel, customRender, ...rest }) => {
    const FormInput = formInput || Input

    if (customInput) {
        return (
            <InputGroupWrapper error={meta.touched && meta.error}>
                {label && !isCustomLabel && (
                    <Label active htmlFor={input.name}>
                        {label}
                    </Label>
                )}
                {isCustomLabel && <span>{label}</span>}
                {customInput}
                {meta.touched && meta.error && <Error>{meta.error}</Error>}
            </InputGroupWrapper>
        )
    } else {
        return (
            <InputGroupWrapper error={meta.touched && meta.error}>
                {label && (
                    <Label htmlFor={input.name} staticLabel={staticLabel} active={meta.active || input.value}>
                        {label}
                    </Label>
                )}
                <FormInput {...input} {...rest} id={input.name} />
                {meta.touched && meta.error && <Error>{meta.error}</Error>}
                <div style={{ height: '20px' }} />
                {customRender}
            </InputGroupWrapper>
        )
    }
}

export default InputGroup

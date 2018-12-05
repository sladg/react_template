import 'antd/lib/button/style/css'

import Button from 'antd/lib/button/button'
import styled from 'styled-components'

export const Wrapper = styled.div`
    padding: 20px;
`

export const FormWrapper = styled.div`
    padding-top: 45px;
    font-size: 1.4rem;
`
export const SubmitButton: any = styled(Button as any)`
    cursor: pointer;
    border: 0;
    background-color: #037ef3;
    border-radius: 4px;
    color: #fff;
    height: 44px;
    width: 100%;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 21px;
    margin-top: 20px;
    margin-bottom: 20px;
`

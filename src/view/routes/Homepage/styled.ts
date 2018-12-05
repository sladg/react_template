import Button from 'antd/lib/radio/radioButton'
import 'antd/lib/radio/style/css'
import styled from 'styled-components'

export const TitleEntry = styled.div`
    height: 30px;
    color: ${(props) => props.theme.colors.loginTitleText};
    font-size: 2.5rem;
    line-height: 30px;
    text-align: center;
    margin-bottom: 50px;
`

export const FbButton = styled(Button)`
    background-color: ${(props) => props.theme.colors.facebookColor};
    color: ${(props) => props.theme.colors.white};
`

export const Line = styled.div`
    @media only screen and (min-width: 500px) {
        width: 176px;
    }
    display: inline-block;
    box-sizing: border-box;
    height: 2px;
    border: 1px solid #b6b6b6;
    vertical-align: middle;
    width: 35%;
`

export const Register = styled.div`
    height: 16px;
    font-size: 1.4rem;
    line-height: 16px;
    margin-bottom: 20px;
`

export const Wrapper = styled.div`
    padding: 20px;
`

export const FormWrapper = styled.div`
    padding-top: 45px;
    font-size: 1.4rem;
`

export const ConfirmButton: any = styled(Button)`
    height: 40px;
    text-transform: uppercase;
    background-color: #0000;
    color: #ffff;
    font-size: 1.3rem;
    font-weight: 600;
    margin-right: 10px;
`

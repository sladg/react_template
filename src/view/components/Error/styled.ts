import Icon from 'antd/es/icon'
import 'antd/es/icon/style/css'
import styled from 'styled-components'

interface WrapperProps {
    absolute?: boolean
}

export const Wrapper: any = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    font-size: 1.8rem;
    position: ${(props: WrapperProps) => (props.absolute ? 'absolute' : 'static')};
    top: ${(props: WrapperProps) => (props.absolute ? 0 : 'auto')};
    left: ${(props: WrapperProps) => (props.absolute ? 0 : 'auto')};
`

export const TextWrap: any = styled.span`
    display: table;
    margin: 0 auto;
    transition: all 0.3;
    color: #b6b6b6;
    line-height: 15px;
`

export const ErrorIcon: any = styled(Icon)`
    color: #fa6556;
    display: block;
    text-align: center;
    font-size: 4.4rem;
    margin-bottom: 8px;
`

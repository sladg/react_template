import { Layout } from 'antd'
import styled from 'styled-components'

const { Header } = Layout
export const StyledHeader = styled(Header)`
    height: 144px;
    padding: 0;
    background-color: #fff;
    border-bottom: 1px solid #d9dee4;

    @media (min-width: 786px) {
        height: 80px;
    }

    .ant-select-selection {
        border-color: #d9dee4;
    }
`

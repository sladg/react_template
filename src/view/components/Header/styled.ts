import Layout from 'antd/es/layout'

import 'antd/es/layout/style/index.css'
import styled from 'styled-components'

const { Header } = Layout
export const StyledHeader = styled(Header)`
    height: 144px;
    padding: 0;
    border-bottom: 1px solid #d9dee4;

    h2 {
        color: #fff;
    }

    @media (min-width: 786px) {
        height: 80px;
    }

    .ant-select-selection {
        border-color: #d9dee4;
    }
`

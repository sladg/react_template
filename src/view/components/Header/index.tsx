import React, { SFC } from 'react'
import { StyledHeader } from './styled'

interface Props {
    children?: any
}

const HeaderComponent: SFC<Props> = ({ children }: Props) => {
    return <StyledHeader>{children}</StyledHeader>
}

export default HeaderComponent

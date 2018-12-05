import React, { SFC, ReactChild } from 'react'
import { StyledLabel } from './styled'

interface Props {
    children: ReactChild
    htmlFor?: string
    staticLabel?: boolean
    active?: boolean
}

const Label: SFC<Props> = ({ htmlFor, children, active, staticLabel }: Props) => {
    return (
        <StyledLabel htmlFor={htmlFor} active={active} staticLabel={staticLabel}>
            {children}
        </StyledLabel>
    )
}

export default Label

import React, { SFC } from 'react'
import { Wrapper, TextWrap } from './styled'

interface Props {
    absolute?: boolean
}

const Error: SFC<Props> = ({ absolute }: Props) => {
    return (
        <Wrapper absolute={absolute}>
            <TextWrap>{'components.Card.error'}</TextWrap>
        </Wrapper>
    )
}

export default Error

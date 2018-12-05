import React, { Component } from 'react'

import { AppHolder, Wrapper } from './styled'

interface Props {}

interface State {}

class DefaultTemplate extends Component<Props, State> {
    constructor(props) {
        super(props)
    }

    render() {
        const { children } = this.props
        return (
            <AppHolder key={'someKey'}>
                <Wrapper>{children}</Wrapper>
            </AppHolder>
        )
    }
}

export default DefaultTemplate

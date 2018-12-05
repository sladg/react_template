import React from 'react'

export const wrapWithComponent = (wrapper: React.ReactElement<any>, WrappedComponent: React.ReactNode) => {
    return React.cloneElement(wrapper, null, WrappedComponent)
}

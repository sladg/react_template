import styled from 'styled-components'

export const StyledLabel: any = styled.label`
    font-size: ${(props: any) => (props.active ? '0.9rem' : '1.4rem')};
    top: ${(props: any) => (props.active ? '-2rem' : '1.4rem')};
    left: ${(props: any) => (props.active ? 0 : '1rem')};
    position: ${(props: any) => (props.staticLabel ? 'static' : 'absolute')};
    z-index: 1;
    transition: all 0.3s;
    color: ${(props: any) => (props.active ? '#FA6556' : '#4B5161')};
    ${(props: any) => {
        if (props.active) {
            return 'text-transform: uppercase'
        }
    }};
    height: 16px;
    color: #b6b6b6;
    font-size: 1.2rem;
    line-height: 14px;

    margin-bottom: ${(props: any) => (props.staticLabel ? '8px' : 0)};
    display: ${(props: any) => (props.staticLabel ? 'inline-block' : 'block')};
`

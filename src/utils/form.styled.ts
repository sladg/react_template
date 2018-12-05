import styled from 'styled-components'

export const InputRow = styled.div`
    margin-bottom: 20px;
    position: relative;
    input {
        border-color: ${(props: any) => (props.error ? props.theme.colors.danger + ' !important' : 'inherit')};

        &:focus {
            box-shadow: 0 0 0 2px ${(props) => props.theme.colors.dangerShadow};
        }
    }
`
export const Error = styled.div`
    color: ${(props) => props.theme.colors.danger};
    position: absolute;
    font-size: 1.2rem;
`

export const SectionTitle = styled.span`
    font-size: 2rem;
`

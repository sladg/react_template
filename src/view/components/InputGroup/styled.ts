import styled from 'styled-components'

export const InputGroupWrapper: any = styled.div`
    @media screen and (min-width: 768px) {
        padding: 0px;
    }
    margin-bottom: 25px;
    position: relative;

    .ant {
        &-select,
        &-input {
            height: 44px;
            width: 100%;
            border-radius: 4px;
            background-color: #fff;
            border-color: ${(props: any) => (props.error ? '#FA6556' : '#CCD1D6')} !important;
            position: relative;
        }
        &-select-selection {
            padding-top: 6px;
        }

        &-input:hover {
            border: 1px solid #4482ff !important;
        }

        &-select-selection,
        &-select-selection:focus {
            border-radius: 4px;
            height: 100%;
        }

        &-select.ant-select.focused,
        &-input:focus {
            border: 1px solid #4482ff !important;
            ${function(props: any) {
                if (props.error) {
                    return `box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.2);`
                }
            }};
        }
    }
`

export const Error = styled.div`
    color: #fa6556;
    position: absolute;
    font-size: 1.2rem;
`

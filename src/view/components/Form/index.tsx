import React, { FormEvent } from 'react'
import { reduxForm } from 'redux-form'
import { submitProjectForm } from 'state/actions'
import formGenerator, { FormInput } from 'utils/formGenerator'

import Header from '../../components/Header'
import { FormWrapper, SubmitButton, Wrapper } from './styled'
import validate from './validate'

interface IObj {
    [key: string]: unknown
}
interface Props {
    initialize?: (vals: IObj) => void
    values?: IObj
    handleSubmit?: (data: IObj) => (event: FormEvent<any>) => void
    submitting?: boolean
    data: string
}

const locationList = [
    { value: 'AF', name: 'Afghanistan' },
    { value: 'AX', name: '\u00c5land Islands' },
    { value: 'AL', name: 'Albania' },
    { value: 'DZ', name: 'Algeria' },
    { value: 'AS', name: 'American Samoa' },
    { value: 'AD', name: 'Andorra' },
    { value: 'AO', name: 'Angola' },
    { value: 'AI', name: 'Anguilla' },
    { value: 'AQ', name: 'Antarctica' },
    { value: 'AG', name: 'Antigua and Barbuda' },
    { value: 'AR', name: 'Argentina' },
    { value: 'AM', name: 'Armenia' },
    { value: 'AW', name: 'Aruba' },
    { value: 'AU', name: 'Australia' },
    { value: 'AT', name: 'Austria' },
    { value: 'AZ', name: 'Azerbaijan' },
    { value: 'BS', name: 'Bahamas' },
    { value: 'BH', name: 'Bahrain' },
    { value: 'BD', name: 'Bangladesh' },
    { value: 'BB', name: 'Barbados' },
    { value: 'BY', name: 'Belarus' },
    { value: 'BE', name: 'Belgium' },
    { value: 'BZ', name: 'Belize' },
    { value: 'BJ', name: 'Benin' },
    { value: 'BM', name: 'Bermuda' },
    { value: 'BT', name: 'Bhutan' },
]

const inputs: FormInput[] = [
    {
        name: 'firstName',
        label: 'Who?',
    },
    {
        name: 'job',
        label: 'What?',
    },
    {
        name: 'time',
        label: 'When?',
    },
    {
        name: 'location',
        label: 'Where?',
        formInputType: 'select',
        options: locationList,
        componentProps: {
            filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            showSearch: true,
        },
    },
]

const ProjectForm = (props: Props) => {
    const { handleSubmit, submitting, data } = props
    return (
        <Wrapper>
            <Header>
                <h2>Welcome to this awesome form project!</h2>
            </Header>
            <form onSubmit={handleSubmit(submitProjectForm)}>
                <FormWrapper>{formGenerator(inputs)}</FormWrapper>
                <SubmitButton htmlType="submit" loading={submitting}>
                    Submit
                </SubmitButton>
            </form>
            {data && <div>{data}</div>}
            {/* It is also wise to handle errors */}
        </Wrapper>
    )
}

export default reduxForm({
    form: 'simpleForm',
    validate,
    onSubmitSuccess({}, {}, props: Props) {
        props.initialize({})
    },
})(ProjectForm)

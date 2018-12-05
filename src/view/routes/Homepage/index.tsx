import React from 'react'
import { reduxForm } from 'redux-form'
import formGenerator, { FormInput } from 'utils/formGenerator'

const countryList: { name: string; value: string }[] = [
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
        label: 'First Name',
    },
    {
        name: 'lastName',
        label: 'Last Name',
    },
    {
        name: 'zip',
        label: 'form.zip',
    },
    {
        name: 'state',
        label: 'form.state',
        formInputType: 'select',
        options: countryList,
        componentProps: {
            filterOption: (input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
            showSearch: true,
        },
    },
]

const ProjectForm = (props) => {
    return (
        <div>
            <h2>Welcome to this awesome form project!</h2>
            <div>{formGenerator(inputs)}</div>
        </div>
    )
}

export default reduxForm({
    form: 'simple',
})(ProjectForm)

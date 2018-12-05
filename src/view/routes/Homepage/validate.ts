import {
    containsDigit,
    containsLowercase,
    containsSpecialCharacted,
    containsUppercase,
    createValidator,
    equalPasswords,
    minLength,
    required,
} from '../../../utils/validation'

const PasswordChangeFormValidation = createValidator({
    currentPassword: [required],
    newPassword: [required, containsLowercase, containsUppercase, containsSpecialCharacted, containsDigit, minLength(8)],
    passwordRepeat: [required, equalPasswords('newPassword')],
})

export default PasswordChangeFormValidation

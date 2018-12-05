import { createValidator, minLength, required } from '../../../utils/validation'

const ProjectFormValidation = createValidator({
    firstName: [required],
    job: [required, minLength(5)],
    time: [required],
    location: [required],
})

export default ProjectFormValidation

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSubmitedData } from 'state/selectors'
import { Redux } from 'typings'
import { SelectorType } from 'utils/get'
import ProjectForm from 'view/components/Form'

interface Props {
    data?: SelectorType<typeof selectSubmitedData>
}

@connect((state: Redux) => ({
    data: selectSubmitedData(state),
}))
class Homepage extends Component<Props> {
    render() {
        const { data } = this.props
        const result = !data ? null : `${data.firstName} ${data.job} ${data.time} in ${data.location}`
        return (
            <div>
                <ProjectForm data={result} />
            </div>
        )
    }
}

export default Homepage

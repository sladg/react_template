import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectSubmitedData } from 'state/selectors'
import { ReduxState } from 'state/types'
import { SelectorType } from 'utils/get'
import ProjectForm from 'view/components/Form'

interface Props {
    data?: SelectorType<typeof selectSubmitedData>
}

@connect((state: ReduxState) => ({
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

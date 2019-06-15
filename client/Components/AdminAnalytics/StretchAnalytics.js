import React, { Component } from 'react'
import CohortBarChart from './CohortBarChart'
import { connect } from 'react-redux'

class StretchAnalytics extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { cohortStretches, stretches, cohorts, stretchAnswersFiltered } = this.props
        const stretchCohorts = stretchAnswersFiltered.map(answer => answer.userCohortId)
        return (
            <div>
                <CohortBarChart stretchAnswers={stretchAnswersFiltered} cohortStretches={cohortStretches} />
            </div>
        )
    }
}

const mapStateToProps = ({ stretchAnswers, stretches,
    cohorts, cohortStretches, users }, { match: { params } }) => {
    return {
        stretchAnswersFiltered: stretchAnswers.filter(stretch =>
            stretch.stretchId === params.id
        ),
        stretches,
        cohorts,
        cohortStretches,
        users,
    }
}
export default connect(mapStateToProps)(StretchAnalytics)
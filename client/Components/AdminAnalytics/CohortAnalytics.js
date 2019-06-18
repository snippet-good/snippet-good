import React, { Component } from 'react'
import StretchRatingsLineGraph from './StretchRatingsLineGraph'
import { connect } from 'react-redux'

class CohortAnalytics extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { stretchAnswers, stretchAnswersFiltered, stretches, cohortStretches } = this.props
        console.log("STRETCH ANSWERS", stretchAnswers)
        console.log("FILTERED", stretchAnswersFiltered)

        return (
            <div>
                <StretchRatingsLineGraph stretchAnswers={stretchAnswersFiltered} stretches={stretches} cohortStretches={cohortStretches} />
            </div>
        )
    }
}

const mapStateToProps = ({ stretchAnswers, stretches,
    cohorts, cohortStretches, users }, { match: { params } }) => {
    return {
        stretchAnswers,
        stretchAnswersFiltered: stretchAnswers.filter(stretch =>
            stretch.cohortId === params.id
        ),
        stretches,
        cohorts,
        cohortStretches,
        users,
    }
}
export default connect(mapStateToProps)(CohortAnalytics)
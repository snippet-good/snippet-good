import React, { Component } from 'react'
import RatingBarChart from './RatingBarChart'
import { connect } from 'react-redux'

class StretchAnalytics extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { stretchAnswers, cohortStretches, stretches, cohorts, stretchAnswersFiltered } = this.props
        console.log("STRETCH ANSWERS", stretchAnswers)
        console.log("FILTERED", stretchAnswersFiltered)

        return (
            <div>
                <RatingBarChart stretchAnswers={stretchAnswersFiltered} />
            </div>
        )
    }
}

const mapStateToProps = ({ stretchAnswers, stretches,
    cohorts, cohortStretches, users }, { match: { params } }) => {
    return {
        stretchAnswers,
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
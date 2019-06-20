import React, { Component } from 'react'
import StretchRatingsLineGraph from './StretchRatingsLineGraph'
import { connect } from 'react-redux'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';


class CohortAnalytics extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 'rating'
        }
    }

    render() {
        const { stretchAnswers, stretchAnswersFiltered, stretches, cohortStretches } = this.props
        const { selected } = this.state
        console.log("STRETCH ANSWERS", stretchAnswers)
        console.log("FILTERED", stretchAnswersFiltered)

        const handleChange = (event) => {
            this.setState({ selected: event.target.value })
            console.log(selected)
        }

        return (
            <div>
                <Container>
                    <InputLabel shrink>Select filter:</InputLabel>

                    <Select
                        name={selected}
                        value={selected}
                        autoWidth
                        onChange={handleChange}
                    >
                        <MenuItem key='rating' value='rating'>
                            Rating
                            </MenuItem>
                        <MenuItem key='time' value='time'>
                            Completion Time
                            </MenuItem>

                    </Select>
                </Container>
                <Divider variant="middle" />
                <div>
                    <Container>
                        <StretchRatingsLineGraph stretchAnswers={stretchAnswersFiltered}
                            stretches={stretches} cohortStretches={cohortStretches} filter={selected} />
                    </Container>
                </div>
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
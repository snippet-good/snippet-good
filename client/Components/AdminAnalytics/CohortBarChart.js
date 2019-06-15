import React, { Component } from 'react'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'

class CohortBarChart extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }
    createBarChart = () => {

        //get all stretch ratings by cohort in an object
        var ratingsByCohort = {}
        this.props.stretchAnswers.map(stretch => {
            if (Object.keys(ratingsByCohort).includes(stretch.cohortstretchId)) {
                ratingsByCohort[stretch.cohortstretchId].push(stretch.rating)
            } else {
                ratingsByCohort[stretch.cohortstretchId] = [stretch.rating]
            }
        })

        //Average all scores
        Object.keys(ratingsByCohort).map(key => {
            let total = ratingsByCohort[key].reduce((p, c) => (p + c))
            ratingsByCohort[key] = (total / ratingsByCohort[key].length)
        })

        //formatting for D3
        const formattedData = []
        Object.keys(ratingsByCohort).map(key => formattedData.push({ 'Cohort': key, 'Avg': ratingsByCohort[key] }))
        console.log(formattedData)

        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 20, bottom: 40, left: 40 },
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const node = this.node
        //const data = Object.keys(ratingsByCohort).map(key => ratingsByCohort[key])
        const dataMax = max(formattedData.map(d => d.Avg))
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([height, 0])

        const xScale = scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.05)
            .domain(formattedData.map(d => d.Cohort))

        var svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        select(node)
            .selectAll('rect')
            .data(formattedData)
            .enter()
            .append('rect')
            .style('fill', '#3f51b5')
            .attr('x', d => xScale(d.Cohort))
            .attr('width', xScale.bandwidth())
            .attr('y', d => yScale(d.Avg))
            .attr('height', d => height - yScale(d.Avg))
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        select(node)
            .selectAll('rect')
            .data(formattedData)
            .exit()
            .remove()

        // Add the x Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(xScale));

        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Cohort");

        //Add the y Axis
        svg.append("g")
            .call(axisLeft(yScale));

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Average submission rating");
    }

    render() {
        console.log('here')
        return (
            <svg ref={node => this.node = node}>
            </svg>
        )
    }
}
export default CohortBarChart
import React, { Component } from 'react'
import { scaleLinear, scaleBand } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'

class TimeBarChart extends Component {
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
        console.log(this.props.stretchAnswers)
        var timesByCohort = {}
        this.props.stretchAnswers.map(stretch => {
            if (Object.keys(timesByCohort).includes(stretch.cohortName)) {
                timesByCohort[stretch.cohortName].push(stretch.timeToSolve)
            } else {
                timesByCohort[stretch.cohortName] = [stretch.timeToSolve]
            }
        })

        //Average all scores
        Object.keys(timesByCohort).map(key => {
            let total = timesByCohort[key].reduce((p, c) => (p + c))
            timesByCohort[key] = (total / timesByCohort[key].length)
        })

        //formatting for D3
        const formattedData = []
        Object.keys(timesByCohort).map(key => formattedData.push({ 'Cohort': key, 'Avg': timesByCohort[key] }))
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
            .text("Average submission time")

        //title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 + (margin.top))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(`Average Stretch Time by Cohort`);
    }

    render() {
        console.log('here')
        return (
            <svg ref={node => this.node = node}>
            </svg>
        )
    }
}
export default TimeBarChart
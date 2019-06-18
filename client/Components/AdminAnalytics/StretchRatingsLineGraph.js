import React, { Component } from 'react'
import { scaleLinear, scalePoint } from 'd3-scale'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { line } from 'd3-shape'
import d3Tip from 'd3-tip'

class StretchRatingsLineGraph extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.createLineChart()
    }
    componentDidUpdate() {
        this.createLineChart()
    }

    createLineChart = () => {
        //get all stretch ratings by cohort in an object
        var ratingByStretch = {}

        console.log(this.props.stretches)
        console.log(this.props.cohortStretches)


        this.props.stretchAnswers.map(stretch => {
            if (Object.keys(ratingByStretch).includes(stretch.stretchId)) {
                ratingByStretch[stretch.stretchId].push(stretch.rating)
            } else {
                ratingByStretch[stretch.stretchId] = [stretch.rating]
            }
        })

        //Average all scores
        Object.keys(ratingByStretch).map(key => {
            let total = ratingByStretch[key].reduce((p, c) => (p + c))
            ratingByStretch[key] = (total / ratingByStretch[key].length)
        })

        //formatting for D3
        const formattedData = []
        Object.keys(ratingByStretch).map(key => {
            var stretch = this.props.stretches.find(stretch => stretch.id === key)
            formattedData.push({
                'Stretch': key, 'Avg': ratingByStretch[key],
                'Category': stretch.categoryName, 'Difficulty': stretch.difficulty, 'Time': stretch.minutes
            })
        })
        console.log('FORMATTED:', formattedData)

        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 20, bottom: 40, left: 40 },
            width = 500 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        const node = this.node

        const dataMax = max(formattedData.map(d => d.Avg))
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([height, 0])

        const xScale = scalePoint()
            .range([0, width])
            .domain(formattedData.map(d => d.Stretch))

        // define the line
        var valueline = line()
            .x(function (d) { return xScale(d.Stretch); })
            .y(function (d) { return yScale(d.Avg); });

        var tip = d3Tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .style('background', '#d3d3d3')
            .style('opacity', '10')
            .html(function (d) {
                return ("<strong>Category:</strong> <span style='color:red'>" + d.Category + "</span> <br><strong>Difficulty:</strong> <span style='color:red'>" + d.Difficulty + "</span><br><strong>Minutes:</strong> <span style='color:red'>" + d.Time + "</span>")
            })

        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        svg.call(tip)

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(axisBottom(xScale));

        // Add the Y Axis
        svg.append("g")
            .call(axisLeft(yScale));
        // Add the valueline path.
        svg.append("path")
            .data([formattedData])
            .attr("class", "line")
            .attr("d", valueline(formattedData))
            .style("stroke", '#3f51b5')
            .style("stroke-width", 5)
            .style("stroke-linejoin", "round")
            .style("fill", "none")

        svg.selectAll("circle")
            .data(formattedData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.Stretch))
            .attr("cy", d => yScale(d.Avg))
            .attr("r", 8)
            .style("fill", "grey")
            .attr("id", function (d, i) { return "_" + i; })
            // Treating mouseover event
            .on("mouseover", function (d, i) {
                select("#_" + i)
                    .transition().duration(500)
                    .style("fill", '#3f51b5')
                    .attr("r", 15)
                    .style("stroke-width", 0)
                tip.show(d, this)
                // .style("font-size", 24)
            })
            .on("mouseout", (d, i) => {
                select("#_" + i)
                    .transition().duration(500)
                    .attr("r", 8)
                    .style("fill", "grey")
                tip.hide()
            })

        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Stretch");

        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Average submission rating")

        //title
        svg.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 + (margin.top))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(`Cohort Stretch Performance`);

    }

    render() {
        return (
            <svg ref={node => this.node = node} >
            </svg >
        )
    }
}

export default StretchRatingsLineGraph
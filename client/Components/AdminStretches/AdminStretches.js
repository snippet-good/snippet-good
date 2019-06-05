import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../../store/categories/actions'
import { getAllStretches } from '../../store/stretches/actions'
import { searchStretches } from '../../store/stretches/actions'
import { filterStretches } from '../../store/stretches/actions'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'

import Card from '@material-ui/core/Card'

import Typography from '@material-ui/core/Typography'

class AdminStretches extends Component {
  constructor() {
    super()
    this.state = {
      searchTerm: '',
      filterCategoryNames: [],
      selectedAuthor: ''
    }
  }

  //enter search term
  enterSearch = ({ target }) => {
    this.setState({ searchTerm: target.value })
  }

  //clear search term
  clearSearch = evt => {
    evt.preventDefault()
    const { fetchStretches } = this.props
    this.setState({ searchTerm: '' })
    fetchStretches()
  }

  // filter by search term
  applySearch = evt => {
    evt.preventDefault()
    const { searchTerm } = this.state
    const { searchStretches } = this.props
    searchStretches(searchTerm)
    console.log(searchTerm)
  }

  //filter by category tick box
  selectCategoryFilter = ({ target }) => {
    let { filterCategoryNames } = this.state
    if (filterCategoryNames.includes(target.value)) {
      filterCategoryNames = filterCategoryNames.filter(
        cat => cat !== target.value
      )
    } else {
      filterCategoryNames.push(target.value)
    }
    this.setState({ filterCategoryNames })
  }

  // filter by selected category
  applyCategoryFilter = evt => {
    evt.preventDefault()
    const { filterCategoryNames } = this.state
    let { stretches, filterStretches, fetchStretches } = this.props
    if (filterCategoryNames.length === 0) {
      fetchStretches()
    } else {
      const newStretches = stretches.filter(stretch =>
        filterCategoryNames.includes(stretch.categoryName)
      )
      filterStretches(newStretches)
    }
  }

  // clear filter
  clearCategoryFilter = evt => {
    evt.preventDefault()
    const { fetchStretches } = this.props
    document.querySelectorAll('input[type=checkbox]').forEach(el => {
      el.checked = false
    })
    this.setState({ filterCategoryNames: [] })
    fetchStretches()
  }

  //filter by author
  selectAuthorFilter = ({ target }) => {
    this.setState({ selectedAuthor: target.value })
  }

  // filter by selected author
  applyAuthorFilter = evt => {
    evt.preventDefault()
    const { selectedAuthor } = this.state
    let { stretches, filterStretches } = this.props
    const newStretches = stretches.filter(
      stretch => stretch.authorName === selectedAuthor
    )
    filterStretches(newStretches)
  }

  // clear filter
  clearAuthorFilter = evt => {
    evt.preventDefault()
    const { fetchStretches } = this.props
    this.setState({ selectedAuthor: '' })
    fetchStretches()
  }

  render() {
    const { searchTerm } = this.state
    const { stretches } = this.props

    const allCategories = []
    stretches.map(stretch => allCategories.push(stretch.categoryName))
    const categories = [...new Set(allCategories)]

    const allAuthors = []
    stretches.map(stretch => allAuthors.push(stretch.authorName))
    const authors = [...new Set(allAuthors)]

    return (
      <div className="stretches-page">
        <Card>
          <div className="stretches-filter">
            <form onSubmit={this.applySearch}>
              <label htmlFor="searchItems">
                <Typography variant="h6">Search Stretches:</Typography>
              </label>
              <div className="stretch-search">
                <div className="md-form">
                  <input
                    className="form-control menu-search-bar"
                    type="search"
                    name="searchItems"
                    value={searchTerm}
                    onChange={this.enterSearch}
                  />
                </div>
                <Button type="submit" color="primary">
                  Search
                </Button>
                <Button
                  type="submit"
                  color="secondary"
                  onClick={this.clearSearch}
                  className="btn btn-secondary"
                >
                  Clear
                </Button>
              </div>
            </form>

            <Typography variant="h6">Filter by Category:</Typography>
            <form onSubmit={this.applyCategoryFilter}>
              {categories.map(cat => {
                return (
                  <div key={cat} className="filter-cat">
                    <label>{cat}</label>
                    <input
                      type="checkbox"
                      name="filterCategoryNames"
                      value={cat}
                      onChange={this.selectCategoryFilter}
                    />
                  </div>
                )
              })}
              <div>
                <Button type="submit" color="primary">
                  Apply Filter
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  onClick={this.clearCategoryFilter}
                >
                  Clear Filter
                </Button>
              </div>
            </form>

            <Typography variant="h6">Filter by Author:</Typography>
            <form onSubmit={this.applyAuthorFilter}>
              <select
                value={this.state.selectedAuthor}
                onChange={this.selectAuthorFilter}
              >
                {authors.map(auth => (
                  <option value={auth}>{auth}</option>
                ))}
              </select>
              <div>
                <Button type="submit" color="primary">
                  Apply Filter
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  onClick={this.clearAuthorFilter}
                >
                  Clear Filter
                </Button>
              </div>
            </form>
          </div>
        </Card>

        {/* TODO: add filter on category and cohort */}

        <div>
          <Link to="/admin/stretches/create">
            <Button variant="contained" color="primary">
              {' '}
              New Stretch{' '}
            </Button>
          </Link>
          <Typography variant="h6" id="tableTitle">
            Stretch Inventory
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stretches.map(stretch => {
                return (
                  <TableRow key={stretch.id}>
                    <TableCell>
                      <Link to={`/admin/singleStretch/${stretch.id}`}>
                        {stretch.title}
                      </Link>
                    </TableCell>
                    <TableCell>{stretch.authorName}</TableCell>
                    <TableCell>{stretch.categoryName}</TableCell>
                    <TableCell>{stretch.difficulty}</TableCell>
                    <TableCell><Button color='secondary'>Schedule</Button></TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { categories, stretches } = state
  return {
    categories,
    stretches
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(getAllCategories()),
    fetchStretches: () => dispatch(getAllStretches()),
    searchStretches: searchTerm => dispatch(searchStretches(searchTerm)),
    filterStretches: newStretches => dispatch(filterStretches(newStretches))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminStretches)

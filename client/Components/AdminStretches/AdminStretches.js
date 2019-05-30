import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllCategories } from '../../store/categories/actions'
import { getAllStretches } from '../../store/stretches/actions'
import { searchStretches } from '../../store/stretches/actions'

class AdminStretches extends Component {
    constructor() {
        super()
        this.state = {
            searchTerm: '',
            filterCategoryIds: [],
        }
    }

    //enter search term
    enterSearch = ({ target }) => {
        this.setState({ searchTerm: target.value })
    };

    //clear search term
    clearSearch = evt => {
        evt.preventDefault();
        const { fetchStretches } = this.props
        this.setState({ searchTerm: '' })
        fetchStretches()
    };

    // filter products by search term
    applySearch = evt => {
        evt.preventDefault();
        const { searchTerm } = this.state
        const { searchStretches } = this.props
        searchStretches(searchTerm);
        console.log(searchTerm)
    }

    render() {
        const { searchTerm } = this.state;
        const { stretches, categories } = this.props;

        return (
            <div className="stretches-page">
                <div className="stretches-filter">
                    <form onSubmit={this.applySearch}>
                        <label htmlFor="searchItems">
                            <h4>Search Stretches:</h4>
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
                            <button type="submit" className="btn btn-secondary">Search</button>
                            <button type="submit" onClick={this.clearSearch} className="btn btn-secondary">
                                Clear
                  </button>
                        </div>
                    </form>

                    {/* TODO: add filter on category and cohort */}

                    <div>
                        <h2>Stretch Inventory</h2>
                        <Link to="/admin/addStretch">
                            <button type="button"> New Stretch </button>
                        </Link>
                        <table className>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Text Prompt</th>
                                    <th>Difficulty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stretches.map(stretch => {
                                    return (
                                        <tr key={stretch.id}>
                                            <td>
                                                <Link to={`/admin/singleStretch/${stretch.id}`}>{stretch.title}</Link>
                                            </td>
                                            <td>{stretch.textPrompt}</td>
                                            <td>{stretch.difficulty}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { categories, stretches } = state;
    return {
        categories, stretches
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(getAllCategories()),
        fetchStretches: () => dispatch(getAllStretches()),
        searchStretches: (searchTerm) => dispatch(searchStretches(searchTerm)),
        // filterCategories: categoryIds => dispatch(filterCategories(categoryIds)),
        // filterProducts: categoryIds => dispatch(filterProducts(categoryIds)),
    }

}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminStretches);
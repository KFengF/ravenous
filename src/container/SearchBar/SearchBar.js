import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        };

        //Se tiene que bind porque este se declaro, haciendo que su this pierda su contexto
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    sortByOptions = {
        'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'review_count'
    }

    getSortByClass(sortByOption){
        if(this.state.sortBy === sortByOption){
            return 'active';
        }else{
            return '';
        }
    }

    handleSortByChange(sortByOption){
        this.setState({ sortBy: sortByOption });
    }

    handleTermChange(event){
        this.setState({ term: event.target.value });
    }

    handleLocationChange = event => {
        this.setState({ location: event.target.value });
    }

    handleSearch = event =>{
        const { term, location, sortBy } = this.state;
        this.props.searchYelp(term, location, sortBy);
        event.preventDefault();
    }

    renderSortByOptions(){
        return Object.keys(this.sortByOptions).map(sortByOption =>{
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li 
                key={ sortByOptionValue }
                className={ this.getSortByClass(sortByOptionValue) } 
                onClick={ this.handleSortByChange.bind(this, sortByOptionValue) }
                >
                    { sortByOption }
                </li>;
        });
    }
    render(){
        return (
        <div className="SearchBar">
            <div className="SearchBar-sort-options">
                <ul>
                    {this.renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                <input placeholder="Search Businesses" onChange={ this.handleTermChange } />
                <input placeholder="Where?" onChange={ this.handleLocationChange } />
            </div>
            <div className="SearchBar-submit">
                <a href="#" onClick={ this.handleSearch }>Let's Go</a>
            </div>
        </div>
        );
    }
}

export default SearchBar;
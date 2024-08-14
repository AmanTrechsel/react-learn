import "./searchBar.css";

export default function SearchBar() {
    const { default: searchSvg } = require("../../assets/search.svg") as { default: string };

    return (
        <div className="searchBarWrapper">
            <img className="searchIcon" src={searchSvg} alt="Search icon" />
            <input className="searchBar" type="text" placeholder="Find your task here..." />
        </div>
    );
}
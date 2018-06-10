import React from 'react';
import './SearchComponent';

const SearchComponent = ({ launchpads, launchYears, handleFormChanges, keywords, launchPad, minYear, maxYear, applyClicked }) => {

    const getLaunchPads = (launchpads) => (
        launchpads.map(({id, full_name}) => (
            <option value={id} key={id}>{full_name}</option>
        ))
    )

    const getLaunchYears = (launchYears) => (
        launchYears.map((launchYear, idx) => (
            <option value={launchYear} key={idx}>{launchYear}</option>
        ))
    )

    return (
        <div className="search-container">
            <form onSubmit={(e) => applyClicked(e)}>
            <div className="row">
                <div className="form-group">
                    <label htmlFor="keywords">Keywords</label>
                    <input
                        id="keywords"
                        type="text"
                        placeholder="eg.Falcon"
                        value={keywords}
                        onChange={e => handleFormChanges(e)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="launchPad">Launch Pad</label>
                    <select
                        id="launchPad"
                        onChange={e => handleFormChanges(e)}>
                        <option value="any">Any</option>
                        {getLaunchPads(launchpads)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="minYear">Min Year</label>
                    <select
                        id="minYear"
                        onChange={e => handleFormChanges(e)}>
                        <option value="any">Any</option>
                        {getLaunchYears(launchYears)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="maxYear">Max Year</label>
                    <select
                        id="maxYear"
                        onChange={e => handleFormChanges(e)}>
                        <option value="any">Any</option>
                        {getLaunchYears(launchYears)}
                    </select>
                </div>
                <div className="form-group">
                    <button>Apply</button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default SearchComponent;

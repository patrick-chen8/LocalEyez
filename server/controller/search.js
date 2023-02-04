/**
 *  Defining the search function
 */
// importing model
const Movies = require("../models/movies");

// defining search function which will be called in routes/search
exports.search = async (req, res) => {
    
    try {
        console.log(req.body.title, req.body.category, req.body.availability)
        let movies = await searchBar(req.body.title, req.body.category, req.body.availability);
        console.log("here");
        return res.json(movies);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }

};

// building the query based off of user inputs in each search bar
async function searchBar(titleSearch, genreSearch, availabilitySearch) {
    let searchList;
    if (availabilitySearch == "All") {
        if (titleSearch == "" && genreSearch == "") {
            searchList = await Movies.find();
        }
        else {
            searchList = await Movies.find({title: {$regex: titleSearch, $options: "i"}, category: {$regex: genreSearch, $options: "i"}});
        }
    } else {
        searchList = await Movies.find({title: {$regex: titleSearch, $options: "i"}, category: {$regex: genreSearch, $options: "i"}, availability: {$regex: availabilitySearch, $options: "i"}});
    }
    return searchList;
}


/**
 *  Defining the CRUD functions that will be called in routes/movies.js 
 */
// importing model
const Movie = require("../models/movies");

// export addMovie function
exports.addMovie = async (req, res) => {
    let title = req.body.title;
    let movie = await Movie.findOne({ title });
    if (!movie) {
        let newMovie = new Movie({
            title: req.body.title,
            category: req.body.category,
            ageRating: req.body.ageRating,
            director: req.body.director,
            producer: req.body.producer,
            cast: req.body.cast,
            synopsis: req.body.synopsis,
            picture: req.body.picture,
            trailer: req.body.trailer,
            availability: "Coming Soon",
            showings: req.body.showings,
            runtime: req.body.runtime
        })
        try {
            await newMovie.save();
            return res.json(newMovie);
        } catch (e) {
            console.log(e);
            return res.json(e);
        }
    } else {
        return res.json({ message: "Movie already exists", status: 400 })
    }

};


// export editMovie function
exports.editMovie = async (req, res) => {
    let title = req.body.title;
    let updatedMovie = {
        title: req.body.title,
        category: req.body.category,
        ageRating: req.body.ageRating,
        director: req.body.director,
        producer: req.body.producer,
        cast: req.body.cast,
        synopsis: req.body.synopsis
    };

    try {
        let movie = await Movie.findOneAndUpdate({title: title}, updatedMovie);
        return res.json(movie);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};

// export deleteMovie function
exports.deleteMovie = async (req, res) => {
    let title = req.body.title;
    try {
        let movie = await Movie.findOneAndRemove({title: title});
        return res.json({ message: "Movie deleted" });
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};


// find currently showing movies
exports.findCurrentMovies = async (req, res) => {
    let filter = "Currently Showing";
    try {
        let currentMovies = await Movie.find( {availability: filter} );
        if (!currentMovies) {
            return res.json({ message: "Internal Error", status: 404 });
        }
        return res.json(currentMovies);
    } catch(e) {
        console.log(e);
        return res.json(e);
    }
};

exports.find30CurrentMovies = async (req, res) => {
    let filter = "Currently Showing";
    try {
        let currentMovies = await Movie.find( {availability: filter} ).limit(30);
        if (!currentMovies) {
            return res.json({ message: "Internal Error", status: 404 });
        }
        return res.json(currentMovies);
    } catch(e) {
        console.log(e);
        return res.json(e);
    }
};

// find movies that are coming soon
exports.findFutureMovies = async (req, res) => {
    let filter = "Coming Soon";
    try {
        let futureMovies = await Movie.find( {availability: filter} );
        if (!futureMovies) {
            return res.json({ message: "Internal Error", status: 404 });
        }
        return res.json(futureMovies);
    } catch(e) {
        console.log(e);
        return res.json(e);
    }
};

// find 30 movies that are coming soon
exports.find30FutureMovies = async (req, res) => {
    let filter = "Coming Soon";
    try {
        let futureMovies = await Movie.find( {availability: filter} ).limit(30);
        if (!futureMovies) {
            return res.json({ message: "Internal Error", status: 404 });
        }
        return res.json(futureMovies);
    } catch(e) {
        console.log(e);
        return res.json(e);
    } 
};

// find one movie by id
exports.findById = async (req, res) => {
    let id = req.body.movieId;
    try {
        let movie = await Movie.findOne({_id: id});
        //console.log(movie)
        if (!movie) {
            console.log("Couldn't find movie")
            return res.json({ message: "Internal Error", status: 404 });
        }
        return res.json(movie);
    } catch(e) {
        console.log(e);
        return res.json(e);
    }
};

exports.updateAvailability = async (req, res) => {

    try {
        let movie = await Movie.findOneAndUpdate({_id: req.body.movieId}, {availability: req.body.availability});
        return res.json(movie);
    } catch (e) {
        console.log(e);
        return res.json(e);
    }
};
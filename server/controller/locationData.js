// Location Data Controller
const serpapi = require("serpapi");
const { json } = require("express");


exports.findLocations = async (req, res) => {
    const searchLocation = req.body.query;

    // create an array of all the user's interests and store all queries
    var qs = [];
    for (var x in req.body) {
        if (x === "theatres" && req.body.theatres) {
            qs.push(searchLocation + " theatre");
        } else if (x === "galleries" && req.body.galleries) {
            qs.push(searchLocation + " gallery");
        } else if (x === "streetArts" && req.body.streetArts) {
            qs.push(searchLocation + " street art");
        } else if (x === "localTastes" && req.body.localTastes) {
            qs.push(searchLocation + " regional food");
        } else if (x === "nonLocalTastes" && req.body.nonLocalTastes) {
            qs.push(searchLocation + " foreign food");
        } else if (x === "museums" && req.body.museums) {
            qs.push(searchLocation + " museums");
        } else if (x === "statues" && req.body.statues) {
            qs.push(searchLocation + " statues");
        } else if (x === "sciences" && req.body.sciences) {
            qs.push(searchLocation + " science attractions");
        } else if (x == "parks" && req.body.parks) {
            qs.push(searchLocation + " parks");
        } else if (x === "sports" && req.body.sports) {
            qs.push(searchLocation + " sports");
        } else if (x === "movies" && req.body.movies) {
            qs.push(searchLocation + " movie theaters");
        } else if (x === "musics" && req.body.musics) {
            qs.push(searchLocation + " music");
        } else if (x === "nightLife" && req.body.nightLife) {
            qs.push(searchLocation + " bars and clubs");
        } else if (x === "games" && req.body.games) {
            qs.push(searchLocation + " games");
        } 
    }

    // creating an array of all the api responses to send back to the frontend
    var resultJsons = [];
    for (let i = 0; i < qs.length; i++) {
        const params = {
            api_key: process.env.API_KEY,
            q: qs[i],
            google_domain: "google.com",
            type: "search",
            hl: "en"
        };
        results = await serpapi.getJson("google_maps", params)
        let rank = (results.local_results.rating * Math.log2(results.local_results.postion + 1))/
        (5*Math.log10(results.local_results.reviews + 2));
        results.local_results.rank = rank;
        results.local_results.sort((a, b) => (a.rank > b.rank) ? 1 : -1);
        results.local_results.splice(3);
        resultJsons.push(results.local_results);


    }
    return res.json(resultJsons)

};
// Location Data Controller
const {getJson} = require("serpapi");
const { json } = require("express");


exports.findLocations = async (req, res) => {
    const params = {
        api_key: process.env.API_KEY,
        q: "coffee Austin TX 78747",
        google_domain: "google.com",
        ll: "@40.7455096,-74.0083012,14z",
        type: "search",
        hl: "en"
    };
    try {
        // Show result as JSON
        results = await getJson("google_maps", params);
        console.log(results);
        return res.json(results);
    } catch(e) {
        console.log(e);
        return res.json(e);
    }


};
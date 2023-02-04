// Location Data Controller
const {getJson} = require("serpapi");
const { json } = require("express");


exports.findLocations = async (req, res) => {
    console.log(req.body.query)
    const search = req.body.query;
    const params = {
        api_key: process.env.API_KEY,
        q: search,
        google_domain: "google.com",
        type: "search",
        hl: "en"
    };
    try {
        // Show result as JSON
        results = await getJson("google_maps", params);
        return res.json(results);
    } catch(e) {
        console.log(e);
        return res.json(e);
    }


};
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            locations: "",
            theatres: false,
            galleries: false,
            streetArts: false,
            localTastes: false,
            nonLocalTastes: false,
            museums: false,
            statues: false,
            sciences: false,
            parks: false,
            sports: false,
            movies: false,
            musics: false,
            nightLife: false,
            games: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkTheatres = this.checkTheatres.bind(this);
        this.checkGalleries = this.checkGalleries.bind(this);
        this.checkStreetArts = this.checkStreetArts.bind(this);
        this.checkLocalTastes = this.checkLocalTastes.bind(this);
        this.checkNonLocalTastes = this.checkNonLocalTastes.bind(this);
        this.checkMuseums = this.checkMuseums.bind(this);
        this.checkStatues = this.checkStatues.bind(this);
        this.checkSciences = this.checkSciences.bind(this);
        this.checkParks = this.checkParks.bind(this);
        this.checkSports = this.checkSports.bind(this);
        this.checkMovies = this.checkMovies.bind(this);
        this.checkMusics = this.checkMusics.bind(this);
        this.checkNightLife= this.checkNightLife.bind(this);
        this.checkGames = this.checkGames.bind(this);
    }

    // handles the textfield text input changes
    handleInputChange(event) {    
        this.setState({
            query: event.target.value
        });
    }

    // handles when the search button is clicked 
    async handleSubmit(e) {
        e.preventDefault();
        window.alert("Search was entered");

        const search = {
            query: this.state.query,
            theatres: this.state.theatres,
            galleries: this.state.galleries,
            streetArts: this.state.streetArts,
            localTastes: this.state.localTastes,
            nonLocalTastes: this.state.nonLocalTastes,
            museums: this.state.museums,
            statues: this.state.statues,
            sciences: this.state.sciences,
            parks: this.state.parks,
            sports: this.state.sports,
            movies: this.state.movies,
            musics: this.state.musics,
            nightLife: this.state.nightLife,
            games: this.state.games
        }

        const response = await fetch("http://localhost:5000/location", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(search),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        
        const record = await response.json();
        console.log(record)
        await this.setState({
            locations: record
        });
        await this.createSession();
        window.location.href = "/cards"
    }

    // handle theatres checkbox
    async checkTheatres(event) {
        await this.setState({
            theatres: event.target.checked
        });
    }

    // handles galleries checkbox
    async checkGalleries(event) {
        this.setState({
            galleries: event.target.checked
        });
    }

    // handles streetArts checkbox
    async checkStreetArts(event) {
        this.setState({
            streetArts: event.target.checked
        });
    }

    // handles localTastes checkbox
    async checkLocalTastes(event) {
        await this.setState({
            localTastes: event.target.checked
        });
    }

    // handles nonLocalTastes checkbox
    async checkNonLocalTastes(event) {
        await this.setState({
            nonLocalTastes: event.target.checked
        });
    }

    // handles museums checkbox
    async checkMuseums(event) {
        await this.setState({
            museums: event.target.checked
        });
    }

    // handles statues checkbox
    async checkStatues(event) {
        await this.setState({
            statues: event.target.checked
        });
    }

    // handles sciences checkbox
    async checkSciences(event) {
        await this.setState({
            sciences: event.target.checked
        });
    }

    // handles parks checkbox
    async checkParks(event) {
        await this.setState({
            parks: event.target.checked
        });
    }

    // handles sports checkbox
    async checkSports(event) {
        await this.setState({
            sports: event.target.checked
        });
    }

    // handles movies checkbox
    async checkMovies(event) {
        await this.setState({
            movies: event.target.checked
        });
    }

    // handles musics checkbox
    async checkMusics(event) {
        await this.setState({
            musics: event.target.checked
        });
    }

    // handles nightLife checkbox
    async checkNightLife(event) {
        await this.setState({
            nightLife: event.target.checked
        });
    }

    // handles games checkbox
    async checkGames(event) {
        await this.setState({
            games: event.target.checked
        });
    }

    // creates a local session to store location informations
    async createSession(event) {
        await sessionStorage.setItem("locations", JSON.stringify(this.state.locations))
    }

    render() {
        return (
            <>
                <TextField value={this.state.query} size='small' variant="outlined" onChange={this.handleInputChange}/>
                <Button variant="contained" onClick={this.handleSubmit}>Search</Button>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Preferences</FormLabel>
                    <FormGroup aria-label="position" column>
                        <FormControlLabel
                            value={this.state.theatres}
                            control={<Checkbox />}
                            label="Theatre/Opera"
                            labelPlacement="start"
                            onChange={this.checkTheatres}
                        />
                        <FormControlLabel
                            value={this.state.galleries}
                            control={<Checkbox />}
                            label="Galleries"
                            labelPlacement="start"
                            onChange={this.checkGalleries}
                        />
                        <FormControlLabel
                            value={this.state.streetArts}
                            control={<Checkbox />}
                            label="Street Art"
                            labelPlacement="start"
                            onChange={this.checkStreetArts}
                        />
                        <FormControlLabel
                            value={this.state.localTastes}
                            control={<Checkbox />}
                            label="Local Tastes"
                            labelPlacement="start"
                            onChange={this.checkLocalTastes}
                        />
                        <FormControlLabel
                            value={this.state.nonLocalTastes}
                            control={<Checkbox />}
                            label="Non-local Tastes"
                            labelPlacement="start"
                            onChange={this.checkNonLocalTastes}
                        />
                        <FormControlLabel
                            value={this.state.museums}
                            control={<Checkbox />}
                            label="Museums"
                            labelPlacement="start"
                            onChange={this.checkMuseums}
                        />
                        <FormControlLabel
                            value={this.state.statues}
                            control={<Checkbox />}
                            label="Statues"
                            labelPlacement="start"
                            onChange={this.checkStatues}
                        />
                        <FormControlLabel
                            value={this.state.sciences}
                            control={<Checkbox />}
                            label="Sciences"
                            labelPlacement="start"
                            onChange={this.checkSciences}
                        />
                        <FormControlLabel
                            value={this.state.parks}
                            control={<Checkbox />}
                            label="Parks"
                            labelPlacement="start"
                            onChange={this.checkParks}
                        />
                        <FormControlLabel
                            value={this.state.sports}
                            control={<Checkbox />}
                            label="Sports"
                            labelPlacement="start"
                            onChange={this.checkSports}
                        />
                        <FormControlLabel
                            value={this.state.movies}
                            control={<Checkbox />}
                            label="Movies"
                            labelPlacement="start"
                            onChange={this.checkMovies}
                        />
                        <FormControlLabel
                            value={this.state.musics}
                            control={<Checkbox />}
                            label="Musics"
                            labelPlacement="start"
                            onChange={this.checkMusics}
                        />
                        <FormControlLabel
                            value={this.state.nightLife}
                            control={<Checkbox />}
                            label="Night Life"
                            labelPlacement="start"
                            onChange={this.checkNightLife}
                        />
                        <FormControlLabel
                            value={this.state.games}
                            control={<Checkbox />}
                            label="Games/Arcades"
                            labelPlacement="start"
                            onChange={this.checkGames}
                        />
                    </FormGroup>
                </FormControl>
            </>
        );
    }
}

export default Search;
import React from "react";
import CartProxy from "../cart/CartProxy"
import Ticket from "../cart/Ticket"

class Seat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showing: JSON.parse(window.sessionStorage.getItem("currentShowing")),
            movie: JSON.parse(window.sessionStorage.getItem("currentMovie")),
            activeArray: JSON.parse(window.sessionStorage.getItem("currentShowing")).seats,
            boolArray: "",
            seatNames: "",
            youthCount: 0,
            elderCount: 0,
            numSeatsSelected: 0,
        }

        this.fillBoolArray = this.fillBoolArray.bind(this)
        this.fillSeatNames = this.fillSeatNames.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSeatUpdate = this.handleSeatUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount() {
        console.log(this.state.showing)
        console.log(this.state.showing.seats)
        this.fillSeatNames()
        this.fillBoolArray()
    }

    componentWillUnmount() {

    }

    fillSeatNames() {
        const seatNames = ["1A", "1B", "1C", "1D", "1E", "1F", "1G", "1H", "1I", "1J",
            "2A", "2B", "2C", "2D", "2E", "2F", "2G", "2H", "2I", "2J", 
            "3A", "3B", "3C", "3D", "3E", "3F", "3G", "3H", "3I", "3J", 
            "4A", "4B", "4C", "4D", "4E", "4F", "4G", "4H", "4I", "4J", 
            "5A", "5B", "5C", "5D", "5E", "5F", "5G", "5H", "5I", "5J",
            "6A", "6B", "6C", "6D", "6E", "6F", "6G", "6H", "6I", "6J",
            "7A", "7B", "7C", "7D", "7E", "7F", "7G", "7H", "7I", "7J",
            "8A", "8B", "8C", "8D", "8E", "8F", "8G", "8H", "8I", "8J",
            "9A", "9B", "9C", "9D", "9E", "9F", "9G", "9H", "9I", "9J",
            "10A", "10B", "10C", "10D", "10E", "10F", "10G", "10H", "10I", "10J"]

            this.setState({seatNames: seatNames})
    }

    fillBoolArray() {
        const boolArray = []
        for (let i = 0; i < 100; i++) {
            boolArray.push(false)
        }
        this.setState({boolArray: boolArray})
    }

    handleInputChange(event) {
        const name = event.target.name
        const value = event.target.value
    
        this.setState({
          [name]: value
        });
    }

    handleSeatUpdate(event) {
        const index = event.target.value
        const newBoolArray = this.state.boolArray.map((element, i) => {
            if (i == index) {
                if (element == false) {
                    const newNumSeats = this.state.numSeatsSelected + 1
                    this.setState({numSeatsSelected: newNumSeats})
                } else {
                    const newNumSeats = this.state.numSeatsSelected - 1
                    this.setState({numSeatsSelected: newNumSeats})
                }
                return !element
            } else {
                return element
            }
        })
        this.setState({boolArray: newBoolArray})
    }

    handleSubmit(event) {
        event.preventDefault()
        //console.log("In handleSubmit")
        if (this.state.numSeatsSelected < 1) {
            window.alert("Please select at least one seat.")
            return
        }

        const cart = new CartProxy()

        let seatTotal = this.state.numSeatsSelected
        let numYouth = this.state.youthCount
        let numElder = this.state.elderCount

        console.log(seatTotal)
        console.log(numYouth)
        console.log(numElder)
        console.log(this.state.boolArray)


        for (let i in this.state.boolArray) {
            if (this.state.boolArray[i] === false) {
                continue
            }
            if (numYouth > 0) {
                cart.addTicket(new Ticket(i, "youth", this.state.seatNames[i]))
                numYouth--
                seatTotal--
                continue
            }
            if (numElder > 0) {
                let ticket2 = new Ticket(i, "elder", this.state.seatNames[i])
                cart.addTicket(ticket2)
                numElder--
                seatTotal--
                continue
            }
            let ticket3 = new Ticket(i, "adult", this.state.seatNames[i])
            cart.addTicket(ticket3)
            seatTotal--
        }
        console.log(cart)
        JSON.stringify(cart)
        sessionStorage.setItem("cart", JSON.stringify(cart))
        console.log("Total: " + seatTotal)
        console.log("Elder: " + numElder)
        console.log("Youth: " + numYouth)

        sessionStorage.setItem("checkout", "true")


        const newArray = this.state.activeArray
        console.log(newArray)
        for (let i in this.state.boolArray) {
            if (this.state.boolArray[i] === false) {
                continue
            }
            newArray[i] = "unavailable"
        }

        sessionStorage.setItem("seatArray", JSON.stringify(newArray))

        if (window.sessionStorage.getItem("loggedIn") === "true") {
            const showing = JSON.parse(sessionStorage.getItem("currentShowing"))
            window.location.href = "/ordersummary"
        } else {
            window.location.href = "/login"
        }
    }

     render() {   
        return (
            <div>
                <div class="selectSeat">
                    <h1 class="seatTitle">Select Seats</h1>
                    <form>
                        <div class="seatSelector">
                            <div class="screen"></div>
                            <div class="row">
                                <h6 class="rowTitle">Row 1</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[0] !== "unavailable" && <input type="checkbox" value={0} onChange={this.handleSeatUpdate} checked={this.state.boolArray[0]}></input>}
                                    {this.state.activeArray[0] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[1] !== "unavailable" && <input type="checkbox" value={1} onChange={this.handleSeatUpdate} checked={this.state.boolArray[1]}></input>}
                                    {this.state.activeArray[1] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[2] !== "unavailable" && <input type="checkbox" value={2} onChange={this.handleSeatUpdate} checked={this.state.boolArray[2]}></input>}
                                    {this.state.activeArray[2] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[3] !== "unavailable" && <input type="checkbox" value={3} onChange={this.handleSeatUpdate} checked={this.state.boolArray[3]}></input>}
                                    {this.state.activeArray[3] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[4] !== "unavailable" && <input type="checkbox" value={4} onChange={this.handleSeatUpdate} checked={this.state.boolArray[4]}></input>}
                                    {this.state.activeArray[4] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[5] !== "unavailable" && <input type="checkbox" value={5} onChange={this.handleSeatUpdate} checked={this.state.boolArray[5]}></input>}
                                    {this.state.activeArray[5] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[6] !== "unavailable" && <input type="checkbox" value={6} onChange={this.handleSeatUpdate} checked={this.state.boolArray[6]}></input>}
                                    {this.state.activeArray[6] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[7] !== "unavailable" && <input type="checkbox" value={7} onChange={this.handleSeatUpdate} checked={this.state.boolArray[7]}></input>}
                                    {this.state.activeArray[7] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[8] !== "unavailable" && <input type="checkbox" value={8} onChange={this.handleSeatUpdate} checked={this.state.boolArray[8]}></input>}
                                    {this.state.activeArray[8] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[9] !== "unavailable" && <input type="checkbox" value={9} onChange={this.handleSeatUpdate} checked={this.state.boolArray[9]}></input>}
                                    {this.state.activeArray[9] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="row">
                                <h6 class="rowTitle">Row 2</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[10] !== "unavailable" && <input type="checkbox" value={10} onChange={this.handleSeatUpdate} checked={this.state.boolArray[10]}></input>}
                                    {this.state.activeArray[10] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[11] !== "unavailable" && <input type="checkbox" value={11} onChange={this.handleSeatUpdate} checked={this.state.boolArray[11]}></input>}
                                    {this.state.activeArray[11] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[12] !== "unavailable" && <input type="checkbox" value={12} onChange={this.handleSeatUpdate} checked={this.state.boolArray[12]}></input>}
                                    {this.state.activeArray[12] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[13] !== "unavailable" && <input type="checkbox" value={13} onChange={this.handleSeatUpdate} checked={this.state.boolArray[13]}></input>}
                                    {this.state.activeArray[13] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[14] !== "unavailable" && <input type="checkbox" value={14} onChange={this.handleSeatUpdate} checked={this.state.boolArray[14]}></input>}
                                    {this.state.activeArray[14] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[15] !== "unavailable" && <input type="checkbox" value={15} onChange={this.handleSeatUpdate} checked={this.state.boolArray[15]}></input>}
                                    {this.state.activeArray[15] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[16] !== "unavailable" && <input type="checkbox" value={16} onChange={this.handleSeatUpdate} checked={this.state.boolArray[16]}></input>}
                                    {this.state.activeArray[16] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[17] !== "unavailable" && <input type="checkbox" value={17} onChange={this.handleSeatUpdate} checked={this.state.boolArray[17]}></input>}
                                    {this.state.activeArray[17] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[18] !== "unavailable" && <input type="checkbox" value={18} onChange={this.handleSeatUpdate} checked={this.state.boolArray[18]}></input>}
                                    {this.state.activeArray[18] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[19] !== "unavailable" && <input type="checkbox" value={19} onChange={this.handleSeatUpdate} checked={this.state.boolArray[19]}></input>}
                                    {this.state.activeArray[19] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="row">
                                <h6 class="rowTitle">Row 3</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[20] !== "unavailable" && <input type="checkbox" value={20} onChange={this.handleSeatUpdate} checked={this.state.boolArray[20]}></input>}
                                    {this.state.activeArray[20] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[21] !== "unavailable" && <input type="checkbox" value={21} onChange={this.handleSeatUpdate} checked={this.state.boolArray[21]}></input>}
                                    {this.state.activeArray[21] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[22] !== "unavailable" && <input type="checkbox" value={22} onChange={this.handleSeatUpdate} checked={this.state.boolArray[22]}></input>}
                                    {this.state.activeArray[22] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[23] !== "unavailable" && <input type="checkbox" value={23} onChange={this.handleSeatUpdate} checked={this.state.boolArray[23]}></input>}
                                    {this.state.activeArray[23] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[24] !== "unavailable" && <input type="checkbox" value={24} onChange={this.handleSeatUpdate} checked={this.state.boolArray[24]}></input>}
                                    {this.state.activeArray[24] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[25] !== "unavailable" && <input type="checkbox" value={25} onChange={this.handleSeatUpdate} checked={this.state.boolArray[25]}></input>}
                                    {this.state.activeArray[25] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[26] !== "unavailable" && <input type="checkbox" value={26} onChange={this.handleSeatUpdate} checked={this.state.boolArray[26]}></input>}
                                    {this.state.activeArray[26] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[27] !== "unavailable" && <input type="checkbox" value={27} onChange={this.handleSeatUpdate} checked={this.state.boolArray[27]}></input>}
                                    {this.state.activeArray[27] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[28] !== "unavailable" && <input type="checkbox" value={28} onChange={this.handleSeatUpdate} checked={this.state.boolArray[28]}></input>}
                                    {this.state.activeArray[28] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[29] !== "unavailable" && <input type="checkbox" value={29} onChange={this.handleSeatUpdate} checked={this.state.boolArray[29]}></input>}
                                    {this.state.activeArray[29] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="row">
                                <h6 class="rowTitle">Row 4</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[30] !== "unavailable" && <input type="checkbox" value={30} onChange={this.handleSeatUpdate} checked={this.state.boolArray[30]}></input>}
                                    {this.state.activeArray[30] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[31] !== "unavailable" && <input type="checkbox" value={31} onChange={this.handleSeatUpdate} checked={this.state.boolArray[31]}></input>}
                                    {this.state.activeArray[31] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[32] !== "unavailable" && <input type="checkbox" value={32} onChange={this.handleSeatUpdate} checked={this.state.boolArray[32]}></input>}
                                    {this.state.activeArray[32] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[33] !== "unavailable" && <input type="checkbox" value={33} onChange={this.handleSeatUpdate} checked={this.state.boolArray[33]}></input>}
                                    {this.state.activeArray[33] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[34] !== "unavailable" && <input type="checkbox" value={34} onChange={this.handleSeatUpdate} checked={this.state.boolArray[34]}></input>}
                                    {this.state.activeArray[34] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[35] !== "unavailable" && <input type="checkbox" value={35} onChange={this.handleSeatUpdate} checked={this.state.boolArray[35]}></input>}
                                    {this.state.activeArray[35] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[36] !== "unavailable" && <input type="checkbox" value={36} onChange={this.handleSeatUpdate} checked={this.state.boolArray[36]}></input>}
                                    {this.state.activeArray[36] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[37] !== "unavailable" && <input type="checkbox" value={37} onChange={this.handleSeatUpdate} checked={this.state.boolArray[37]}></input>}
                                    {this.state.activeArray[37] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[38] !== "unavailable" && <input type="checkbox" value={38} onChange={this.handleSeatUpdate} checked={this.state.boolArray[38]}></input>}
                                    {this.state.activeArray[38] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[39] !== "unavailable" && <input type="checkbox" value={39} onChange={this.handleSeatUpdate} checked={this.state.boolArray[39]}></input>}
                                    {this.state.activeArray[39] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="row">
                                <h6 class="rowTitle">Row 5</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[40] !== "unavailable" && <input type="checkbox" value={40} onChange={this.handleSeatUpdate} checked={this.state.boolArray[40]}></input>}
                                    {this.state.activeArray[40] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[41] !== "unavailable" && <input type="checkbox" value={41} onChange={this.handleSeatUpdate} checked={this.state.boolArray[41]}></input>}
                                    {this.state.activeArray[41] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[42] !== "unavailable" && <input type="checkbox" value={42} onChange={this.handleSeatUpdate} checked={this.state.boolArray[42]}></input>}
                                    {this.state.activeArray[42] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[43] !== "unavailable" && <input type="checkbox" value={43} onChange={this.handleSeatUpdate} checked={this.state.boolArray[43]}></input>}
                                    {this.state.activeArray[43] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[44] !== "unavailable" && <input type="checkbox" value={44} onChange={this.handleSeatUpdate} checked={this.state.boolArray[44]}></input>}
                                    {this.state.activeArray[44] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[45] !== "unavailable" && <input type="checkbox" value={45} onChange={this.handleSeatUpdate} checked={this.state.boolArray[45]}></input>}
                                    {this.state.activeArray[45] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[46] !== "unavailable" && <input type="checkbox" value={46} onChange={this.handleSeatUpdate} checked={this.state.boolArray[46]}></input>}
                                    {this.state.activeArray[46] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[47] !== "unavailable" && <input type="checkbox" value={47} onChange={this.handleSeatUpdate} checked={this.state.boolArray[47]}></input>}
                                    {this.state.activeArray[47] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[48] !== "unavailable" && <input type="checkbox" value={48} onChange={this.handleSeatUpdate} checked={this.state.boolArray[48]}></input>}
                                    {this.state.activeArray[48] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[49] !== "unavailable" && <input type="checkbox" value={49} onChange={this.handleSeatUpdate} checked={this.state.boolArray[49]}></input>}
                                    {this.state.activeArray[49] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="spacer">

                            </div>
                            <div class="row">
                                <h6 class="rowTitle">Row 6</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[50] !== "unavailable" && <input type="checkbox" value={50} onChange={this.handleSeatUpdate} checked={this.state.boolArray[50]}></input>}
                                    {this.state.activeArray[50] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[51] !== "unavailable" && <input type="checkbox" value={51} onChange={this.handleSeatUpdate} checked={this.state.boolArray[51]}></input>}
                                    {this.state.activeArray[51] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[52] !== "unavailable" && <input type="checkbox" value={52} onChange={this.handleSeatUpdate} checked={this.state.boolArray[52]}></input>}
                                    {this.state.activeArray[52] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[53] !== "unavailable" && <input type="checkbox" value={53} onChange={this.handleSeatUpdate} checked={this.state.boolArray[53]}></input>}
                                    {this.state.activeArray[53] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[54] !== "unavailable" && <input type="checkbox" value={54} onChange={this.handleSeatUpdate} checked={this.state.boolArray[54]}></input>}
                                    {this.state.activeArray[54] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[55] !== "unavailable" && <input type="checkbox" value={55} onChange={this.handleSeatUpdate} checked={this.state.boolArray[55]}></input>}
                                    {this.state.activeArray[55] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[56] !== "unavailable" && <input type="checkbox" value={56} onChange={this.handleSeatUpdate} checked={this.state.boolArray[56]}></input>}
                                    {this.state.activeArray[56] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[57] !== "unavailable" && <input type="checkbox" value={57} onChange={this.handleSeatUpdate} checked={this.state.boolArray[57]}></input>}
                                    {this.state.activeArray[57] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[58] !== "unavailable" && <input type="checkbox" value={58} onChange={this.handleSeatUpdate} checked={this.state.boolArray[58]}></input>}
                                    {this.state.activeArray[58] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[59] !== "unavailable" && <input type="checkbox" value={59} onChange={this.handleSeatUpdate} checked={this.state.boolArray[59]}></input>}
                                    {this.state.activeArray[59] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="row">
                                <h6 class="rowTitle">Row 7</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[60] !== "unavailable" && <input type="checkbox" value={60} onChange={this.handleSeatUpdate} checked={this.state.boolArray[60]}></input>}
                                    {this.state.activeArray[60] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[61] !== "unavailable" && <input type="checkbox" value={61} onChange={this.handleSeatUpdate} checked={this.state.boolArray[61]}></input>}
                                    {this.state.activeArray[61] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[62] !== "unavailable" && <input type="checkbox" value={62} onChange={this.handleSeatUpdate} checked={this.state.boolArray[62]}></input>}
                                    {this.state.activeArray[62] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[63] !== "unavailable" && <input type="checkbox" value={63} onChange={this.handleSeatUpdate} checked={this.state.boolArray[63]}></input>}
                                    {this.state.activeArray[63] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[64] !== "unavailable" && <input type="checkbox" value={64} onChange={this.handleSeatUpdate} checked={this.state.boolArray[64]}></input>}
                                    {this.state.activeArray[64] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[65] !== "unavailable" && <input type="checkbox" value={65} onChange={this.handleSeatUpdate} checked={this.state.boolArray[65]}></input>}
                                    {this.state.activeArray[65] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[66] !== "unavailable" && <input type="checkbox" value={66} onChange={this.handleSeatUpdate} checked={this.state.boolArray[66]}></input>}
                                    {this.state.activeArray[66] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[67] !== "unavailable" && <input type="checkbox" value={67} onChange={this.handleSeatUpdate} checked={this.state.boolArray[67]}></input>}
                                    {this.state.activeArray[67] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[68] !== "unavailable" && <input type="checkbox" value={68} onChange={this.handleSeatUpdate} checked={this.state.boolArray[68]}></input>}
                                    {this.state.activeArray[68] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[69] !== "unavailable" && <input type="checkbox" value={69} onChange={this.handleSeatUpdate} checked={this.state.boolArray[69]}></input>}
                                    {this.state.activeArray[69] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="row">
                                <h6 class="rowTitle">Row 8</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[70] !== "unavailable" && <input type="checkbox" value={70} onChange={this.handleSeatUpdate} checked={this.state.boolArray[70]}></input>}
                                    {this.state.activeArray[70] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[71] !== "unavailable" && <input type="checkbox" value={71} onChange={this.handleSeatUpdate} checked={this.state.boolArray[71]}></input>}
                                    {this.state.activeArray[71] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[72] !== "unavailable" && <input type="checkbox" value={72} onChange={this.handleSeatUpdate} checked={this.state.boolArray[72]}></input>}
                                    {this.state.activeArray[72] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[73] !== "unavailable" && <input type="checkbox" value={73} onChange={this.handleSeatUpdate} checked={this.state.boolArray[73]}></input>}
                                    {this.state.activeArray[73] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[74] !== "unavailable" && <input type="checkbox" value={74} onChange={this.handleSeatUpdate} checked={this.state.boolArray[74]}></input>}
                                    {this.state.activeArray[74] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[75] !== "unavailable" && <input type="checkbox" value={75} onChange={this.handleSeatUpdate} checked={this.state.boolArray[75]}></input>}
                                    {this.state.activeArray[75] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[76] !== "unavailable" && <input type="checkbox" value={76} onChange={this.handleSeatUpdate} checked={this.state.boolArray[76]}></input>}
                                    {this.state.activeArray[76] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[77] !== "unavailable" && <input type="checkbox" value={77} onChange={this.handleSeatUpdate} checked={this.state.boolArray[77]}></input>}
                                    {this.state.activeArray[77] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[78] !== "unavailable" && <input type="checkbox" value={78} onChange={this.handleSeatUpdate} checked={this.state.boolArray[78]}></input>}
                                    {this.state.activeArray[78] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[79] !== "unavailable" && <input type="checkbox" value={79} onChange={this.handleSeatUpdate} checked={this.state.boolArray[79]}></input>}
                                    {this.state.activeArray[79] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="row">
                                <h6 class="rowTitle">Row 9</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[80] !== "unavailable" && <input type="checkbox" value={80} onChange={this.handleSeatUpdate} checked={this.state.boolArray[80]}></input>}
                                    {this.state.activeArray[80] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[81] !== "unavailable" && <input type="checkbox" value={81} onChange={this.handleSeatUpdate} checked={this.state.boolArray[81]}></input>}
                                    {this.state.activeArray[81] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[82] !== "unavailable" && <input type="checkbox" value={82} onChange={this.handleSeatUpdate} checked={this.state.boolArray[82]}></input>}
                                    {this.state.activeArray[82] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[83] !== "unavailable" && <input type="checkbox" value={83} onChange={this.handleSeatUpdate} checked={this.state.boolArray[83]}></input>}
                                    {this.state.activeArray[83] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[84] !== "unavailable" && <input type="checkbox" value={84} onChange={this.handleSeatUpdate} checked={this.state.boolArray[84]}></input>}
                                    {this.state.activeArray[84] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[85] !== "unavailable" && <input type="checkbox" value={85} onChange={this.handleSeatUpdate} checked={this.state.boolArray[85]}></input>}
                                    {this.state.activeArray[85] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[86] !== "unavailable" && <input type="checkbox" value={86} onChange={this.handleSeatUpdate} checked={this.state.boolArray[86]}></input>}
                                    {this.state.activeArray[86] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[87] !== "unavailable" && <input type="checkbox" value={87} onChange={this.handleSeatUpdate} checked={this.state.boolArray[87]}></input>}
                                    {this.state.activeArray[87] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[88] !== "unavailable" && <input type="checkbox" value={88} onChange={this.handleSeatUpdate} checked={this.state.boolArray[88]}></input>}
                                    {this.state.activeArray[88] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[89] !== "unavailable" && <input type="checkbox" value={89} onChange={this.handleSeatUpdate} checked={this.state.boolArray[89]}></input>}
                                    {this.state.activeArray[89] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="row">
                                <h6 class="rowTitle" id="row10">Row 10</h6>
                                <label class="seatContainer">
                                    {this.state.activeArray[90] !== "unavailable" && <input type="checkbox" value={90} onChange={this.handleSeatUpdate} checked={this.state.boolArray[90]}></input>}
                                    {this.state.activeArray[90] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[91] !== "unavailable" && <input type="checkbox" value={91} onChange={this.handleSeatUpdate} checked={this.state.boolArray[91]}></input>}
                                    {this.state.activeArray[91] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[92] !== "unavailable" && <input type="checkbox" value={92} onChange={this.handleSeatUpdate} checked={this.state.boolArray[92]}></input>}
                                    {this.state.activeArray[92] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[93] !== "unavailable" && <input type="checkbox" value={93} onChange={this.handleSeatUpdate} checked={this.state.boolArray[93]}></input>}
                                    {this.state.activeArray[93] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[94] !== "unavailable" && <input type="checkbox" value={94} onChange={this.handleSeatUpdate} checked={this.state.boolArray[94]}></input>}
                                    {this.state.activeArray[94] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[95] !== "unavailable" && <input type="checkbox" value={95} onChange={this.handleSeatUpdate} checked={this.state.boolArray[95]}></input>}
                                    {this.state.activeArray[95] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[96] !== "unavailable" && <input type="checkbox" value={96} onChange={this.handleSeatUpdate} checked={this.state.boolArray[96]}></input>}
                                    {this.state.activeArray[96] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[97] !== "unavailable" && <input type="checkbox" value={97} onChange={this.handleSeatUpdate} checked={this.state.boolArray[97]}></input>}
                                    {this.state.activeArray[97] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[98] !== "unavailable" && <input type="checkbox" value={98} onChange={this.handleSeatUpdate} checked={this.state.boolArray[98]}></input>}
                                    {this.state.activeArray[98] === "unavailable" && <div class="square"></div>}
                                </label>
                                <label class="seatContainer">
                                    {this.state.activeArray[99] !== "unavailable" && <input type="checkbox" value={99} onChange={this.handleSeatUpdate} checked={this.state.boolArray[99]}></input>}
                                    {this.state.activeArray[99] === "unavailable" && <div class="square"></div>}
                                </label>
                            </div>
                            <div class="letterRow">
                                <h6 class="columnTitle">A</h6>
                                <h6 class="columnTitle">B</h6>
                                <h6 class="columnTitle">C</h6>
                                <h6 class="columnTitle">D</h6>
                                <h6 class="columnTitle">E</h6>
                                <h6 class="columnTitle">F</h6>
                                <h6 class="columnTitle">G</h6>
                                <h6 class="columnTitle">H</h6>
                                <h6 class="columnTitle">I</h6>
                                <h6 class="columnTitle">J</h6>
                            </div>
                        </div>

                        <div>
                        <h4>Seats Selected:</h4>
                            {this.state.boolArray && this.state.boolArray.map(((element, index) => {
                                console.log(element)
                                if (element == true ) { 
                                    return <div key={index}>
                                        <p>Seat: {this.state.seatNames[index]}</p>
                                    </div>
                                }
                            }))
                                
                            }
                        </div>

                        <label htmlFor="youthCount" class="youthLabel">Amount of Youth Tickets: </label>
                        <input class="textfield" type="number" id="youthCount" name="youthCount" min={0} max={this.state.numSeatsSelected-this.state.elderCount} required value={this.state.youthCount} onChange={this.handleInputChange}></input><br></br>

                        <label htmlFor="elderCount">Amount of Senior Tickets: </label>
                        <input class="textfield" type="number" id="elderCount" name="elderCount" min={0} max={this.state.numSeatsSelected-this.state.youthCount} required value={this.state.elderCount} onChange={this.handleInputChange}></input><br></br><br></br>
                        
                        <input class="submit" type="submit" value="Continue" onClick={this.handleSubmit}></input>
                    </form>
                </div>
            </div>
        )
     }
}

export default Seat;

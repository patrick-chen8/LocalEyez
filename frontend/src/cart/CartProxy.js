import Cart from "./Cart.js"

class CartProxy {
    
    constructor() {
        this.cart = null
    }


    addTicket(ticket) {
        if (this.cart == null) {
            this.cart = new Cart()
            this.cart.addTicket(ticket)
        } else {
            this.cart.addTicket(ticket)
        }
    }

    deleteTicket(ticket) {
        if (this.cart == null) {
            console.log("No cart available")
        } else {
            this.cart.deleteTicket(ticket)
        }
    }
    
    getTickets() {
        if (this.cart == null) {
            console.log("No cart available")
        } else {
            return this.cart.getTickets()
        }
    }

    calTotal() {
        if (this.cart == null) {
            return 0
        } else {
            return this.cart.calTotal()
        }
    }

    calTotal() {
        if (this.cart == null) {
            return 0
        } else {
            return this.cart.calSubtotal()
        }
    }

}

export default CartProxy;
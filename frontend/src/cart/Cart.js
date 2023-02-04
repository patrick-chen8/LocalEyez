class Cart {
    
    constructor() {
        this.tickets = []
        this.promo = 0
        this.subtotal = ""
        this.total = ""
    }


    addTicket(ticket) {
        this.tickets.push(ticket)
    }

    deleteTicket(index) {
        if (this.tickets[index] != null) {
            delete this.tickets[index]
            return true
        }
    }


    
    getTickets() {
        return this.tickets
    }

    setPromo(amount) {
        this.promo = amount
    }

    calTotal() {
        let total = this.calSubtotal()
        if (this.promo <= 100) {
            total = total * (100 - (this.promo/100))
        }
        return total
    }

    calSubtotal() {
        let subtotal = 0
        for (let ticket in this.tickets) {
            subtotal += ticket.price
        }
        return subtotal
    }
    
    
}

export default Cart
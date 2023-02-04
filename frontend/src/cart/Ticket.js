class Ticket {
    
    
    constructor(index, type, identifier) {
        this.index = index
        this.type = type
        this.identifier = identifier
        this.price = ""
        this.setPrice()
    }

    setPrice() {
        if (this.type == "youth") {
            this.price = 8
        } else if (this.type == "elder"){
            this.price = 9
        } else {
            this.price = 12
        }
    }
    
}

export default Ticket
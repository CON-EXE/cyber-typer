export class Score {
    #hits;
    #percentage;
      
    constructor(hits, percentage) {
        this.#hits = hits;
        this.#percentage = percentage;
    }
      
    get hits() { return this.#hits; }
    get percentage() { return this.#percentage; }

    /* 
        I want it to be know that in the past we were told to mainly use private values 
        when making classes and so thats what I've been doing in assignmnets since then. 
        Not once was it mentioned that JSON.stringify would ignore private values. 
        Because of this I've spent the past hour trying to figure out why JSON.stringify was 
        returning blank. I don't know if this is best practice but it's the best solution I 
        could find.
    */
    toJSON() {
        return {
            hits: this.#hits,
            percentage: this.#percentage
        };
    }
}
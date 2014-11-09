/*
 * The Cell class is used as component for the World class. It has a coordinate,
 * a life and 2-4 neighbors.
 */
function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.life = Math.round(Math.random() * 50) + 50;
    this.neighbors = [];
}

/*
 * Updates the life based on the "game of life" rules including some random
 * elements. If the neighbors have an average life of less than 25 or more than
 * 75, the cell loses life with a probability of 80%. If it is between 25 and
 * 50, the cell gains life with a probability of 80%. Otherwise, the probability
 * is 50%.
 */
Cell.prototype.update = function() {
    var sum = 0;
    for (var i = 0; i < this.neighbors.length; i++) {
        sum += this.neighbors[i].life;
    }
    sum /= this.neighbors.length;
    if (sum < 25 || sum > 75) {
        healthy = Math.random() > 0.8;
    } else if (sum > 50) {
        healthy = Math.random() > 0.2;
    } else {
        healthy = Math.random() > 0.5;
    }
    if (healthy) {
        if (this.life < 100) {
            ++this.life;
        }
    } else {
        if (this.life > 0) {
            --this.life;
        }
    }
};

/*
 * The Cell class is used as component for the World class. It has a coordinate,
 * a life and 2-4 neighbors.
 */
function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.life = false;
    this.nextLife = null;
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
        if (this.neighbors[i].life) sum++;
    }
    if(this.life){
        if(sum<2 || sum>3) this.nextLife = false;
    }else{
        if(sum==3) this.nextLife = true;
    }
};

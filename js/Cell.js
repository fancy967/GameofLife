/*
 * The Cell class is used as component for the World class. It has a coordinate,
 * a life and up to 8 neighbors.
 */
function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.life = false;
    this.nextLife = null;
    this.neighbors = [];
}

Cell.deadColor = '255, 255, 255';
Cell.LivingColors = [
    '200, 200, 255', '200, 200, 200',   // starved dead
    '0, 0, 200',                        // happy alive
    '0, 200, 0',                        // sexy alive
    '200, 0, 0', '180, 180, 180',       // suffocated dead
    '200, 200,   0', '0, 200, 200',     // smoothed dead
    '0, 0, 0'                           // fucking dead
];

/*
 * Updates the life based on the "game of life" rules:
 * 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
 * 2. Any live cell with two or three live neighbours lives on to the next generation.
 * 3. Any live cell with more than three live neighbours dies, as if by over-population.
 * 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
 */
Cell.prototype.update = function () {
    var count = 0;
    for (var i = 0; i < this.neighbors.length; i++) {
        if (this.neighbors[i].life) count++;
    }
    if (this.life) {
        if (count < 2 || count > 3) this.nextLife = false;
    } else {
        if (count == 3) this.nextLife = true;
    }
    return this.life == this.nextLife;
};

Cell.prototype.getColor = function () {
    var count = 0;
    for (var i = 0; i < this.neighbors.length; i++) {
        if (this.neighbors[i].nextLife) count++;
    }
    return Cell.LivingColors[count];
};

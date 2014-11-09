/*
 * The World class keeps track of the cells which are organized as a grid and
 * stored in a two-dimensional array. Also stores a reference to the selected
 * cell.
 */
function World(x, y) {
    this.x = x;
    this.y = y;
    this.cells = [[]];
    this.selected = null;
}

/*
 * Creates all the cells and connects the neighbors.
 */
World.prototype.init = function() {
    var canvas = document.getElementById("canvas");
    this.width = canvas.width / this.x;
    this.height = (canvas.height - 200) / this.y;
    this.cells = Array(this.x);

    for (var i = 0; i < this.x; ++i) {
        this.cells[i] = Array(this.y);
    }
    for (var i = 0; i < this.x; ++i) {
        for (var j = 0; j < this.y; ++j) {
            this.cells[i][j] = new Cell(i, j);
        }
    }
    for (var i = 0; i < this.x; ++i) {
        for (var j = 0; j < this.y; ++j) {
            var n = [];
            if (i > 0) {
                n.push(this.cells[i - 1][j]);
            }
            if (i < this.x - 1) {
                n.push(this.cells[i + 1][j]);
            }
            if (j > 0) {
                n.push(this.cells[i][j - 1]);
            }
            if (j < this.y - 1) {
                n.push(this.cells[i][j + 1]);
            }
            this.cells[i][j].neighbors = n;
        }
    }
};

/*
 * Updates every cell.
 */
World.prototype.update = function() {
    for (var i = 0; i < this.x; ++i) {
        for (var j = 0; j < this.y; ++j) {
            this.cells[i][j].update();
        }
    }
};

/*
 * Draws the cell grid including thin borders. The fill color depends on the
 * life of the cell. The selected cell is highlighted by a red border and an
 * inverted rectangle.
 */
World.prototype.draw = function() {
    var context = document.getElementById("canvas").getContext("2d");
    context.save();

    for (var i = 0; i < this.x; ++i) {
        for (var j = 0; j < this.y; ++j) {
            var val = Math.round(255 * this.cells[i][j].life / 100);
            context.fillStyle = "rgb(0, " + val + ", 0)";
            context.fillRect(i * this.width, j * this.height, this.width, this.height);
            if (this.selected === this.cells[i][j]) {
                context.strokeStyle = "rgb(255, 150, 100)";
                context.lineWidth = 2;
                context.strokeRect(i * this.width + 1, j * this.height + 1, this.width - 2, this.height - 2);
                context.strokeStyle = "rgb(0, " + (255 - val) + ", 0)";
                context.lineWidth = 4;
                context.strokeRect(i * this.width + 8, j * this.height + 8, this.width - 16, this.height - 16);
            }
        }
    }

    context.restore();
    context.strokeRect(0.5, 0.5, this.x * this.width - 1, this.y * this.height - 1);
};

/*
 * Finds the cell at the given coordinates and creates a selection event which
 * will either select or deselect the cell, depending on the previous selection
 * status.
 */
World.prototype.select = function(x, y) {
    for (var i = 0; i < this.x; ++i) {
        for (var j = 0; j < this.y; ++j) {
            var dx = x - i * this.width;
            var dy = y - j * this.height;
            if (dx > 0 && dx < this.width && dy > 0 && dy < this.height) {
                if (this.selected === this.cells[i][j]) {
                    return new SelectionEvent(this.selected, null);
                } else {
                    return new SelectionEvent(this.selected, this.cells[i][j]);
                }
            }
        }
    }
};

/*
 * Calculates the average life in the world.
 */
World.prototype.average = function() {
    var average = 0;
    for (var i = 0; i < this.x; ++i) {
        for (var j = 0; j < this.y; ++j) {
            average += this.cells[i][j].life;
        }
    }
    average /= this.x * this.y;
    return Math.round(average);
};

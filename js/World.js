/*
 * The World class keeps track of the cells which are organized as a grid and
 * stored in a two-dimensional array. Also stores a reference to the selected
 * cell.
 */
function World(x, y) {
    this.x = x;
    this.y = y;
    this.cells = [[]];
}

/*
 * Creates all the cells and connects the neighbors.
 */
World.prototype.init = function() {
    var canvas = document.getElementById("canvas");
    this.width = canvas.width / this.x;
    this.height = (canvas.height - game.btmHeight) / this.y;
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
            if (i > 0)
                n.push(this.cells[i - 1][j]);
            if (i < this.x - 1)
                n.push(this.cells[i + 1][j]);
            if (j > 0)
                n.push(this.cells[i][j - 1]);
            if (j < this.y - 1)
                n.push(this.cells[i][j + 1]);
            if (i > 0 && j > 0)
                n.push(this.cells[i - 1][j-1]);
            if (i > 0 && j < this.y - 1)
                n.push(this.cells[i - 1][j+1]);
            if (i < this.x - 1 && j > 0)
                n.push(this.cells[i+1][j-1]);
            if (i < this.x - 1  && j < this.y - 1)
                n.push(this.cells[i + 1][j+1]);
            this.cells[i][j].neighbors = n;
        }
    }
};

/*
 * Updates every cell.
 */
World.prototype.update = function() {
    var canStop = false;
    if (game.start)
    {
        var startTime = Date.now();
        var canStop = true;
        for (var i = 0; i < this.x; ++i) {
            for (var j = 0; j < this.y; ++j) {
                this.cells[i][j].update();
                if (this.cells[i][j].life != this.cells[i][j].nextLife) canStop = false;
            }
        }
        game.generation++;
        window.setTimeout(this.update.bind(this), Math.max(0, game.speed + startTime - Date.now()));
    }
    if(canStop){
        if (game.generation != 1) game.generation--;
        game.start = false;
    }
};

/*
 * Draws the cell grid including thin borders. The fill  color depends on the
 * life of the cell. The selected cell is highlighted by a red border and an
 * inverted rectangle.
 */
World.prototype.draw = function() {
    var context = document.getElementById("canvas").getContext("2d");
    context.save();

    for (var i = 0; i < this.x; ++i) {
        for (var j = 0; j < this.y; ++j) {
            var val = this.cells[i][j].nextLife ? 255 : 0;
            this.cells[i][j].life = this.cells[i][j].nextLife;
            context.fillStyle = "rgb(0, " + val + ", 0)";
            context.fillRect(i * this.width, j * this.height, this.width, this.height);

            //context.strokeStyle = "grey";
            //context.lineWidth = 1;
            //context.strokeRect(i * this.width, j * this.height, this.width, this.height);
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
                return new SelectionEvent(this.cells[i][j]);
            }
        }
    }
};

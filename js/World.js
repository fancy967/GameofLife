/*
 * The World class keeps track of the cells which are organized as a grid and
 * stored in a two-dimensional array. Also stores a reference to the selected
 * cell.
 */
function World(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.cells = [];
    this.cellWidth = 0;
    this.cellHeight = 0;
}

/*
 * Creates all the cells and connects the neighbors.
 */
World.prototype.init = function () {
    this.cellWidth = canvas.width / this.columns;
    this.cellHeight = (canvas.height - game.btmHeight) / this.rows;

    for (var i = 0; i < this.columns; ++i) {
        this.cells[i] = [];
        for (var j = 0; j < this.rows; ++j) {
            this.cells[i][j] = new Cell(i, j);
        }
    }
    for (i = 0; i < this.columns; ++i) {
        for (j = 0; j < this.rows; ++j) {
            var n = [];
            if (i > 0)
                n.push(this.cells[i - 1][j]);
            if (i < this.columns - 1)
                n.push(this.cells[i + 1][j]);
            if (j > 0)
                n.push(this.cells[i][j - 1]);
            if (j < this.rows - 1)
                n.push(this.cells[i][j + 1]);
            if (i > 0 && j > 0)
                n.push(this.cells[i - 1][j - 1]);
            if (i > 0 && j < this.rows - 1)
                n.push(this.cells[i - 1][j + 1]);
            if (i < this.columns - 1 && j > 0)
                n.push(this.cells[i + 1][j - 1]);
            if (i < this.columns - 1 && j < this.rows - 1)
                n.push(this.cells[i + 1][j + 1]);
            this.cells[i][j].neighbors = n;
        }
    }
    this.draw();
};

/*
 * Updates every cell.
 */
World.prototype.update = function () {
    var canStop = false;
    if (game.start) {
        var startTime = Date.now();
        canStop = true;
        for (var i = 0; i < this.columns; ++i) {
            for (var j = 0; j < this.rows; ++j) {
                canStop = this.cells[i][j].update() && canStop;
            }
        }
        game.generation++;
        window.setTimeout(this.update.bind(this), Math.max(0, game.speed + startTime - Date.now()));
        this.draw();
    }
    if (canStop) {
        if (game.generation != 1) game.generation--;
        game.start = false;
    }
    game.interface.draw();
};

/*
 * Draws the cell grid including thin borders. The fill  color depends on the
 * neighbors of the cell.
 */
World.prototype.draw = function () {
    context.save();
    // context.clearRect(0, 0, canvas.width, game.btmHeight);
    var lineWidth = 1;
    for (var i = 0; i < this.columns; ++i) {
        for (var j = 0; j < this.rows; ++j) {
            if (this.cells[i][j].nextLife || this.cells[i][j].nextLife != this.cells[i][j].life) {
                var color = this.cells[i][j].nextLife ? this.cells[i][j].getColor() : Cell.deadColor;
                this.cells[i][j].life = this.cells[i][j].nextLife;
                context.fillStyle = 'grey';
                context.fillRect(i * this.cellWidth, j * this.cellHeight, this.cellWidth, this.cellHeight);
                context.fillStyle = 'rgb(' + color + ')';
                context.fillRect(i * this.cellWidth + 0.5 * lineWidth, j * this.cellHeight + 0.5 * lineWidth,
                    this.cellWidth - lineWidth, this.cellHeight - lineWidth);
            }
        }
    }
    context.restore();
    context.strokeRect(0.5, 0.5, this.columns * this.cellWidth - 1, this.rows * this.cellHeight - 1);
};

/*
 * Finds the cell at the given coordinates and creates a selection event which
 * will either select or deselect the cell, depending on the previous selection
 * status.
 */
World.prototype.select = function (x, y) {
    var i = Math.ceil(x / this.cellWidth) - 1;
    var j = Math.ceil(y / this.cellHeight) - 1;
    return new SelectionEvent(this.cells[i][j]);
};
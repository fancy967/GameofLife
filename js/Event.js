/*
 * Event for start/stop buttons. These events are committed immediately and
 * not need be kept in the undo/redo stacks.
 */
function ControlEvent(start) {
    this.needPush = false;
    this.start = start;
    this.finished = true;
    this.keep = false;
    this.isCommit = true;
}

ControlEvent.prototype.commit = function(game) {
    if (!game.start && this.start)
    {
        game.generation = 0;
        game.start = this.start;
        game.world.update();
        game.undoStack.length = 0;
        game.redoStack.length = 0;
    }else if (game.start && !this.start)
    {
        game.start = this.start;
    }
};

/*
 * Event for reset all cells to default status in the world. Saves current living cells.
 * Is finished after executing, should be kept in the undo/redo stacks.
 */
function ResetEvent() {
    this.needPush = true;
    this.cell = [];
    this.finished = true;
    this.keep = true;
    this.isCommit = false;
}

ResetEvent.prototype.commit = function(game) {
    this.cell = [];
    for (var i = 0; i < game.world.columns; ++i) {
        for (var j = 0; j < game.world.rows; ++j) {
            this.cell.push(game.world.cells[i][j].life);
            game.world.cells[i][j].nextLife = false;
        }
    }
    game.generation = 0;
    game.world.draw();
    game.interface.draw();
};

ResetEvent.prototype.revert = function(game) {
    for (var i = 0; i < game.world.columns; ++i) {
        for (var j = 0; j < game.world.rows; ++j) {
            game.world.cells[i][j].nextLife = this.cell.shift();
        }
    }
    game.world.draw();
};

/*
 * Event for randomly set status of cells. Saves current living cells. Is finished
 * after executing, should be kept in the undo/redo stacks.
 */
function RandomEvent() {
    this.needPush = true;
    this.priviousLife = [];
    this.nextLife = [];
    this.finished = true;
    this.keep = true;
    this.isCommit = false;
}

RandomEvent.prototype.commit = function(game) {
    this.priviousLife = [];
    for (var i = 0; i < game.world.columns; ++i) {
        for (var j = 0; j < game.world.rows; ++j) {
            this.priviousLife.push(game.world.cells[i][j].life);
            if (this.nextLife.length > 0){
                game.world.cells[i][j].nextLife = this.nextLife.shift();
            }
            else{
                game.world.cells[i][j].nextLife = Math.random() > 0.6;
            }
        }
    }
    game.world.draw();
};

RandomEvent.prototype.revert = function(game) {
    this.nextLife = [];
    for (var i = 0; i < game.world.columns; ++i) {
        for (var j = 0; j < game.world.rows; ++j) {
            this.nextLife.push(game.world.cells[i][j].life);
            game.world.cells[i][j].nextLife = this.priviousLife.shift();
        }
    }
    game.world.draw();
};

/*
 * Event for selecting a cell in the world. Saves the previously selected cell.
 * Is finished after committing once (no animation), should be kept in the undo
 * redo stacks.
 */
function SelectionEvent(selected) {
    this.needPush = true;
    this.selected = selected;
    this.finished = true;
    this.keep = true;
    this.isCommit = false;
}

/*
 * Simply sets the selected cell.
 */
SelectionEvent.prototype.commit = function(game) {
    this.selected.nextLife = !this.selected.life;
    game.world.draw();
};

/*
 * Selects the previously selected cell.
 */
SelectionEvent.prototype.revert = function(game) {
    this.selected.nextLife = !this.selected.life;
    game.world.draw();
};

/*
 * Signals the undoing of the previous event. Is finished after executing and
 * should not be kept in the stacks.
 */
function UndoEvent() {
    this.needPush = true;
    this.finished = true;
    this.keep = false;
    this.isCommit = false;
}

/*
 * Reverts the last event and stores it on the redo stack.
 */
UndoEvent.prototype.commit = function(game) {
    var event = game.undoStack.pop();
    if (event) {
        event.revert(game);
        game.redoStack.push(event);
    }
};

/*
 * Signals the redoing of the previously undone event. Is finished after
 * execution and should not be kept in the stacks.
 */
function RedoEvent() {
    this.needPush = true;
    this.finished = true;
    this.keep = false;
    this.isCommit = false;
}

/*
 * Gets the previously undone event and commits it again. Then pushes it on the
 * undo stack.
 */
RedoEvent.prototype.commit = function(game) {
    var event = game.redoStack.pop();
    if (event) {
        event.commit(game);
        game.undoStack.push(event);
    }
};

/*
 * Event for setting the speed of cell life updating. Stores previous speed, is finished after
 * execution and should be kept in the stacks.
 */
function SpeedEvent(speed,component) {
    this.needPush = true;
    this.component = component;
    this.previous = null;
    this.speed = speed;
    this.finished = true;
    this.keep = true;
    this.isCommit = false;
}

/*
 * Gets the previous speed and sets the new speed for cell life updating.
 */
SpeedEvent.prototype.commit = function(game) {
    this.previous = game.speed;
    game.speed = this.speed;
    this.component.value = (this.speed - 150) / 500;
    game.interface.draw();
};

/*
 * Sets the previous life of the cell.
 */
SpeedEvent.prototype.revert = function(game) {
    game.speed = this.previous;
    this.component.value = (this.previous - 150) / 500;
    game.interface.draw();
};

/*
 * Event for select multi cells at once. If isCommit, no need to commit it in event loop.
 * Is finished after executing and should not be kept in the stacks.
 */
function MultiSelEvent(cells) {
    this.needPush = true;
    this.finished = true;
    this.keep = true;
    this.isCommit = true;
    this.cells = cells || [];
}

MultiSelEvent.prototype.commit = function() {
    this.cells.forEach(function(cell){
        cell.nextLife = true;
    });
    game.world.draw();
};

MultiSelEvent.prototype.revert = function() {
    this.cells.forEach(function(cell){
        cell.nextLife = false;
    });
    game.world.draw();
};
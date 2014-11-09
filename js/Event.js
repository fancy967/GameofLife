/*
 * Event for selecting a cell in the world. Saves the previously selected cell.
 * Is finished after committing once (no animation), should be kept in the undo
 * redo stacks.
 */
function SelectionEvent(previous, selected) {
    this.previous = previous;
    this.selected = selected;
    this.finished = true;
    this.keep = true;
}

/*
 * Simply sets the selected cell.
 */
SelectionEvent.prototype.commit = function(game) {
    game.world.selected = this.selected;
};

/*
 * Selects the previously selected cell.
 */
SelectionEvent.prototype.revert = function(game) {
    game.world.selected = this.previous;
};

/*
 * Event for setting life of a cell. Stores previous life, is finished after
 * execution and should be kept in the stacks.
 */
function LifeEvent(life) {
    this.previous = null;
    this.life = life;
    this.finished = true;
    this.keep = true;
}

/*
 * Gets the previous life and sets the new life of the selected cell.
 */
LifeEvent.prototype.commit = function(game) {
    if (game.world.selected) {
        this.previous = game.world.selected.life;
        game.world.selected.life = this.life;
    }
};

/*
 * Sets the previous life of the cell.
 */
LifeEvent.prototype.revert = function(game) {
    if (game.world.selected) {
        game.world.selected.life = this.previous;
    }
};

/*
 * Signals the undoing of the previous event. Is finished after executing and
 * should not be kept in the stacks.
 */
function UndoEvent() {
    this.finished = true;
    this.keep = false;
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
    this.finished = true;
    this.keep = false;
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
 * Event for pulse effects for selected items, not yet implemented..
 */
function PulseEvent(color) {
    this.color = color;
    this.period = 60;
    this.finished = false;
    this.keep = false;
}

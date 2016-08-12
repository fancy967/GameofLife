/*
 * The Game class is the central unit, it holds the event queue, stacks for
 * undo and redo, the user interface and the world.
 */
function Game(canWidth, canHeight, size) {
    this.speed = 100;
    this.eventQueue = [];
    this.undoStack = [];
    this.redoStack = [];
    this.btmHeight = 50;
    var size = size || 20;
    this.world = new World(Math.floor(canWidth / size), Math.floor((canHeight - this.btmHeight) / size));
    this.interface = new Interface();
    this.start = false;
    this.generation = 0;
    this.multiSelCells = [];
}

/*
 * Initializes the Game components. Creates the mouse listener, initializes the
 * world and the user interface, then starts the event loop.
 */
Game.prototype.init = function () {
    canvas.addEventListener("mousedown", this.onMouseEvent.bind(this), false);
    canvas.addEventListener("mousemove", this.onMouseEvent.bind(this), false);
    canvas.addEventListener("mouseup", this.onMouseEvent.bind(this), false);

    this.world.init();
    this.interface.init();

    this.update();
    //this.world.update();
};

/*
 * The event loop. Calls itself at most 30 times per second.
 */
Game.prototype.update = function () {
    // context.clearRect(0, 0, canvas.width, canvas.height);
    while (this.eventQueue.length) {
        var event = this.eventQueue.shift();
        if(!event.isCommit) event.commit(this);
        if (event.finished) {
            if (event.keep) {
                this.undoStack.push(event);
                this.redoStack.length = 0;
            }
        } else {
            this.eventQueue.push(event);
        }
    }
    // this.world.draw();
    // this.interface.draw();
    window.setTimeout(this.update.bind(this), 1000 / 30);
};

/*
 * Processes mouse events. Determines whether the world or the user interface
 * has been clicked and delegates the processing accordingly.
 */
Game.prototype.onMouseEvent = function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var event = null;
    if(e.type === 'mousedown'){
        if (y < canvas.height - this.btmHeight && this.start) {
            return;
        } else if (y < canvas.height - this.btmHeight) {
            event = this.world.select(x, y);
            this.multiSelCells.push(event.selected);
        } else {
            event = this.interface.click(x, y);
        }
    }else if(e.type === 'mousemove'){
        if (this.multiSelCells.length){
            if (y < canvas.height - this.btmHeight) {
                event = this.world.select(x, y);
                if (this.multiSelCells.indexOf(event.selected) === -1) {
                    this.multiSelCells.push(event.selected);
                    event.needPush = false;
                }else{
                    event = null;
                }
            }
        }
    }else if(e.type === 'mouseup'){
        if (this.multiSelCells.length <= 1) {
            this.multiSelCells = [];
            return;
        }
        event = game.undoStack.pop();
        if (!event instanceof SelectionEvent || this.multiSelCells.indexOf(event.selected) === -1) {
            game.undoStack.push(event);
        }
        event = new MultiSelEvent(this.multiSelCells);
        event.isCommit = true;
        this.multiSelCells = [];
    }

    if(event){
        if (event.needPush) {
            this.eventQueue.push(event);
        }else {
            event.commit(game);
        }
    }
};
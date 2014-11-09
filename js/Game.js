/**
 * The Game class is the central unit, it holds the event queue, stacks for
 * undo and redo, the user interface and the world.
 */
function Game() {
    this.eventQueue = [];
    this.undoStack = [];
    this.redoStack = [];
    this.world = new World(20, 10);
    this.interface = new Interface();
}

/*
 * Initializes the Game components. Creates the mouse listener, initiliazes the
 * world and the user interface, then starts the update loop.
 */
Game.prototype.init = function() {
    var canvas = document.getElementById('canvas');
    canvas.addEventListener("mousedown", this.click.bind(this), false);

    this.world.init();
    this.interface.init();

    this.update();
};

/*
 * The main loop. Clears the canvas, processes the event queue and redraws the
 * world and the interface. Calls itself at most 30 times per second.
 */
Game.prototype.update = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var startTime = Date.now();
//    console.log("update " + startTime);

    context.clearRect(0, 0, canvas.width, canvas.height);

    while (this.eventQueue.length > 0) {
        var event = this.eventQueue.shift();
        event.commit(this);
        if (event.finished) {
            if (event.keep) {
                this.undoStack.push(event);
                this.redoStack.length = 0;
            }
        } else {
            this.eventQueue.push(event);
        }
    }

    this.world.update();
    this.world.draw();
    this.interface.draw();

    window.setTimeout(this.update.bind(this), Math.max(0, 1000 / 30 + startTime - Date.now()));
};

/*
 * Processes mouse clicks. Determines whether the world or the user interface
 * has been clicked and delegates the processing accordingly.
 */
Game.prototype.click = function(e) {
    var canvas = document.getElementById("canvas");
    var x = e.x - canvas.offsetLeft;
    var y = e.y - canvas.offsetTop;
    var event;

    if (y < canvas.height - 200) {
        event = this.world.select(x, y);
    } else {
        event = this.interface.click(x, y);
    }
    if (event) {
        this.eventQueue.push(event);
    }
};

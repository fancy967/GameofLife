/*
 * The Interface class keeps track of the GUI. It has a list of components and
 * a global alpha.
 */
function Interface() {
    this.components = [];
}

/*
 * Initializes the interface by creating and positioning all components.
 */
Interface.prototype.init = function () {
    this.components.push(new Status(10, 0, 100, game.btmHeight));
    this.components.push(new Button(130, 5, "Start", new ControlEvent(true)));
    this.components.push(new Button(230, 5, "Stop", new ControlEvent(false)));
    this.components.push(new Button(330, 5, "Reset", new ResetEvent()));
    this.components.push(new Button(430, 5, "Random", null));
    this.components.push(new Button(530, 5, "Undo", new UndoEvent()));
    this.components.push(new Button(630, 5, "Redo", new RedoEvent()));
    this.components.push(new Slider(730, 5, 260, 40, 0));
    this.draw();
};

/*
 * Translates the canvas to the GUI area (the bottom 50 pixels) and calls the
 * draw() method of the components.
 */
Interface.prototype.draw = function () {
    context.save();
    context.translate(0, canvas.height - game.btmHeight - 1);
    context.clearRect(0, 0, canvas.width, game.btmHeight + 1);
    context.fillStyle = "rgb(200, 200, 200)";
    context.fillRect(0, 0, canvas.width, game.btmHeight);

    for (var i = 0; i < this.components.length; ++i) {
        this.components[i].draw(context);
    }

    context.strokeRect(0.5, 0.5, canvas.width - 1, game.btmHeight - 1);
    context.restore();
};

/*
 * Handles mouse clicks. Delegates the click action to the according component.
 */
Interface.prototype.click = function (x, y) {
    for (var i = 0; i < this.components.length; ++i) {
        if (this.components[i].within(x, y - canvas.height + game.btmHeight)) {
            if (this.components[i] instanceof Slider) {
                var c = this.components[i];
                return new SpeedEvent(150 + 500 * (x - c.x) / c.w, c);
            } else if (this.components[i].disable) {
                return null;
            } else if (this.components[i].text == "Random") {
                return new RandomEvent();
            } else return this.components[i].event;
        }
    }
};

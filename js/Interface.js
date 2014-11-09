/*
 * The Interface class keeps track of the GUI. It has a list of components and
 * a global alpha.
 */
function Interface() {
    this.components = [];
    this.alpha = 1;
}

/*
 * Initializes the interface by creating and positioning all components.
 */
Interface.prototype.init = function() {
    this.components.push(new Status(0, 0, 200, 200));
    this.components.push(new Button(220, 20, "kill", new LifeEvent(0)));
    this.components.push(new Button(360, 20, "heal", new LifeEvent(100)));
    this.components.push(new Button(220, 60, "undo", new UndoEvent()));
    this.components.push(new Button(360, 60, "redo", new RedoEvent()));
    this.components.push(new Slider(220, 100, 260, 40, this.alpha));
};

/*
 * Translates the canvas to the GUI area (the bottom 200 pixels) and calls the
 * draw() method of the components.
 */
Interface.prototype.draw = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.save();

    context.globalAlpha = this.alpha;
    context.translate(0, canvas.height - 201);
    context.fillStyle = "rgb(200, 200, 200)";
    context.fillRect(0, 0, canvas.width, 200);

    for (var i = 0; i < this.components.length; ++i) {
        this.components[i].draw(context);
    }

    context.strokeRect(0.5, 0.5, canvas.width - 1, 199);
    context.restore();
};

/*
 * Handles mouse clicks. Delegates the click action to the according component.
 */
Interface.prototype.click = function(x, y) {
    var canvas = document.getElementById("canvas");

    for (var i = 0; i < this.components.length; ++i) {
        if (this.components[i].within(x, y - canvas.height + 200)) {
            // Sliders don't have an event yet, so they're handled explicitly..
            if (this.components[i] instanceof Slider) {
                var c = this.components[i];
                c.value = (x - c.x) / c.w;
                if (c.value < 0.1) {
                    // Cap alpha value to 0.1
                    this.alpha = 0.1;
                } else {
                    this.alpha = c.value;
                }
            }
            return this.components[i].event;
        }
    }
};

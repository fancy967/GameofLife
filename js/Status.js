/*
 * The status component. Has no special attributes, accesses selected cell or
 * average life directly from world.
 */
function Status(x, y, w, h) {
    Component.call(this, x, y, w, h);
}

/*
 * Inherits from Component.
 */
Status.prototype = new Component();
Status.prototype.constructor = Status;

/*
 * Draws the status panel. If an element is selected in the world, it will get
 * its life, otherwise get the average life in the world.
 * Then draws a filled rectangle with the according amount of green color as
 * well as a text containing the life as a digit.
 */
Status.prototype.draw = function(context) {
    context.save();
    var text;
    text = "Gen = " + game.generation;
    context.fillStyle = "rgba(255, 255, 255, 0.8)";
    context.fillRect(this.x, this.y, this.w, this.h);
    
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "12pt Verdana";
    context.fillText(text, this.x + this.w / 2, this.y + this.h / 2);

    context.restore();
};

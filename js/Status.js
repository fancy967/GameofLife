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
    var life;
    var text;
    if (game.world.selected) {
        var cell = game.world.selected;
        life = cell.life;
        text = "cell[" + cell.x + ":" + cell.y + "] = " + life;
    } else {
        life = game.world.average();
        text = "average = " + life;
    }
    var val = Math.round(255 * life / 100);
    context.fillStyle = "rgb(0, " + val + ", 0)";
    context.fillRect(this.x, this.y, this.x + this.w, this.y + this.h);
    context.fillStyle = "rgba(255, 255, 255, 0.8)";
    context.fillRect(this.x, this.y + this.h - 40, this.x + this.w, this.y + this.h);
    
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "12pt Verdana";
    context.fillText(text, this.x + this.w / 2, this.y + this.h - 20);
    
    context.strokeRect(this.x + 0.5, this.y + 0.5, this.x + this.w - 1, this.y + this.h - 1);
    context.restore();
};

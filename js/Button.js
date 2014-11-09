/*
 * Simple button component with a text and an event.
 */
function Button(x, y, text, event) {
    Component.call(this, x, y, 120, 30);
    this.text = text;
    this.event = event;
}

/*
 * Inherits from Component
 */
Button.prototype = new Component();
Button.prototype.constructor = Button;

/*
 * Draws the button by combining the text with a filled and an empty rectangle.
 */
Button.prototype.draw = function(context) {
    var fontSize = 12;
    
    context.font = fontSize + "pt Verdana";
    var textSize = context.measureText(this.text);

    if (textSize.width + 10 > this.w) {
        this.w = textSize.width + 10;
    }
    
    if (fontSize + 10 > this.h) {
        this.h = fontSize + 10;
    }

    context.fillStyle = "rgb(150, 200, 255)";
    context.fillRect(this.x, this.y, this.w, this.h);

    context.strokeStyle = "black";
    context.strokeRect(this.x + 0.5, this.y + 0.5, this.w - 1, this.h - 1);

    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(this.text, this.x + this.w / 2, this.y + this.h / 2);
};

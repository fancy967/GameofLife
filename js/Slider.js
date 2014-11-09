/*
 * Simple slider component with a value.
 * Since there are no events for a changed value yet, there is no event.
 */
function Slider(x, y, w, h, value) {
    Component.call(this, x, y, w, h);
    this.value = value;
}

/*
 * Inherits from Component.
 */
Slider.prototype = new Component();
Slider.prototype.constructor = Slider;

/*
 * Draws the slider, one part is the bar, one part is the handle. Each part
 * consists of a filled and an empty rectangle.
 */
Slider.prototype.draw = function(context) {
    context.save();

    context.fillStyle = "rgb(150, 200, 255)";
    context.fillRect(this.x + 5, this.y + this.h / 4, this.w - 10, this.h / 2);
    context.strokeRect(this.x + 5.5, this.y + this.h / 4 + 0.5, this.w - 11, this.h / 2 - 1);

    context.fillRect(this.x + this.value * (this.w - 10), this.y, 10, this.h);
    context.strokeRect(this.x + this.value * (this.w - 10) + 0.5, this.y + 0.5, 9, this.h - 1);

    context.restore();
};

/*
 * Super class for GUI components. Stores the coordinates and width and height
 * of a component.
 */
function Component(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

/*
 * Check whether a coordinate is inside the component or not.
 */
Component.prototype.within = function(x, y) {
    var dx = x - this.x;
    var dy = y - this.y;
    return dx > 0 && dx < this.w && dy > 0 && dy < this.h;
};

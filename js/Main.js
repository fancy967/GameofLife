/*
 * Create new game instance and start the game when the website is loaded.
 */
'use strict';
var game = null;
var canvas = null;
var context = null;
var CELLSIZE = 15; //Default cell size in the world

if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
        try {
            canvas = document.getElementById('canvas');
            context = canvas.getContext('2d');
        } catch (ex) {
            return;
        }
        var pageWidth = window.innerWidth;
        var pageHeight = window.innerHeight;
        pageWidth = pageWidth < 1000 ? 1000 : pageWidth;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
        game = new Game(pageWidth, pageHeight, CELLSIZE);
        game.init();
    }, false);
}

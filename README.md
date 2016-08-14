HTML5 based Game of Life
=========================
This is a pure HTML5 canvas and Javascript implemented cellular automaton which is also known as [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).


Features
------------
* Only use HTML5 canvas and pure JavaScript, no other libraries.
* Support most of the browsers (see detail compatibility below).
* Colorful display of cell's current status. (Idea and color scheme from @DiegoSalazar, thanks)
* Support undo/redo of almost all user actions.
* Allow to control the speed of cell evolution.


## Browser compatibility
| Chrome | Firefox | Internet Explorer | Opera | Safari |
| ------ |:------- |:----------------- |:----- |:------ |
| 1.0    | 1.5     | 9.0               | 9.0   | 2.0    |


How to play
------------
1. Mark initial live cells in the world by:
	* Click one cell or draw a line of cells.
	*  Click 'Random' button.
2. Click 'Start' button and observe cells' evolution.
3. You can slow down the evolution by moving the slider from left to right.
4. After several generations, the cells in the world would come to one of three states: static balance, dynamic balance or no cell live.
5. You can stop or continue the evolution by click the 'Stop' and 'Start' button.


Demo
----------
[Demo here](http://fancy967.github.io/GameofLife)


Rules of Game of Life
----------
> 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
> 2. Any live cell with two or three live neighbours lives on to the next generation.
> 3. Any live cell with more than three live neighbours dies, as if by over-population.
> 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


## Changelog
[See commit message](https://github.com/fancy967/GameofLife/commits/master)


To Do List
----------
- Add predefined seeds.
- Reduce CPU/GPU usage


Screenshots
-----------
![](https://raw.githubusercontent.com/fancy967/Docs/master/gameoflife/gameoflife1.png)
![](https://raw.githubusercontent.com/fancy967/Docs/master/gameoflife/gameoflife2.png)


Report bugs
----------
- [Submit issue](https://github.com/fancy967/GameofLife/issues)
- [Email: 5217wyx#gmail.com](mailto: 5217wyx#gmail.com)
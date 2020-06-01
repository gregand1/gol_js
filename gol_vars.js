//game of life variables


//board size
var X=100;
var Y=100;

//state text 
var LIVE='1'
var DEAD='0'



//state colors in game board
var color_LIVE='#4594a8';
var color_DEAD='#2f4d4e';

//color values for values in neighbor count table
var color_neighbor_count=["#2c606d","#3b8091","#4594a8","#5ca9bc","#80bccb","#a4cfda","#c9e2e9","#edf5f8"];

var nextstate=[];

//when mouse down and move, paint depends on
//wether 1st tile is set live or dead
var paint_value=null;

//run or pause
var run=false;

//execution speed
var period;

//timer interval that executes a program tick
var tick_interval;
'use strict';

import objectOfShapes from "./js/createShape.js";
import _getArrOfShapes from "./js/getArrOfShapes.js";
import _createPlatform from "./js/createPlatform.js";

const dataOfShapes = _getArrOfShapes(10, objectOfShapes, 100, 100); //number of shapes, object, width, height
_createPlatform(dataOfShapes[1], 3); //shapes, number of sides
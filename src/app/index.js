'use strict';

import _createShape from "./js/createShape.js";
import _createPlatform from "./js/createPlatform.js";

_createPlatform(new _createShape(
    9, // number of sides
    [100, 100], //width, height
    [true, true] //sides, surface
), 1);
'use strict';

import _createShape from "./js/createShape.js";
import _createPlatform from "./js/createPlatform.js";

_createPlatform(new _createShape(
    5, // number of sides
    [100, 80], //width, height
    [] //sides, surface
), 1);
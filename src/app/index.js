'use strict';

import _createShape from "./js/createShape.js";
import _createPlatform from "./js/createPlatform.js";

_createPlatform(new _createShape(
    3, // number of sides
    [100, 90], //width, height
    [] //sides, surface
), 1);
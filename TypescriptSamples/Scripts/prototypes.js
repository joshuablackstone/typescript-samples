﻿(function () {
    "use strict";

    String.prototype.replaceAll = function (target, replacement) {
        return this.split(target).join(replacement);
    };
})();
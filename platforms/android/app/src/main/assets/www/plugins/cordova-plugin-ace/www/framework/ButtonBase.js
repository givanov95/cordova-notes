cordova.define("cordova-plugin-ace.ButtonBase", function(require, exports, module) {
//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------

//
// The base class for all button controls.
//
function ButtonBase(nativeTypeName) {
    if (!nativeTypeName) {
        throw new Error("You should instantiate a subclass instead");
    }
    // The caller wants an arbitrary UIElement, but with the strongly-typed members from this class
    ace.UIElement.call(this, nativeTypeName);
};

// Inheritance
ButtonBase.prototype = Object.create(ace.ContentControl.prototype);

module.exports = ButtonBase;

});

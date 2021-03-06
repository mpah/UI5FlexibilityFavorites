# UI5FlexibilityFavorites

Set SAPUI5 / SAP Fiori Page Variants automatically without user input by key or name. Additional option preselect a page variant selected as default for all users. This can be done by name or key. Requires the SmartVariantManagement Control in view. 

### Before: 
![image](https://user-images.githubusercontent.com/15245583/152566041-75e8713e-ac47-4acb-812b-0272407ce206.png)


### After:
![image](https://user-images.githubusercontent.com/15245583/152555204-9f390bdf-ebe2-4473-8dc0-83896575b493.png)

## Requirements
SAPUI5 Application connected to Flexibility Services. SmartVariantManagement component in view.  

## Example

### JSON Model: 
Requires a JSON Model called FavoritePageVariants, for possible properties see example [FavoritePageVariants.json](webapp/model/FavoritePageVariants.json)
Works with either key or name but you can also provide both. Keep in mind name is lcoalization dependant. The default page variant will only be selected if the user has not definined a default page variant already.

Add FavoritePageVariants as a JSON model in the manifest:
```
"FavoritePageVariants": {
      "type": "sap.ui.model.json.JSONModel",
      "settings": {},
      "uri": "model/FavoritePageVariants.json",
      "preload": true
}
```
 View must have the SmartVariantManagement control. SAP Fiori Elements apps have this if variant management is enabled (it is on default).

```
<smartVariantManagement:SmartVariantManagement id="smartVariantManagement" persistencyKey="flexibilityexamplePageVariants"/>
```
### Initialize the FlexibilityFavorites Module: 

Include the FlexibilityFavorites js module in your controller
```
sap.ui.define([
	"zmpah/flexibilityexample/controller/FlexibilityFavorites",
], function (FlexibilityFavorites) {
	"use strict";
	return BaseController.extend("zmpah.flexibilityexample.controller.App", {
```

Initialization must be done after metadata & flexibility data has already arrived but can happen before any actual data is loaded.
```
onBeforeRebindTable: function (oEvent) {
    if (!this.oSmartVariantManagment) {
       this.oSmartVariantManagment = this.byId("smartVariantManagement");
       var oFlexibilityFavoritesModel = this.getOwnerComponent().getModel("FavoritePageVariants");
       FlexibilityFavorites.setup(this.oSmartVariantManagment, oFlexibilityFavoritesModel);
    }
 }
```

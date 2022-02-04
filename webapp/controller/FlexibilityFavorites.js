/**
 * @author: Maksim Pahlberg <mpah@users.noreply.github.com">
 * @classdesc: Handler class for setting of SmartVariantManagement favorites
 * see: https://github.com/mpah/UI5FlexibilityFavorites
 */
 sap.ui.define([], function () {
	"use strict";

	return {

		/**
		 * Initial setup function for Flexibility Favorites, sets all page variants defined in  supplied oVariantsModel as favorites.
		 * Selects the default view if generic Standard view is set as current favorite. Will not override custom selected Variant.
		 *
		 * @public
		 * @param {sap.ui.comp.smartvariants.SmartVariantManagement} oSmartVariantManagement - SmartVariantManagement Page Control
		 * @param {sap.ui.model.json.JSONModel} oFavoritePageVariantsModel - JSONModel Variants.json
		 */
		setup: function (oSmartVariantManagement, oFavoritePageVariantsModel) {
			var aItems = oSmartVariantManagement.getVariantItems();
			var sDefaultVariantName = oFavoritePageVariantsModel.getProperty("/Default Variant Name/");
			var sDefaultVariantKey = oFavoritePageVariantsModel.getProperty("/Default Variant Key/");
			aItems.forEach(function (oItem) {
				//adds variants defined in oFavoritePageVariantsModel as favorites
				var sVariantName = oItem.getProperty("text");
				var sVariantKey = oItem.getProperty("key");
				var oVariantByName = oFavoritePageVariantsModel.getProperty("/FavoritesByName/" + sVariantName);
				var oVariantByKey = oFavoritePageVariantsModel.getProperty("/FavoritesByKey/" + sVariantKey);
				if (typeof oVariantByName !== "undefined" || typeof oVariantByKey !== "undefined") {
					oItem.setProperty("favorite", true);
				}
				//In case we need to quire the default variant key by name
				if (typeof sDefaultVariantKey === "undefined" && sVariantName === sDefaultVariantName) {
					sDefaultVariantKey = sVariantKey;
				}
			});
			var sCurrentVariantId = oSmartVariantManagement.getCurrentVariantId();
			if (sCurrentVariantId === "" && sDefaultVariantKey !== "") {
				this._selectVariantAsDefault(oSmartVariantManagement, sDefaultVariantKey);
			}
		},

		/**
		 * Select a page variant as the default by key and fires SmartVariantManagement event which saves selection to flexibility services
		 * 
		 * @private 
		 * @param {sap.ui.comp.smartvariants.SmartVariantManagement} oSmartVariantManagement - SmartVariantManagement Page Control
		 * @param {string} sDefaultVariantKey - selected default Variant key
		 */
		_selectVariantAsDefault: function (oSmartVariantManagement, sDefaultVariantKey) {
			oSmartVariantManagement.setCurrentVariantId(sDefaultVariantKey);
			oSmartVariantManagement.fireManage({
				def: sDefaultVariantKey
			});
		},

	};

});
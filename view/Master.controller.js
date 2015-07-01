jQuery.sap.require("dpa.util.Formatter");
jQuery.sap.require("dpa.util.Grouper");

sap.ui.controller("dpa.view.Master", {

	onExit : function() {
		if (this._lineItemViewDialog) {
			this._lineItemViewDialog.destroy();
			this._lineItemViewDialog = null;
		}
	},

	handleListItemPress : function(evt) {
		var context = evt.getSource().getBindingContext();
		this.nav.to("Detail", context);
	},

	handleListSelect : function(evt) {
		// get binding context and nav to detail page
		var context = evt.getParameter("listItem").getBindingContext();
		this.nav.to("Detail", context);
	},

	handleSearch : function(evt) {
		// create model filter
		var filters = [];
		var query = evt.getParameter("query");
		if (query && query.length > 0) {
			var filter = new sap.ui.model.Filter("id",
					sap.ui.model.FilterOperator.Contains, query);
			filters.push(filter);
		}

		// update list binding
		var list = this.getView().byId("list");
		var binding = list.getBinding("items");
		binding.filter(filters);
	},

	handleViewSettings : function(evt) {
		var that = this;
		if (!this._lineItemViewDialog) {
			// create dialog
			this._lineItemViewDialog = new sap.m.ViewSettingsDialog({
				groupItems : [ new sap.m.ViewSettingsItem({
					text : "Progress",
					key : "progress"
				}), new sap.m.ViewSettingsItem({
					text : "Status",
					key : "state"
				}) ],
				confirm : function(evt) {
					var aSorters = [];
					var mParams = evt.getParameters();
					if (mParams.groupItem) {
						var sPath = mParams.groupItem.getKey();
						var bDescending = mParams.groupDescending;
						var vGroup = dpa.util.Grouper[sPath];
						aSorters.push(new sap.ui.model.Sorter(sPath,
								bDescending, vGroup));
					}
					var oBinding = that.getView().byId("list").getBinding(
							"items");
					oBinding.sort(aSorters);
				}
			});
		}

		// open dialog
		this._lineItemViewDialog.open();
	}
});
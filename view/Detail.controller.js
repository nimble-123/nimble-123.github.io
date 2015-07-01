jQuery.sap.require("dpa.util.Formatter");
jQuery.sap.require("sap.m.MessageBox");
jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("dpa.view.Detail", {

  onInit : function(evt) {

  },
  
  handleCheckBox: function(evt) {
	var oCheckBox = evt.getSource();
	console.log(oCheckBox.getChecked());
  },
  
  handleKundenDokuBtn: function(evt) {
	  alert("Kundendokumentation erstellt und zum Export bereit");
  },

  handleForecastDataSelect : function(evt) {
    var xAxisIndex = (evt.getParameter("data")[0]).data[0].ctx.path.dii_a1;
    var oContext = this.getView().byId("lineChart").getBindingContext();
    var oSelectedData = this.getView().getModel().getProperty(
        oContext.sPath + "/ForecastData/" + xAxisIndex);

    console.log(oSelectedData);
  },

  handleOrderProposalDataSelect : function(evt) {
    // TODO write code to make Chart dynamic
  },

  handleNavButtonPress : function(evt) {
    this.nav.back("Master");
  },

  handleApprove : function(evt) {
    // show confirmation dialog
    var bundle = this.getView().getModel("i18n").getResourceBundle();
    sap.m.MessageBox.confirm(bundle.getText("ApproveDialogMsg"), function(
        oAction) {
      if (sap.m.MessageBox.Action.OK === oAction) {
        // notify user
        var successMsg = bundle.getText("ApproveDialogSuccessMsg");
        sap.m.MessageToast.show(successMsg);
        // TODO call proper service method and update model
      }
    },

    bundle.getText("ApproveDialogTitle"));
  },

});
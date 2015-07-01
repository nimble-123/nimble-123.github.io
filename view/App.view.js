sap.ui.jsview("dpa.view.App", {

  getControllerName : function() {
    return "dpa.view.App";
  },

  createContent : function(oController) {

    // to avoid scroll bars on desktop the root view must be set to block
    // display
    this.setDisplayBlock(true);

    // create app
    this.app = new sap.m.SplitApp();

    // load the master page
    var master = sap.ui.xmlview("Master", "dpa.view.Master");
    master.getController().nav = this.getController();
    this.app.addPage(master, true);

    // load the empty page
    var empty = sap.ui.xmlview("Empty", "dpa.view.Empty");
    this.app.addPage(empty, false);

    // wrap app with shell
    return new sap.m.Shell("Shell", {
      title : "{i18n>Title_Shell}",
      showLogout : false,
      app : this.app
    });
  }
});
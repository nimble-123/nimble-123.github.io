jQuery.sap.declare("dpa.util.Formatter");

jQuery.sap.require("sap.ui.core.format.DateFormat");

dpa.util.Formatter = {

  _statusStateMap : {
    "completed" : "Success",
    "active" : "Warning",
    "warning" : "Error"
  },

  statusState : function(value) {
    var map = dpa.util.Formatter._statusStateMap;
    return (value && map[value]) ? map[value] : "None";
  },

  numberState : function(stock, minStock) {
    return (parseInt(stock) <= parseInt(minStock)) ? "Error" : "None";
  },

  date : function(value) {
    if (value) {
      var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
        pattern : "yyyy-MM-dd"
      });
      return oDateFormat.format(new Date(value));
    } else {
      return value;
    }
  },

  quantity : function(value) {
    try {
      return (value) ? parseFloat(value).toFixed(0) : value;
    } catch (err) {
      return "Not-A-Number";
    }
  }
};
$(document).ready(function() {
  // Change settings header if we don't have info
  checkSettings();

  // Check if core id and token is in a cookie
  if($.cookie("api-token")) {
    $("#api-token").val($.cookie("api-token"));
  }
  if($.cookie("api-token")) {
    $("#core-id").val($.cookie("core-id"));
  }

  // Save core id and token values to a cookie whenever they're changed
  $( "#api-token" ).on("change", function() {
    $.cookie("api-token", $("#api-token").val());
    checkSettings();
  });
  $( "#core-id" ).on("change", function() {
    $.cookie("core-id", $("#core-id").val());
    checkSettings();
  });

  // Check the state of the settings
  function checkSettings() {
    if ($.cookie("api-token") === undefined || $.cookie("api-token") === '' ||
    $.cookie("core-id") === undefined || $.cookie("core-id") === '') {
      $("#settings-panel").removeClass("panel-default").addClass("panel-danger");
      return false;
    } else {
      $("#settings-panel").removeClass("panel-danger").addClass("panel-default");
      return true;
    }
  }
});
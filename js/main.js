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

  // Turn on/off the variable refresh if box is checked
  $("#refresh-1").on("change", function () {
    if($("#refresh-1").is(":checked")) {
      $("#get-var-1").attr("disabled", "disabled");
    } else {
      $("#get-var-1").removeAttr("disabled");
    }
  });
  $("#refresh-2").on("change", function () {
    if($("#refresh-2").is(":checked")) {
      $("#get-var-2").attr("disabled", "disabled");
    } else {
      $("#get-var-2").removeAttr("disabled");
    }
  });
  $("#refresh-3").on("change", function () {
    if($("#refresh-3").is(":checked")) {
      $("#get-var-3").attr("disabled", "disabled");
    } else {
      $("#get-var-3").removeAttr("disabled");
    }
  });
  $("#refresh-4").on("change", function () {
    if($("#refresh-4").is(":checked")) {
      $("#get-var-4").attr("disabled", "disabled");
    } else {
      $("#get-var-4").removeAttr("disabled");
    }
  });

  // On method success
  function onMethodSuccess() {
    console.log("success");
  }

  function onMethodFailure() {
    console.log("fail");
  }

  // The base level run method command
  function doMethod(method, data) {
    var url = "https://api.spark.io/v1/devices/" + $("#core-id").val() + "/" + method;
    $.ajax({
      type: "POST",
      url: url,
      data: { access_token: $("#api-token").val(), args: data },
      success: onMethodSuccess,
      dataType: "json"
    }).fail(function(obj) {
      onMethodFailure();
    });
  }

  // Post methods
  $("#post-1").on("click", function () {
    doMethod($("#method-1").val(), $("#data-1").val());
  });
  $("#post-2").on("click", function () {
    doMethod($("#method-2").val(), $("#data-2").val());
  });
  $("#post-3").on("click", function () {
    doMethod($("#method-3").val(), $("#data-3").val());
  });
  $("#post-4").on("click", function () {
    doMethod($("#method-4").val(), $("#data-4").val());
  });
});
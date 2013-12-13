$(document).ready(function() {
  var baseURL = "https://api.spark.io/v1/devices/";
  var timer1, timer2, timer3, timer4;

  // Change settings header if we don't have info
  checkSettings();

  // Check if core id and token is in local storage
  if (localStorage.getItem("api-token")) {
    $("#api-token").val(localStorage.getItem("api-token"));
  }
  if (localStorage.getItem("core-id")) {
    $("#core-id").val(localStorage.getItem("core-id"));
  }

  // Save core id and token values to local storage whenever they're changed
  $( "#api-token" ).on("change", function() {
    localStorage.setItem("api-token", $("#api-token").val());
    checkSettings();
  });
  $( "#core-id" ).on("change", function() {
    localStorage.setItem("core-id", $("#core-id").val());
    checkSettings();
  });

  // Check the state of the settings
  function checkSettings() {
    var apiToken = localStorage.getItem("api-token");
    var coreID = localStorage.getItem("core-id");
    if (apiToken === undefined || apiToken === '' || apiToken === null ||
      coreID === undefined || coreID === '' || coreID === null) {
      $("#settings-panel").removeClass("panel-default").addClass("panel-danger");
      return false;
    } else {
      $("#settings-panel").removeClass("panel-danger").addClass("panel-default");
      return true;
    }
  }

  ////
  // Alerts
  ////
  $("#info-alert").alert();
  $("#info-alert").affix();

  ////
  // Methods
  ////
  // On method success
  function onMethodSuccess() {
    alert = $("#info-alert");
    alert.text("Success!").removeClass("alert-danger").addClass("alert-success");
    alert.show();
    setTimeout(function() {
      alert.hide();
    }, 2000);
  }

  function onMethodFailure() {
    alert = $("#info-alert");
    alert.text("Ruh roh!").removeClass("alert-success").addClass("alert-danger");
    alert.show();
    setTimeout(function() {
      alert.hide();
    }, 2000);
  }

  // The base level run method command
  function doMethod(method, data) {
    var url = baseURL + $("#core-id").val() + "/" + method;
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

  ////
  // Variables
  ////
  // Generic get method
  function getVariable(variable, callback) {
    var url = baseURL + $("#core-id").val() + "/" + variable + "?access_token=" + $("#api-token").val();
    $.getJSON(url, callback)
      .fail(function(obj) {
        onMethodFailure();
      });
  }

  // Variable on clicks
  $("#get-var-1").on("click", function () {
    getVariable1();
  });
  $("#get-var-2").on("click", function () {
    getVariable2();
  });
  $("#get-var-3").on("click", function () {
    getVariable3();
  });
  $("#get-var-4").on("click", function () {
    getVariable4();
  });

  // Get variable methods
  function getVariable1() {
    getVariable($("#var-1").val(), function (res) {
      $("#var-val-1").val(res.result);
    });
  }
  function getVariable2() {
    getVariable($("#var-2").val(), function (res) {
      $("#var-val-2").val(res.result);
    });
  }
  function getVariable3() {
    getVariable($("#var-3").val(), function (res) {
      $("#var-val-3").val(res.result);
    });
  }
  function getVariable4() {
    getVariable($("#var-4").val(), function (res) {
      $("#var-val-4").val(res.result);
    });
  }

  // Auto-refresh
  // Turn on/off the variable refresh if box is checked
  $("#refresh-1").on("change", function () {
    if($("#refresh-1").is(":checked")) {
      var time = ($("#refresh-time-1").val() === '') ? 5000 : $("#refresh-time-1").val();
      $("#get-var-1").attr("disabled", "disabled");
      timer1 = setInterval(function () {
        getVariable1();
      }, time);
    } else {
      $("#get-var-1").removeAttr("disabled");
      if (timer1) {
        clearInterval(timer1);
      }
    }
  });
  $("#refresh-2").on("change", function () {
    if($("#refresh-2").is(":checked")) {
      var time = ($("#refresh-time-2").val() === '') ? 5000 : $("#refresh-time-2").val();
      $("#get-var-2").attr("disabled", "disabled");
      timer2 = setInterval(function () {
        getVariable2();
      }, time);
    } else {
      $("#get-var-2").removeAttr("disabled");
      if (timer2) {
        clearInterval(timer2);
      }
    }
  });
  $("#refresh-3").on("change", function () {
    if($("#refresh-3").is(":checked")) {
      var time = ($("#refresh-time-3").val() === '') ? 5000 : $("#refresh-time-3").val();
      $("#get-var-3").attr("disabled", "disabled");
      timer3 = setInterval(function () {
        getVariable3();
      }, time);
    } else {
      $("#get-var-3").removeAttr("disabled");
      if (timer3) {
        clearInterval(timer3);
      }
    }
  });
  $("#refresh-4").on("change", function () {
    if($("#refresh-4").is(":checked")) {
      var time = ($("#refresh-time-4").val() === '') ? 5000 : $("#refresh-time-4").val();
      $("#get-var-4").attr("disabled", "disabled");
      timer4 = setInterval(function () {
        getVariable4();
      }, time);
    } else {
      $("#get-var-4").removeAttr("disabled");
      if (timer4) {
        clearInterval(timer4);
      }
    }
  });

});
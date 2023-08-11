$(function () {
  // variables
  var mode = 0; // app mode
  var timeCounter = 0; // time counter
  var lapCounter = 0; // lap counter
  var action; // setInterval variable
  var lapNumber = 0; // number of laps

  // time and lap
  var timeMinutes,
    timeSeconds,
    timeCentiseconds,
    lapMinutes,
    lapSeconds,
    lapCentiseconds;

  // on app load
  hideshowButtons("#startButton", "#lapButton");

  //   click on start button
  $("#startButton").click(function () {
    // mode on
    mode = 1;

    // show stop and lap buttons
    hideshowButtons("#stopButton", "#lapButton");
    // start counter
    startAction();
  });

  // click on stop button
  $("#stopButton").click(function () {
    // show resume and reset buttons
    hideshowButtons("#resumeButton", "#resetButton");

    // stop counter
    clearInterval(action);
  });

  // click on resume button
  $("#resumeButton").click(function () {
    // show resume and reset buttons
    hideshowButtons("#stopButton", "#lapButton");

    // start counter
    startAction();
  });

  // click on reset button
  $("#resetButton").click(function () {
    // reload the page
    location.reload();
  });

  // click on lap button
  $("#lapButton").click(function () {
    // if mode is on
    if (mode) {
      clearInterval(action);
      lapCounter = 0;
      addLap();
      startAction();
    }
  });

  // functions
  function hideshowButtons(x, y) {
    $(".control").hide();
    $(x).show();
    $(y).show();
  }

  // start the counter
  function startAction() {
    action = setInterval(function () {
      timeCounter++;
      if (timeCounter == 100 * 60 * 100) timeCounter = 0;

      lapCounter++;
      if (lapCounter == 100 * 60 * 100) lapCounter = 0;

      updateTime();
    }, 10);
  }

  //   convert counters to min, sec, centisec
  function updateTime() {
    // min = 60*100 centisec = 6000 centisec
    timeMinutes = Math.floor(timeCounter / 6000);

    // 1 sec = 100 centisec
    timeSeconds = Math.floor((timeCounter % 6000) / 100);
    timeCentiseconds = (timeCounter % 6000) % 100;

    $("#timeminute").text(format(timeMinutes));
    $("#timesecond").text(format(timeSeconds));
    $("#timecentisecond").text(format(timeCentiseconds));

    // min = 60*100 centisec = 6000 centisec
    lapMinutes = Math.floor(lapCounter / 6000);

    // 1 sec = 100 centisec
    lapSeconds = Math.floor((lapCounter % 6000) / 100);
    lapCentiseconds = (lapCounter % 6000) % 100;

    $("#lapminute").text(format(lapMinutes));
    $("#lapsecond").text(format(lapSeconds));
    $("#lapcentisecond").text(format(lapCentiseconds));
  }

  // format numbers
  function format(number) {
    if (number < 10) return "0" + number;
    else return number;
  }

  // add lap - print lap details inside the lap box
  function addLap() {
    lapNumber++;
    var myLapDetails =
      '<div class="lap">' +
      '<div class="laptimetitle">' +
      "Lap" +
      lapNumber +
      "</div>" +
      '<div class="laptime>' +
      "<span>" +
      format(lapMinutes) +
      "</span>" +
      "<span>" +
      format(lapSeconds) +
      "</span>" +
      "<span>" +
      format(lapCentiseconds) +
      "</span>" +
      "</div>" +
      "</div>";
    $(myLapDetails).prependTo("#laps");
  }
});

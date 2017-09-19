$(document).ready(function(){

  var main = $("#main-texts"),
      mainId = $("#main-id"),
      quotes = $("#quotes p"),
      count = quotes.length,
      countdown = $("#countdown"),
      pause = $("#pause"),
      random = $("#random"),
      body = $("body"),
      cnt = 0,
      tencnt = 0,
      go = true;

  startTimer();

  // Random quote
  $(window).keypress(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
      e.preventDefault();
      random.click();
    }
  });

  // Press random buttom
  random.click(function(){
    stopTimer();
    tencnt = 0;
    everyTen();
  });

  // Pause slider
  pause.click(function(){
    var el = $(this);

    if (go) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  // Get quote by hash
  if(window.location.hash) {
    var id = window.location.hash.substr(1);

    if (id > count) {
      id = 0;
    }

    stopTimer();
    main.text(quotes.eq(id).text());
    mainId.text(id);
  }

  // Helper functions
  function everyTen(){
    var random = Math.floor(Math.random() * count) + 1;

    tencnt++;

    document.location.hash = random;

    $("#countdown").text(tencnt);
    main.text(quotes.eq(random).text());
    mainId.text(random);
  }

  function stopTimer(){
    go = false;
    pause.text("Start");
    body.addClass("js-active");
  }

  function startTimer(){
    go = true;
    pause.text("Stop");
    quoteTimer();
    body.removeClass("js-active");
  }

  // SetInterval loop
  function quoteTimer() {
    if(!go) {
      return;
    }

    cnt++;

    if(cnt >= 10) {
      cnt = 0;
      everyTen();
    }
    $("#countdown").text(cnt);
    setTimeout(quoteTimer, 1000);
  }

});

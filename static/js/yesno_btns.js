
/* About NO */

var basicTimeline = anime.timeline({
  autoplay: false
});

var pathEls = $(".check-n");
for (var i = 0; i < pathEls.length; i++) {
  var pathEl = pathEls[i];
  var offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute("stroke-dashoffset", offset);
}

basicTimeline
  .add({
    targets: ".text-n",
    duration: 1,
    opacity: "0"
  })
  .add({
    targets: ".btn-n",
    duration: 1300,
    height: 10,
    width: 300,
    backgroundColor: "#2B2D2F",
    border: "0",
    borderRadius: 100
  })
  .add({
    targets: ".progress-bar-n",
    duration: 2000,
    width: 300,
    easing: "linear"
  })
  .add({
    targets: ".btn-n",
    width: 0,
    duration: 1
  })
  .add({
    targets: ".progress-bar-n",
    width: 80,
    height: 80,
    delay: 500,
    duration: 750,
    borderRadius: 80,
    backgroundColor: "#71DFBE"
  })
  .add({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: 200,
    easing: "easeInOutSine"
  });

$(".btn-n").click(function() {
  basicTimeline.play();
});

$(".text-n").click(function() {
  basicTimeline.play();
});


/* About YES */

var basicTimeline = anime.timeline({
  autoplay: false
});

var pathEls = $(".check-y");
for (var i = 0; i < pathEls.length; i++) {
  var pathEl = pathEls[i];
  var offset = anime.setDashoffset(pathEl);
  pathEl.setAttribute("stroke-dashoffset", offset);
}

basicTimeline
  .add({
    targets: ".text-y",
    duration: 1,
    opacity: "0"
  })
  .add({
    targets: ".btn-y",
    duration: 1300,
    height: 10,
    width: 300,
    backgroundColor: "#2B2D2F",
    border: "0",
    borderRadius: 100
  })
  .add({
    targets: ".progress-bar-y",
    duration: 2000,
    width: 300,
    easing: "linear"
  })
  .add({
    targets: ".btn-y",
    width: 0,
    duration: 1
  })
  .add({
    targets: ".progress-bar-y",
    width: 80,
    height: 80,
    delay: 500,
    duration: 750,
    borderRadius: 80,
    backgroundColor: "#71DFBE"
  })
  .add({
    targets: pathEl,
    strokeDashoffset: [offset, 0],
    duration: 200,
    easing: "easeInOutSine"
  });

$(".btn-y").click(function() {
  basicTimeline.play();
});

$(".text-y").click(function() {
  basicTimeline.play();
});



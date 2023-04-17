$(function () {
  // $(".p-voice__card").on("click", function () {
  //   $(this).toggleClass("flipped");
  // });

  $(".p-voice__card").on("mouseenter", function () {
    $(this).toggleClass("flipped");
  });

  $(".p-voice__card").on("mouseleave", function () {
    $(this).toggleClass("flipped");
  });

  // $(".p-voice__card").on("touchstart", function () {
  //   $(this).toggleClass("flipped");
  // });
  // $(".p-voice__card").on("touchend", function () {
  //   $(this).toggleClass("flipped");
  // });
});

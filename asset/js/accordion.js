//アコーディオンをクリックした時の動作
$(".c-accordion__title").on("click", function () {
  //タイトル要素をクリックしたら
  $(".c-accordion__box").slideUp(500); //クラス名.boxがついたすべてのアコーディオンを閉じる

  var findElm = $(this).next(".c-accordion__box"); //タイトル直後のアコーディオンを行うエリアを取得

  if ($(this).hasClass("close")) {
    //タイトル要素にクラス名closeがあれば
    $(this).removeClass("close"); //クラス名を除去
  } else {
    //それ以外は
    $(".close").removeClass("close"); //クラス名closeを全て除去した後
    $(this).addClass("close"); //クリックしたタイトルにクラス名closeを付与し
    $(findElm).slideDown(500); //アコーディオンを開く
  }
});

//ページが読み込まれた際にopenクラスをつけ、openがついていたら開く動作※不必要なら下記全て削除
$(window).on("load", function () {
  $(".c-accordion__list:first-of-type section").addClass("open"); //accordion-areaのはじめのliにあるsectionにopenクラスを追加
  $(".open").each(function (index, element) {
    //openクラスを取得
    var Title = $(element).children(".c-accordion__title"); //openクラスの子要素のtitleクラスを取得
    $(Title).addClass("close"); ///タイトルにクラス名closeを付与し
    var Box = $(element).children(".c-accordion__box"); //openクラスの子要素boxクラスを取得
    $(Box).slideDown(500); //アコーディオンを開く
  });
});

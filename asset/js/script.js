/*===========================================================*/
/*機能編 5-1-25 クリックしたらナビ背景コンテンツがぼかされる※IE11非対応*/
/*===========================================================*/

// バーガーメニューの背景
// -----------------------------------
$('.openbtn').click(function () {
  //ボタンがクリックされたら
  $(this).toggleClass('active'); //ボタン自身に activeクラスを付与し
  $('#g-nav').toggleClass('panelactive'); //ナビゲーションにpanelactiveクラスを付与
  $('#header,#container,#footer').toggleClass('mainblur'); //ぼかしたいエリアにmainblurクラスを付与
});

$('#g-nav a').click(function () {
  //ナビゲーションのリンクがクリックされたら
  $('.openbtn').removeClass('active'); //ボタンの activeクラスを除去し
  $('#g-nav').removeClass('panelactive'); //ナビゲーションのpanelactiveクラスを除去し
  $('#header,#container,#footer').removeClass('mainblur'); //ぼかしているエリアのmainblurクラスを除去
});

/*===========================================================*/
/*機能編 8-1-4	ページ内にある指定の範囲内で下から出現*/
/*===========================================================*/
// ページトップリンク
//--------------------------------------

//スクロールした際の動きを関数でまとめる
function setFadeElement() {
  var windowH = $(window).height(); //ウィンドウの高さを取得
  var scroll = $(window).scrollTop(); //スクロール値を取得

  //出現範囲の指定
  var contentsTop = Math.round($('#contact').offset().top); //要素までの高さを取得
  var contentsH = $('#contact').outerHeight(true); //要素の高さを取得

  //2つ目の出現範囲の指定※任意
  var contentsTop2 = Math.round($('#footer').offset().top); //要素までの高さを取得
  var contentsH2 = $('#footer').outerHeight(true); //要素の高さを取得

  //出現範囲内に入ったかどうかをチェック
  if (
    scroll + windowH >= contentsTop &&
    scroll + windowH <= contentsTop + contentsH
  ) {
    $('#page-top').addClass('UpMove'); //入っていたらUpMoveをクラス追加
    $('#page-top').removeClass('DownMove'); //DownMoveを削除
    $('.hide-btn').removeClass('hide-btn'); //hide-btnを削除
  } //2つ目の出現範囲に入ったかどうかをチェック※任意
  else if (
    scroll + windowH >= contentsTop2 &&
    scroll + windowH <= contentsTop2 + contentsH2
  ) {
    $('#page-top').addClass('UpMove'); //入っていたらUpMoveをクラス追加
    $('#page-top').removeClass('DownMove'); //DownMoveを削除
  } //それ以外は
  else {
    if (!$('.hide-btn').length) {
      //サイト表示時にDownMoveクラスを一瞬付与させないためのクラス付け。hide-btnがなければ下記の動作を行う
      $('#page-top').addClass('DownMove'); //DownMoveをクラス追加
      $('#page-top').removeClass('UpMove'); //UpMoveを削除
    }
  }
}

// #page-topをクリックした際の設定
$('#page-top').click(function () {
  $('body,html').animate(
    {
      scrollTop: 0, //ページトップまでスクロール
    },
    500
  ); //ページトップスクロールの速さ。数字が大きいほど遅くなる
  return false; //リンク自体の無効化
});

//-----------------------------------
// スライダー
//-----------------------------------

$('.slider').slick({
  autoplay: true, //自動的に動き出すか。初期値はfalse。
  infinite: true, //スライドをループさせるかどうか。初期値はtrue。
  slidesToShow: 4, //スライドを画面に3枚見せる
  slidesToScroll: 4, //1回のスクロールで3枚の写真を移動して見せる
  prevArrow: '<div class="slick-prev"></div>', //矢印部分PreviewのHTMLを変更
  nextArrow: '<div class="slick-next"></div>', //矢印部分NextのHTMLを変更
  dots: true, //下部ドットナビゲーションの表示
  responsive: [
    {
      breakpoint: 1200, //モニターの横幅が1200px以下の見せ方
      settings: {
        slidesToShow: 3, //スライドを画面に2枚見せる
        slidesToScroll: 3, //1回のスクロールで2枚の写真を移動して見せる
      },
    },
    {
      breakpoint: 769, //モニターの横幅が769px以下の見せ方
      settings: {
        slidesToShow: 2, //スライドを画面に2枚見せる
        slidesToScroll: 2, //1回のスクロールで2枚の写真を移動して見せる
      },
    },
    {
      breakpoint: 426, //モニターの横幅が426px以下の見せ方
      settings: {
        slidesToShow: 1, //スライドを画面に1枚見せる
        slidesToScroll: 1, //1回のスクロールで1枚の写真を移動して見せる
      },
    },
  ],
});

/*===========================================================*/
/*印象編 4-12 順番に現れる（CSS x jQuery）*/
/*===========================================================*/
function delayScrollAnime() {
  var time = 0.1; //遅延時間を増やす秒数の値
  var value = time;
  $('.delayScroll').each(function () {
    var parent = this; //親要素を取得
    var elemPos = $(this).offset().top; //要素の位置まで来たら
    var scroll = $(window).scrollTop(); //スクロール値を取得
    var windowHeight = $(window).height(); //画面の高さを取得
    var childs = $(this).children(); //子要素を取得

    if (scroll >= elemPos - windowHeight && !$(parent).hasClass('play')) {
      //指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
      $(childs).each(function () {
        if (!$(this).hasClass('flipLeft')) {
          //アニメーションのクラス名が指定されているかどうかをチェック

          $(parent).addClass('play'); //親要素にクラス名playを追加
          $(this).css('animation-delay', value + 's'); //アニメーション遅延のCSS animation-delayを追加し
          $(this).addClass('flipLeft'); //アニメーションのクラス名を追加
          value = value + time; //delay時間を増加させる

          //全ての処理を終わったらplayを外す
          var index = $(childs).index(this);
          if (childs.length - 1 == index) {
            $(parent).removeClass('play');
          }
        }
      });
    } else {
      $(childs).removeClass('flipLeft'); //アニメーションのクラス名を削除
      value = time; //delay初期値の数値に戻す
    }
  });

  $('.delayScrollFadeUp').each(function () {
    var parent = this; //親要素を取得
    var elemPos = $(this).offset().top; //要素の位置まで来たら
    var scroll = $(window).scrollTop(); //スクロール値を取得
    var windowHeight = $(window).height(); //画面の高さを取得
    var childs = $(this).children(); //子要素を取得

    if (scroll >= elemPos - windowHeight && !$(parent).hasClass('play')) {
      //指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
      $(childs).each(function () {
        if (!$(this).hasClass('fadeUpTrigger')) {
          //アニメーションのクラス名が指定されているかどうかをチェック

          $(parent).addClass('play'); //親要素にクラス名playを追加
          $(this).css('animation-delay', value + 's'); //アニメーション遅延のCSS animation-delayを追加し
          $(this).addClass('fadeUpTrigger'); //アニメーションのクラス名を追加
          value = value + time; //delay時間を増加させる

          //全ての処理を終わったらplayを外す
          var index = $(childs).index(this);
          if (childs.length - 1 == index) {
            $(parent).removeClass('play');
          }
        }
      });
    } else {
      $(childs).removeClass('fadeUpTrigger'); //アニメーションのクラス名を削除
      value = time; //delay初期値の数値に戻す
    }
  });
}
/*===========================================================*/
/*印象編 4 最低限おぼえておきたい動き/
/*===========================================================*/

// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime() {
  // 4-1 ふわっ（その場で）
  $('.fadeInTrigger').each(function () {
    //fadeInTriggerというクラス名が
    var elemPos = $(this).offset().top - 50; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeIn'); // 画面内に入ったらfadeInというクラス名を追記
    } else {
      $(this).removeClass('fadeIn'); // 画面外に出たらfadeInというクラス名を外す
    }
  });
  // 下から
  $('.fadeUpTrigger').each(function () {
    //fadeInTriggerというクラス名が
    var elemPos = $(this).offset().top - 50; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeUp'); // 画面内に入ったらfadeInというクラス名を追記
    }
    // else {
    //   $(this).removeClass('fadeUp'); // 画面外に出たらfadeInというクラス名を外す
    // }
  });
  // 左から
  $('.fadeLeftTrigger').each(function () {
    //fadeInTriggerというクラス名が
    var elemPos = $(this).offset().top - 50; //要素より、50px上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('fadeLeft'); // 画面内に入ったらfadeInというクラス名を追記
    } else {
      $(this).removeClass('fadeLeft'); // 画面外に出たらfadeInというクラス名を外す
    }
  });

  // 4-4 ボンッ（拡大）
  $('.zoomInTrigger').each(function () {
    //zoomOutTriggerというクラス名が
    var elemPos = $(this).offset().top; //要素上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('zoomIn'); // 画面内に入ったらzoomOutというクラス名を追記
    } else {
      $(this).removeClass('zoomIn'); // 画面外に出たらzoomOutというクラス名を外す
    }
  });

  //ヒュッ
  $('.zoomOutTrigger').each(function () {
    //zoomOutTriggerというクラス名が
    var elemPos = $(this).offset().top; //要素上の
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass('zoomOut'); // 画面内に入ったらzoomOutというクラス名を追記
    } else {
      $(this).removeClass('zoomOut'); // 画面外に出たらzoomOutというクラス名を外す
    }
  });

  // パタっ --------------------------
  // flipLeft ※PCのみ実行
  if (window.innerWidth >= 768) {
    $('.flipTrigger').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll >= elemPos - windowHeight) {
        $(this).addClass('flipLeft');
      } else {
        $(this).removeClass('flipLeft');
      }
    });
}

}

/*===========================================================*/
/*印象編 8-2 テキストが流れるように出現（左から右）/
/*===========================================================*/

// h2などに使っている
//--------------------------------------

function slideAnime() {
  //====左右に動くアニメーションここから===
  $('.leftAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      //左から右へ表示するクラスを付与
      //テキスト要素を挟む親要素（左側）とテキスト要素を元位置でアニメーションをおこなう
      $(this).addClass('slideAnimeLeftRight'); //要素を左枠外にへ移動しCSSアニメーションで左から元の位置に移動
      $(this).children('.leftAnimeInner').addClass('slideAnimeRightLeft'); //子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
    } else {
      //左から右へ表示するクラスを取り除く
      $(this).removeClass('slideAnimeLeftRight');
      $(this).children('.leftAnimeInner').removeClass('slideAnimeRightLeft');
    }
  });

  $('.rightAnime').each(function () {
    var elemPos = $(this).offset().top - 50;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      //右から左へ表示するクラスを付与
      //テキスト要素を挟む親要素（右側）とテキスト要素を元位置でアニメーションをおこなう
      $(this).addClass('slideAnimeRightLeft'); //要素を右枠外にへ移動しCSSアニメーションで右から元の位置に移動
      $(this).children('.rightAnimeInner').addClass('slideAnimeLeftRight'); //子要素は親要素のアニメーションに影響されないように逆の指定をし元の位置をキープするアニメーションをおこなう
    } else {
      //右から左へ表示するクラスを取り除く
      $(this).removeClass('slideAnimeRightLeft');
      $(this).children('.rightAnimeInner').removeClass('slideAnimeLeftRight');
    }
  });
  //====左右に動くアニメーションここまで===
}

/*===========================================================*/
/*印象編 8-9 テキストがじわっと出現*/
/*===========================================================*/

// ba-ga-menuの中の文字
// blurTriggerにblurというクラス名を付ける定義

// function BlurTextAnimeControl() {
//   $('.blurTrigger').each(function () {
//     //blurTriggerというクラス名が
//     var elemPos = $(this).offset().top - 50; //要素より、50px上の
//     var scroll = $(window).scrollTop();
//     var windowHeight = $(window).height();
//     if (scroll >= elemPos - windowHeight) {
//       $(this).addClass('blur'); // 画面内に入ったらblurというクラス名を追記
//     } else {
//       $(this).removeClass('blur'); // 画面外に出たらblurというクラス名を外す
//     }
//   });
// }

/*===========================================================*/
/*印象編 6-7 スクロールするとヘッダー背景画像が拡大*/
/*===========================================================*/
$(window).scroll(function () {
  var scroll = $(window).scrollTop(); //スクロール値を定義
  //header-imgの背景
  $('#header-img').css({
    transform: 'scale(' + (100 + scroll / 10) / 100 + ')', //スクロール値を代入してscale1から拡大.scroll/10の値を小さくすると拡大値が大きくなる
    top: -(scroll / 50) + '%', //スクロール値を代入してtopの位置をマイナスにずらす
  });
});

/*===========================================================*/
/*関数をまとめる*/
/*===========================================================*/

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  setFadeElement(); //機能編  8-1-4ページ内にある指定の範囲内で下から出現の関数を呼ぶ
  fadeAnime(); // 印象編 4 最低限おぼえておきたい動きの関数を呼ぶ
  slideAnime(); // 印象編 8-2 テキストが流れるように出現（左から右）の関数を呼ぶ
  delayScrollAnime(); //順番にアニメーションする
  // GlowAnimeControl(); //印象編 8-17 テキストがほのかに光りながら出現の関数を呼ぶ
  // BlurTextAnimeControl(); //印象編 8-9 テキストがじわっと出現の関数を呼ぶ
}); // ここまで画面をスクロールをしたら動かしたい場合の記述

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  $('#splash-logo').delay(1200).fadeOut('slow'); //ロゴを1.2秒でフェードアウトする記述

  //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

  $('#splash')
    .delay(1500)
    .fadeOut('slow', function () {
      //ローディングエリア（splashエリア）を1.5秒でフェードアウトする記述
      $('body').addClass('appear'); //フェードアウト後bodyにappearクラス付与
    });
  //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

  /*===========================================================*/
  /*機能編 4-2-5背景色が伸びる（中央から外）*/
  /*===========================================================*/

  //=====ここから背景が伸びた後に動かしたいJSをまとめる
  $('.splashbg1').on('animationend', function () {
    setFadeElement(); //機能編 8-1-4ページ内にある指定の範囲内で下から出現の関数を呼ぶ
    fadeAnime(); // 印象編 4 最低限おぼえておきたい動きの関数を呼ぶ
    slideAnime(); //印象編 8-2 テキストが流れるように出現（左から右）の関数を呼ぶ
    delayScrollAnime(); //順番にアニメーションする
    // BlurTextAnimeControl(); //印象編 8-9 テキストがじわっと出現の関数を呼ぶ
  });
  //=====ここまで背景が伸びた後に動かしたいJSをまとめる
}); // ここまでページが読み込まれたらすぐに動かしたい場合の記述

// IntersectionObserver
document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 768) return; // モバイル除外

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".fade-in-trigger").forEach(el => {
    observer.observe(el);
  });
});

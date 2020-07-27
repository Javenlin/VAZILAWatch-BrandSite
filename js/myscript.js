

// 頁面加載 START
window.onload = function() {
  $(document).ready(function() {

    
    /**
     * 頁首導覽列動畫
     * ____________________________
     */
    $(window).on('scroll',function(){
      if($(window).scrollTop()){
          $('.main_nav').addClass('black');
          $('.logo').addClass('black');
          $('.header_logo').addClass('black');
      }else{
          $('.main_nav').removeClass('black');
          $('.logo').removeClass('black');
          $('.header_logo').removeClass('black');
      }
  }) 
    

    /**
     * mech#-#.html 商品細節放大
     * __________________________
     */ 
    var ow = 377;
    var oh = 550;
    var mw = 135;
    var mh = 181;
    var bw = 1000;
    var bh = 2000;

    //計算放大容器的大小。
    var bigcw = (bw / ow) * mw;
    var bigch = (bh / oh) * mh;
    $(".zbig").css({ width: bigcw, height: bigch });

    //绑定屬標移動事件
    $(".zsmall").bind("mousemove", function(evt) {
      var x = evt.clientX;
      var y = evt.clientY;
      var rect = this.getBoundingClientRect();
      var left = rect.left - document.documentElement.clientLeft;
      var top = rect.top - document.documentElement.clientTop;
      var offx = x - left;
      var offy = y - top; // $("#zconsole").html("offsetX:"+offx+" ---- offsetY:"+offy);

      //顯示div蒙版放大範圍
      var mask = $(this).find(".zmask");
      if (mask.length == 0) {
        mask = $("<div class='zmask'></div>");
        mask.appendTo($(this));
      } else {
        mask.css("display", "block");
      }
      var mx = offx - mw / 2;
      var my = offy - mh / 2;
      if (mx < 0) {
        mx = 0;
      }
      if (mx > ow - mw) {
        mx = ow - mw;
      }
      if (my < 0) {
        my = 0;
      }
      if (my > oh - mh) {
        my = oh - mh;
      }
      mask.css({ left: mx, top: my });

      //大圖的偏移位置
      var bx = -(bw / ow) * mx;
      var by = -(bh / oh) * my;
      $(".zbig img").css({ left: bx, top: by });
      if ($(".zbig").css("display") == "none") {
        $(".zbig").css("display", "block");
      }
    });

    //绑定屬標離開事件
    $(".zsmall").bind("mouseleave", function() {
      $(this)
        .find(".zmask")
        .css("display", "none");
      $(this)
        .find(".zbig")
        .css("display", "none");
      // $("#zconsole").html("屬標進入進行局部放大效果");
    });

    /**
     * mech#-#.html 細項說明抽屜事件
     * ________________________________
     */

    // Initial
    $("#item-spec dt:eq(0)").addClass("on");
    $("#item-spec dt:eq(0)").next("dd").stop(true,true).slideDown();

    $("#item-spec dt").on("click", function() {      
      // Reset all
      if ($("#item-spec dt").hasClass("on")) {
        $("#item-spec dt").next("dd").stop(true, true).slideUp();
        $("#item-spec dt").removeClass("on");
      }
      // Trigger
      if (!$(this).hasClass("on")) {
        $(this).next("dd").stop(true, true).slideDown();
        $(this).addClass("on");
      } else {
        $(this).next("dd").stop(true, true).slideUp();
        $(this).removeClass("on");
      }
    });

    /**
     * index.html 四顆表款按鈕滑入動畫
     * _______________________________
     */

    //digital_btn mechanic_btn quartz_btn ecodrive_btn
    var windowHeight = window.innerHeight;
    gridTop = windowHeight * 0.01; //視窗上方範圍
    gridBottom = windowHeight * 1.3; //視窗下方範圍
    $(window).on("scroll", function() {
      //.digital_btn h1 + p + img{opacity: 0;}

      $(".quartz_btn img").each(function() {
        var thisTop = jQuery(this).offset().top - $(window).scrollTop();
        if (thisTop + $(this).height() <= gridBottom) {
          $(this).addClass("demo_rightMove");

          $(".digital_btn img").each(function() {
            var thisTop = jQuery(this).offset().top - $(window).scrollTop();
            if (thisTop + $(this).height() <= gridBottom) {
              $(this).addClass("demo_rightMove");
            }

            $(".quartz_btn h1,.quartz_btn h1 + p").each(function() {
              var thisTop = jQuery(this).offset().top - $(window).scrollTop();
              if (thisTop + $(this).height() <= gridBottom) {
                $(this).addClass("demo_fadeOut");

                $(".digital_btn h1,.digital_btn h1 + p").each(function() {
                  var thisTop =
                    jQuery(this).offset().top - $(window).scrollTop();
                  if (thisTop + $(this).height() <= gridBottom) {
                    $(this).addClass("demo_fadeOut");
                  }
                });
              }
            });
          });
        }
      });

      $(".ecodrive_btn img").each(function() {
        var thisTop = jQuery(this).offset().top - $(window).scrollTop();
        if (thisTop + $(this).height() <= gridBottom) {
          $(this).addClass("demo_leftMove");

          $(".mechanic_btn img").each(function() {
            var thisTop = jQuery(this).offset().top - $(window).scrollTop();
            if (thisTop + $(this).height() <= gridBottom) {
              $(this).addClass("demo_leftMove");
            }

            $(".ecodrive_btn h1,.ecodrive_btn h1 + p").each(function() {
              var thisTop = jQuery(this).offset().top - $(window).scrollTop();
              if (thisTop + $(this).height() <= gridBottom) {
                $(this).addClass("demo_fadeOut");

                $(".mechanic_btn h1,.mechanic_btn h1 + p").each(function() {
                  var thisTop =
                    jQuery(this).offset().top - $(window).scrollTop();
                  if (thisTop + $(this).height() <= gridBottom) {
                    $(this).addClass("demo_fadeOut");
                  }
                });
              }
            });
          });
        }
      });
    });

    $(window).trigger("scroll");

    /**
     * index.html 滑動影圖複合式輪播欄
     * ______________________________
     */

    var slideWrapper = $(".main-slider"),
      iframes = slideWrapper.find(".embed-player"),
      lazyImages = slideWrapper.find(".slide-image"),
      lazyCounter = 0;

    // POST commands to YouTube or Vimeo API
    function postMessageToPlayer(player, command) {
      if (player == null || command == null) return;
      player.contentWindow.postMessage(JSON.stringify(command), "*");
    }

    // When the slide is changing
    function playPauseVideo(slick, control) {
      var currentSlide, slideType, startTime, player, video;

      currentSlide = slick.find(".slick-current");
      slideType = currentSlide.attr("class").split(" ")[1];
      player = currentSlide.find("iframe").get(0);
      startTime = currentSlide.data("video-start");

      if (slideType === "vimeo") {
        switch (control) {
          case "play":
            if (
              startTime != null &&
              startTime > 0 &&
              !currentSlide.hasClass("started")
            ) {
              currentSlide.addClass("started");
              postMessageToPlayer(player, {
                method: "setCurrentTime",
                value: startTime
              });
            }
            postMessageToPlayer(player, {
              method: "play",
              value: 1
            });
            break;
          case "pause":
            postMessageToPlayer(player, {
              method: "pause",
              value: 1
            });
            break;
        }
      } else if (slideType === "youtube") {
        switch (control) {
          case "play":
            postMessageToPlayer(player, {
              event: "command",
              func: "mute"
            });
            postMessageToPlayer(player, {
              event: "command",
              func: "playVideo"
            });
            break;
          case "pause":
            postMessageToPlayer(player, {
              event: "command",
              func: "pauseVideo"
            });
            break;
        }
      } else if (slideType === "video") {
        video = currentSlide.children("video").get(0);
        if (video != null) {
          if (control === "play") {
            video.play();
          } else {
            video.pause();
          }
        }
      }
    }

    // Resize player
    function resizePlayer(iframes, ratio) {
      if (!iframes[0]) return;
      var win = $(".main-slider"),
        width = win.width(),
        playerWidth,
        height = win.height(),
        playerHeight,
        ratio = ratio || 16 / 9;

      iframes.each(function() {
        var current = $(this);
        if (width / ratio < height) {
          playerWidth = Math.ceil(height * ratio);
          current
            .width(playerWidth)
            .height(height)
            .css({
              left: (width - playerWidth) / 2,
              top: 0
            });
        } else {
          playerHeight = Math.ceil(width / ratio);
          current
            .width(width)
            .height(playerHeight)
            .css({
              left: 0,
              top: (height - playerHeight) / 2
            });
        }
      });
    }

     

    // Resize event
    $(window).on("resize.slickVideoPlayer", function() {
      resizePlayer(iframes, 16 / 9);
    });

  });
};//WINDOW LOAD END 

// 頁面加載 END *************************************************************

// <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js"></script>
//   <script>
//       $(document).ready(function() {
//         $(window).scroll(function(event) {
//           var scrollPos = $(window).scrollTop();
//           var windowHeight = $(window).height();
//           var totalOfScroll = windowHeight+scrollPos-160;
//           var targetPos = $(".banner").offset().top;
//           var targetHeight = $(".banner").outerHeight();
//           var totalOfTarget = targetPos+targetHeight;

//           if(totalOfScroll > totalOfTarget){
//             TweenMax.to(".Mountain",1.2,{
//               transform:"translateX(0px)"
//             });

//             TweenMax.to(".Rode",1,{
//               opacity : '1',
//               transform:"translateY(0px)"
//             });

//             TweenMax.to(".Urban",1.2,{
//               transform:"translateX(0px)"
//             });
//           }
//         });
//       });
//   </script>-->

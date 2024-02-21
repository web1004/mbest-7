new fullpage('#fullpage', {
  autoScrolling: true,
  scrollHorizontally: false,
  navigation: true,
  normalScrollElements: '.vp-zip, .layer_zip',
  anchors: ['TOP', 'PROFILE', 'DESIGN', 'PUBILSHING', 'RESPONSIVE', 'PLAN'],
  afterLoad: function (old_elem, new_elem, direction) {


    /* 모달창 */
    $(".modal-notice").click(function(){
      $(".modal").fadeIn();
    });
  
    $(".btn-close").click(function(){
      $(".modal").fadeOut();
    });

    const Gnb = document.querySelector('nav');
    const body = document.querySelector('body');

    function GnbView() {
      if (new_elem.index == 0) {
        Gnb.style.display = 'none';
      } else {
        Gnb.style.display = 'block';
      }
      if (body.className == 'fp-viewing-DESIGN') {

      }
    };

    GnbView();

    const lis = $('.gnb li');
    if (new_elem.index == 2 || new_elem.index == 4 ) {
      lis.map(function (index, elem) {
        $(elem).css('color', 'white');
      });
    } else {
      lis.map(function (index, elem) {
        $(elem).css('color', '#1d72b1');
      });
    };


    /* sec2 탭해서 다음보기 */

    const nextBtn = document.querySelector('.move_btn .next');
    const preBtn = document.querySelector('.move_btn .pre');
    const gpTypeBtn = document.querySelector('.design_menu .graphic');
    const uiTypeBtn = document.querySelector('.design_menu .ui');
    const gpLayer = document.querySelector('.gp_layer_zone');
    const uiLayer = document.querySelector('.ui_layer_zone');
    const vpZone = document.querySelector('.vp-zip');
    const gpZone = document.querySelector('.vp-zip .vp-zip-gp');
    const uiZone = document.querySelector('.vp-zip .vp-zip-ui');
    let type = "graphic";
    let idx = 0;

    showImg(idx, type)

    document.addEventListener('click',(e)=>{

      if(e.target.parentNode.getAttribute('layerIdx')){
        idx = e.target.parentNode.getAttribute('layerIdx');
        showImg(idx, type);

      } else if (e.target.parentNode.parentNode.getAttribute('layerIdx')){
        idx = e.target.parentNode.parentNode.getAttribute('layerIdx');
        showImg(idx, type);
      }
    })

    gpTypeBtn.addEventListener('click', (e) => {

      type = gpTypeBtn.getAttribute('class');
      idx = 0;
  
      showImg(idx, type);
    })
    uiTypeBtn.addEventListener('click', (e) => {
      type = uiTypeBtn.getAttribute('class');
      idx = 0;
      showImg(idx, type);
    })

    preBtn.addEventListener('click', (e) => {

      idx--;

      if (type == 'graphic') {
        const img = document.querySelectorAll('.vp-zip .vp-zip-gp li');

        let imgNum = img.length;

        if (idx < 0) {
          idx = imgNum - 1;
        }
      } else if (type == 'ui') {
        const img = document.querySelectorAll('.vp-zip .vp-zip-ui li');
        let imgNum = img.length;
        if (idx < 0) {
          idx = imgNum - 1;
        }
      }

      showImg(idx, type);
    })
    nextBtn.addEventListener('click', (e) => {

      idx++;
      if (type == 'graphic') {
        const img = document.querySelectorAll('.vp-zip .vp-zip-gp li');
        let imgNum = img.length;

        if (idx > imgNum - 1) {
          idx = 0;
        }
      } else if (type == 'ui') {
        const img = document.querySelectorAll('.vp-zip .vp-zip-ui li');
        let imgNum = img.length;
        if (idx > imgNum - 1) {
          idx = 0;
        }
      }
      showImg(idx, type);
    })


    function showImg(idx, type) {

      if (type == 'graphic') {
        gpZone.setAttribute('style', 'display:block');
        gpLayer.setAttribute('style', 'display:flex');
        uiZone.setAttribute('style', 'display:none');
        uiLayer.setAttribute('style', 'display:none');

        const lay = gpLayer.querySelectorAll('.layer');
        for (var i = 0; i < lay.length; i++) {

          lay[i].setAttribute('layerIdx', i)
        }
        const img = document.querySelectorAll('.vp-zip .vp-zip-gp li');
        let imgNum = img.length;
        for (var i = 0; i < imgNum; i++) {

          img[i].setAttribute('style', 'display:none');
        }

        img[idx].setAttribute('style', 'display:block');
      } else if (type == 'ui') {
        uiZone.setAttribute('style', 'display:block');
        uiLayer.setAttribute('style', 'display:flex');
        gpZone.setAttribute('style', 'display:none');
        gpLayer.setAttribute('style', 'display:none');
        const lay = uiLayer.querySelectorAll('.layer');
        for (var i = 0; i < lay.length; i++) {
          lay[i].setAttribute('layerIdx', i)
        }
        const img = document.querySelectorAll('.vp-zip .vp-zip-ui li');
        let imgNum = img.length;
        for (var i = 0; i < imgNum; i++) {
          img[i].setAttribute('style', 'display:none');
        }
        img[idx].setAttribute('style', 'display:block');
      }

      vpZone.scrollTop = 0;
    };


    $(".con_right .design_menu .ui").click(function(){
      $(".graphic").removeClass("active");
      $(".ui").addClass("active");
    });

    $(".con_right .design_menu .graphic").click(function(){
      $(".graphic").addClass("active");
      $(".ui").removeClass("active");
    });



    /* section3 slide 효과 */
    let $simg = $(".slide ul");
    let $simgli = $(".slide ul li");
    let $sbtn = $(".slide_btn ul li");
    let $snext = $(".slide_side_btn .rbtn");
    let $spre = $(".slide_side_btn .lbtn");
    let simg_w = $simgli.width();
    let simg_n = $simgli.length;
    let soldidx = 0;
    let sindex = 0;

    
    function slideImg(sindex) {
      targetX = -(sindex * simg_w)
      $simg.stop().animate({ left: targetX }, 600);
      $sbtn.eq(soldidx).removeClass("active");
      $sbtn.eq(sindex).addClass("active");
      soldidx = sindex;
    };

    //좌우버튼
    $spre.click(function () {
      sindex--;
      if (sindex < 0) {
        sindex = simg_n - 1;
      }
      slideImg(sindex);
    });

    $snext.click(function () {
      sindex++;
      if (sindex > simg_n - 1) {
        sindex = 0;
      }
      slideImg(sindex);

    });


/* section3 slide 효과 */
let $simg2 = $(".slide2 ul");
let $simgli2 = $(".slide2 ul li");
let $sbtn2 = $(".slide2_btn ul li");
let $snext2 = $(".slide2_side_btn .rbtn");
let $spre2 = $(".slide2_side_btn .lbtn");
let simg_w2 = $simgli2.width();
let simg_n2 = $simgli2.length;
let soldidx2 = 0;
let sindex2 = 0;


function slideImg2(sindex2) {
  targetX2 = -(sindex2 * simg_w2)
  $simg2.stop().animate({ left: targetX2 }, 600);
  $sbtn2.eq(soldidx2).removeClass("active");
  $sbtn2.eq(sindex2).addClass("active");
  soldidx2 = sindex2;
};

//좌우버튼
$spre2.click(function () {
  sindex2--;
  if (sindex2 < 0) {
    sindex2 = simg_n2 - 1;
  }
  slideImg2(sindex2);
});

$snext2.click(function () {
  sindex2++;
  if (sindex2 > simg_n2 - 1) {
    sindex2 = 0;
  }
  slideImg2(sindex2);

});

}

});



/* 기획파트 슬라이드 */



  

/* 탭해서 보기 */
$(".folderBox .box1").click(function(){
  $(this).addClass('active');
  $(".board_title").text("01 스토리보드");
  $(".folderBox .folder:not(.folder.box1)").removeClass('active');
  $(".contentBoox .story-slidep").stop().fadeIn(200);
  $(".contentBoox .wire_frame").stop().fadeOut(200);
  $(".contentBoox .project").stop().fadeOut(200);
  $(".contentBoox .use").stop().fadeOut(200);
});
$(".folderBox .box2").click(function(){
  $(this).addClass('active');
  $(".board_title").text("02 와이어프레임");
  $(".folderBox .folder:not(.folder.box2)").removeClass('active');
  $(".contentBoox .story-slidep").stop().fadeOut(200);
  $(".contentBoox .wire_frame").stop().fadeIn(200);
  $(".contentBoox .project").stop().fadeOut(200);
  $(".contentBoox .use").stop().fadeOut(200);
});
$(".folderBox .box3").click(function(){
  $(this).addClass('active');
  $(".board_title").text("03 프로젝트완료보고서");
  $(".folderBox .folder:not(.folder.box3)").removeClass('active');
  $(".contentBoox .story-slidep").stop().fadeOut(200);
  $(".contentBoox .wire_frame").stop().fadeOut(200);
  $(".contentBoox .project").stop().fadeIn(200);
  $(".contentBoox .use").stop().fadeOut(200);
});
$(".folderBox .box4").click(function(){
  $(this).addClass('active');
  $(".board_title").text("04 웹 사용성보고서");
  $(".folderBox .folder:not(.folder.box4)").removeClass('active');
  $(".contentBoox .story-slidep").stop().fadeOut(200);
  $(".contentBoox .wire_frame").stop().fadeOut(200);
  $(".contentBoox .project").stop().fadeOut(200);
  $(".contentBoox .use").stop().fadeIn(200);
});


/* Swiper js */
const story_swiper = new Swiper(
  '.story-slidep',
{
  // Optional parameters
  slidesPerView: 1,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


const wire_frame = new Swiper(
  '.wire_frame',
{
  // Optional parameters
  slidesPerView: 1,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const project = new Swiper(
  '.project',
{
  // Optional parameters
  slidesPerView: 1,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const use = new Swiper(
  '.use',
{
  // Optional parameters
  slidesPerView: 1,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
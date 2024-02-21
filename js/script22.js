new fullpage('#fullpage', {
  autoScrolling: true,
  scrollHorizontally: false,
  navigation: true,
  // 여기다 클래스, 아이디 이름 적으면 해당 부분은 스크롤 할 수 있어요
  normalScrollElements: '.vp-zip, .layer_zip',
  anchors: ['TOP', 'PROFILE', 'DESIGN', 'PUBILSHING', 'MOBILE', 'RESPONSIVE', 'PLAN'],
  afterLoad: function (old_elem, new_elem, direction) {
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
    if (new_elem.index == 2 || new_elem.index == 4 || new_elem.index == 5) {
      lis.map(function (index, elem) {
        $(elem).css('color', 'white');
      });
    } else {
      lis.map(function (index, elem) {
        $(elem).css('color', '#1d72b1');
      });
    };


    /* sec2 탭해서 다음보기 */

    // 준혁이 코드
    // 각종 요소 변수로 저장한 내용들이예요 마지막 타입, 인덱스의 경우를 제외하고 모두 마크업에 있는 친구들입니당
    // 인덱스와 타입은 사진의 순서, 그리고 말 그대로 그래픽인지 ui인지를 구분하기 위한 타입 구분을 위해 따로 만들어준 변수예요
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

    // 함수가 작동할 때 2가지 변수(인덱스, 타입)를 필요로 합니다
    showImg(idx, type)

    // 레이어를 클릭했을 때 그에 맞는 이미지를 불러오기 위해서 만든 이벤트 부분이예요
    // 다른 이벤트랑 다르게 'document'로 시작하는 이유는 레이어는 너무 많은데, 이벤트를 지정하는 '.addEventListener()'는 단일 지정 변수에만 붙일 수 있어서 그래요
    // 이런식으로 이벤트를 만들 수도 있다는 정도만 알아두면 좋아요
    document.addEventListener('click',(e)=>{
      // 'document'를 붙여서 만들었기 때문에 if문을 이용해서 누구를 클릭했을 때 이벤트를 적용할 건지 알려줘야해요
      // 'showImg()'함수에서 넣어둔 'layerIdx'라는 내용이 있는 부분을 클릭했을 때만 이벤트가 작동되게 만든거예요
      // e.target = 이벤트가 발생한 타겟(클릭 이벤트를 사용했으니, 내가 클릭한 부분!)
      // .parentNode = .앞에 붙은 요소의 부모요소!
      // 특정요소에 이벤트를 붙였을 때랑은 다르게 이렇게 이벤트를 만들면 마크업 특성상 자식 요소들이 위로 올라오고 먼저 클릭되기 때문에 부모 요소의 특징을 찝어서 이벤트를 걸어준거예요
      if(e.target.parentNode.getAttribute('layerIdx')){
        idx = e.target.parentNode.getAttribute('layerIdx');
        showImg(idx, type);
        // 텍스트 박스는 또 그 안에 있는 친구들이 맨 위로 올라와서 클릭되겠죠? 그래서 부모의 부모까지 불러준거예요
      } else if (e.target.parentNode.parentNode.getAttribute('layerIdx')){
        idx = e.target.parentNode.parentNode.getAttribute('layerIdx');
        showImg(idx, type);
      }
    })

    // 타입 변환 이벤트 부분이예요
    gpTypeBtn.addEventListener('click', (e) => {
      // 타입이라고 부르는 변수의 값을 하얀이가 지정한 클래스의 이름으로 바꿔주는 내용입니다
      // 여기서 사용한 '.getAttribute()'는 괄호안에 들어있는 내용이 마크업에 포함되어 있으면 해당 내용의 값을 불러올 수 있는 함수예요
      // class, id, placeholder 등등 기본 마크업 문자인 div,span등을 제외하고 마크업 꺽쇠에 들어있는 내용이면 뭐든 사용할 수 있습니당
      type = gpTypeBtn.getAttribute('class');
      // 인덱스를 0으로 지정해주는 이유는 그래픽 디자인을 3번까지 봤을 때에 인덱스가 이미 3인데, 그 상태로 ui타입으로 바꾸면 ui디자인 중 3번 디자인이 보여지기 때문이예요
      // 앞으로 변수를 지정해서 순서를 조정함과 동시에 타입을 바꾸면 보여지는 내용도 바뀌는 복합적인 내용을 코딩할 땐 꼭 순서를 초기화 해주세요
      idx = 0;
      // 타입과 인덱스가 바뀌었으니 함수를 다시 호출해서 보여지는 내용을 다르게 해줬어요
      showImg(idx, type);
    })
    uiTypeBtn.addEventListener('click', (e) => {
      type = uiTypeBtn.getAttribute('class');
      idx = 0;
      showImg(idx, type);
    })

    // 뷰페이지 순서 조정 부분이예요
    preBtn.addEventListener('click', (e) => {
      // 인덱스의 값을 줄여서 순서를 조정합니다!
      idx--;
      // 하얀이가 만든 디자인에는 타입이 존재하니까 타입별로 이미지의 개수가 다르겠죠?
      // 이미지의 개수가 다르면 인덱스가 늘어날 수 있는 최댓값도 바뀌게 되니 미리 if문을 사용해 제어해주었어요
      if (type == 'graphic') {
        const img = document.querySelectorAll('.vp-zip .vp-zip-gp li');
        // '.length'는 점 앞에 붙은 변수의 총 개수! ex)동영이 동일이 동이 동삼이...
        let imgNum = img.length;
        // 이 부분이 인덱스 조절 부분! pre버튼은 뒤로가는 버튼이니까 인덱스 값이 줄어들겠죠?
        // 그러다 0아래로 줄어들면 -1, -2가 될테니까 미리 if문으로 제어해줬어요 위에 말한 '.length'를 이용한 변수로 이미지의 총 개수보다 1적은 숫자로 변환했어요
        // 1이 적은 이유는 순서는 0부터 시작하는 데 개수는 1부터 시작하니까 그런거예요
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
      // 여기서도 역시 인덱스의 값이 바뀌었으니 함수를 다시 호출해줘야 해요!
      showImg(idx, type);
    })
    nextBtn.addEventListener('click', (e) => {
      // next 에서는 반대로 인덱스 값을 올려서 순서 조정해요
      idx++;
      if (type == 'graphic') {
        const img = document.querySelectorAll('.vp-zip .vp-zip-gp li');
        let imgNum = img.length;
        // 이 부분도 역시 인덱스가 늘어나다가 사진 개수보다 높은 수로 넘어가버리면 안되겠죠?
        // 그래서 최댓값을 넘어가게 되면 0번! 즉 첫번째 사진이 보여지도록 조정한 내용이예요
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
      // 우선 타입 구분을 먼저 합니다!
      if (type == 'graphic') {
        // 그래픽 타입이면 ui내용들은 안보여야하니까 ui이미지와 레이어는 안보이게, 그래픽 내용들은 보이게 설정해줬어요
        // 여기서 사용한 '.setAttribute()'는 위에서 봤던 '.getAttribute()'와 비슷한 듯 달라요!
        // get이 이미 있는 내용의 값을 불러온다면, set은 없는 내용을 추가하거나 있는 내용의 값을 바꿔주는 용도로 사용해요
        gpZone.setAttribute('style', 'display:block');
        gpLayer.setAttribute('style', 'display:flex');
        uiZone.setAttribute('style', 'display:none');
        uiLayer.setAttribute('style', 'display:none');
        // 레이어 부분을 클릭했을 때 해당하는 이미지를 보여줘야 하니까 각각의 레이어에 'layerIdx'라는 이름으로 순서를 넣어줄 거예요
        // 그러기 위해서 우선 타입에 맞는 레이어 숫자를 체크하기 위한 변수와 for문을 사용해줬어요
        const lay = gpLayer.querySelectorAll('.layer');
        for (var i = 0; i < lay.length; i++) {
          // i는 0부터 레이어의 총 개수만큼 커지니까, 0번째 레이어에는 0번 순서를 줘야겠죠? 그걸 위해서 '.setAttribute()'로 이름과 i를 같이 넣어서 각각의 숫자를 값으로 줬어요!
          lay[i].setAttribute('layerIdx', i)
        }
        const img = document.querySelectorAll('.vp-zip .vp-zip-gp li');
        let imgNum = img.length;
        for (var i = 0; i < imgNum; i++) {
          // 순서에 안맞는 이미지들이 보이면 안되니까 일단은 모든 이미지를 안보이게 한거예요 위에 있는 '.length'를 이용해서 이미지의 총합 만큼 반복하는 for문을 만들고,
          // i가 커지면서 반복하는 거니까 img[i] = i번째 이미지! 라는 점을 이용해 모든 이미지를 안보이게 해줍니다
          img[i].setAttribute('style', 'display:none');
        }
        // 그 뒤에 순서에 맞는 이미지만 보이게 만들면 완성! 위와 똑같이 img[idx] = idx번째 이미지! 그런데 idx는? 미리 변수로 만들어둔 이번에 보일 이미지 순서! 그러니까 idx번째 이미지는 순서에 맞는 이미지!
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
      // 이미지 바뀌었을 때 다시 위부터 보여지게 하는 부분입니다
      vpZone.scrollTop = 0;
    };

    // 기존 코드
    // let $lbtn = $(".move_btn .pre");
    // let $rbtn = $(".move_btn .next");
    // let $gpShow = $(".design_menu .graphic");
    // let $uiShow = $(".design_menu .ui");
    // let oldidx = 0; 
    // let idx = 0; 
    // let $img = $(".vp-zip .vp-zip-gp li");
    // let img_n = $img.length;


    // function changeImg(idx){ 

    //   if(oldidx != idx){
    //     $img.eq(oldidx).stop().fadeOut("100");
    //     $img.eq(idx).stop().fadeIn("100");
    //   }
    //   oldidx = idx;

    // };

    // $lbtn.click(function(){

    //   idx--;
    //   if(idx < 0){ 
    //     idx=img_n-1;
    //   }
    //   changeImg(idx);

    // });

    // $rbtn.click(function(){

    //   idx++;
    //   if(idx > img_n-1){ 
    //     idx=0;
    //   }
    //   changeImg(idx); 

    // });

    // $gpShow.click(function(){
    //   $(".vp-zip .vp-zip-gp").show();
    //   $(".vp-zip .vp-zip-ui").hide();
    // }); 
    // $uiShow.click(function(){
    //   $(".vp-zip .vp-zip-gp").hide();
    //   $(".vp-zip .vp-zip-ui").show();
    // }); 




    /* slide 효과 */
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
























  }
});






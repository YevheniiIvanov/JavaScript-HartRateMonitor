$(document).ready(function(){
  $('.carusel__inner').slick({
    speed: 1200,
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 1500,   
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev_Arrow.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/next_Arrow.png"></button>',
    dots: true,
    responsive: [
      {    
        breakpoint: 575,
        settings: {
          arrows: false
        }
      }
    ]
  });

function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    });
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

  //modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
    })
  });

  function validateForms(form){
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Введите {0} символа!")
              },
            phone: "Пожалуйста, введите свой номер телефона",
            email: {
              required: "Пожалуйста, введите свою почту",
              email: "Неправильно введен адрес почты"
            }
        }
    });
  };

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
  });

  // scroll pageUp

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
  });

  new WOW().init();

});

const tabs = document.querySelectorAll('.catalog__tab'),
      catContent = document.querySelector('.catalog__content'),
      catItem = document.querySelectorAll('.catalog-item');

tabs.forEach((item)=>{
  item.addEventListener('click', ()=>{
    if(item.classList.contains('catalog__tab_active')){
      item.classList.remove('catalog__tab_active');
      catContent.classList.remove('catalog__content_active');
    }else{
      tabs.forEach(item => item.classList.remove('catalog__tab_active'));
      item.classList.add('catalog__tab_active');
      catContent.classList.add('catalog__content_active');
    }
    if(item == tabs[0]){
      catItem.forEach((item)=>{
        if(!item.classList.contains('catalog-item__active')){
          item.classList.add('catalog-item__active');
        }
      });
    }
    if(item == tabs[1]){
      catItem.forEach((item, i)=>{
        if(i>2){
          item.classList.remove('catalog-item__active');
        }else{
          item.classList.add('catalog-item__active')
        }
      });
    }
    if(item == tabs[2]){
      catItem.forEach((item, i)=>{
        if(i>1){
          item.classList.remove('catalog-item__active');
        }
      });
      catContent.style.justifyContent = 'space-around';
    }
  });
});

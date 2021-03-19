"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  jQuery(document).ready(function ($) {
    var _$$slick;

    var scrollPos = 0;
    $(window).scroll(function () {
      if ($(window).scrollTop() >= 350) {
        $('.fix').addClass('active');
      } else {
        $('.fix').removeClass('active');
      }

      var st = $(this).scrollTop();

      if (st > scrollPos) {
        $('.fix.active').css('top', '-100px');
      } else {
        $('.fix.active').css('top', '0');
      }

      scrollPos = st;
    }); // Переключаем на выбор роста и цвета

    jQuery(document).on('click', ".hide-addcart .price .btn-orange", function (e) {
      e.preventDefault();
      $(this).parents('.model').find('.hide-addcart1').hide();
      $(this).parents('.model').find('.show-cart').show();
    }); // Копка назад

    jQuery(document).on('click', ".show-cart .back", function (e) {
      e.preventDefault();
      $(this).parents('.model').find('.show-cart, .adds').hide();
      $(this).parents('.model').find('.hide-addcart1').show();
    }); // Выбор роста

    jQuery(document).on('click', ".rost .item", function (e) {
      e.preventDefault();
      $('.rost .item').removeClass('active');
      $(this).addClass('active');
      $('.rost .item').removeClass('error');
    }); // Выбор цвета

    jQuery(document).on('click', ".cart-color .item", function (e) {
      e.preventDefault();
      $('.cart-color .item').removeClass('active');
      $(this).addClass('active');
      $(this).parents('.show-cart').find('.btn-orange').attr('data-img', $(this).find('img').attr('src'));
      $('.cart-color .item').removeClass('error');
    }); // Продолжить выбор

    jQuery(document).on('click', ".btn-orange.prodolj", function (e) {
      e.preventDefault();
      $('.show-cart, .adds').hide();
      $('.hide-addcart1').show();
      var destination = +$(this).parents('.model').offset().top - 80;
      $('body,html').animate({
        scrollTop: destination
      }, 1100);
    }); // Удаление из корзины

    jQuery(document).on('click', ".cart-products .del", function (e) {
      e.preventDefault();

      if ($(this).parents('.tovar:last-child').index() === 0) {
        $('.cart').hide();
        $('.cart.empty').show();
        $('.cart-fix').hide();
        $('.cart-fix').addClass('nocart');
      }

      $('.shap .add[data-id="' + $(this).parents('.tovar').attr('data-id') + '"]').parents('.item').find('.add').show();
      $('.shap .add[data-id="' + $(this).parents('.tovar').attr('data-id') + '"]').parents('.item').find('.selected, .del').hide();
      $(this).parents('.tovar').remove();
      sessionStorage.removeItem('cart');
      tovar();
      itog();
    });
    jQuery(document).on('click', ".shap .podar .item .button button.del", function (e) {
      e.preventDefault();
      $('.tovar[data-id="' + $(this).siblings('.add').attr('data-id') + '"]').remove();
      $(this).siblings('.add').show();
      $(this).hide();

      if (!$('.tovar').length) {
        $('.cart').hide();
        $('.cart-fix').hide();
        $('.cart-fix').addClass('nocart');
        $('.shapbtn').slideUp(300);
      }

      sessionStorage.removeItem('cart');
      tovar();
      itog();
    }); // Добавлем в корзину

    jQuery(document).on('click', ".show-cart .price .btn-orange", function (e) {
      e.preventDefault();
      var btn = $(this);

      if ($(this).parents('.right').find('.rost').find('.item').hasClass('active')) {
        if ($(this).parents('.right').find('.cart-color').find('.item').hasClass('active')) {
          $('.empty').hide();
          $(this).parents('.model').find('.show-cart, .hide-addcart1').hide();
          $(this).parents('.model').find('.adds').show();
          $(this).parents('.model').find('.hide-addcart1').hide();
          var title = btn.attr('data-title'); // Заголовок

          var img = btn.attr('data-img'); // Изображение

          var id = btn.attr('data-id'); // ID

          var price = btn.attr('data-price'); // Цена
          // Записываем рост

          var rost_sel = '';
          $(this).parents('.right').find('.rost .item').each(function (index) {
            if ($(this).hasClass('active')) {
              rost_sel = rost_sel + '<option selected>' + $(this).text() + '</option>';
            } else {
              rost_sel = rost_sel + '<option>' + $(this).text() + '</option>';
            }
          }); // Записываем цвет

          var color_sel = '<span data-color="' + $(this).parents('.right').find('.cart-color').find('.item.active').attr('data-color') + '" style="background: #' + $(this).parents('.right').find('.cart-color').find('.item.active').attr('data-color') + '"></span>';
          var colors = '';
          var color_name = $(this).parents('.right').find('.cart-color').find('.item.active').attr('data-colorname');
          $(this).parents('.right').find('.cart-color .item').each(function (index) {
            colors = colors + "<li style='background: #" + $(this).attr("data-color") + "'></li>";
          });
          var item = '<div class="tovar " data-tovar="tovarcmb" data-id="' + id + '"><div class="item">' + '<div class="img"><img src="' + img + '" alt=""></div>' + '<div class="title">' + title + ' (' + color_name + ')</div></div><div class="item">' + '<div class="size"><select>' + rost_sel + '</select></div></div><div class="item">' + '<div class="price">' + price + ' ₽</div>' + '</div><button class="del"></button></div>';
          $('.cart-products .items-products').append(item);
          $('.cart.cart-products').show();
          tovar();
          var destination = +$(this).parents('.right').offset().top - 40;
          $('body,html').animate({
            scrollTop: destination
          }, 1100);
        } else {
          $('.cart-color .item').addClass('error');
        }
      } else {
        $('.rost .item').addClass('error');
      }
    });
    jQuery(document).on('click', ".shap .add", function (e) {
      e.preventDefault();
      var btn = $(this);
      $('.empty').hide();
      $(this).parents('.item').find('.selected, .add').hide();
      $(this).parents('.item').find('.del').show();
      var title = btn.attr('data-title'); // Заголовок

      var img = btn.attr('data-img'); // Изображение

      var id = btn.attr('data-id'); // ID

      var price = btn.attr('data-price'); // Цена

      var item = '<div class="tovar tovar-shap" data-tovar="tovarshap" data-id="' + id + '"><div class="item">' + '<div class="img"><img src="' + img + '" alt=""></div>' + '<div class="title">' + title + '</div></div><div class="item">' + '<div class="size"></div></div><div class="item">' + '<div class="price">' + price + ' ₽</div>' + '</div><button class="del"></button></div>';
      $('.cart-products .items-products').append(item);
      $('.cart.cart-products').show();
      $('.shapbtn').slideDown(300);
      tovar();
    }); // Изменение роста в корзине

    jQuery(document).on('change', ".items-products .size select", function (e) {
      tovar();
    });
    jQuery(document).on('change', "[name='card'], [name='sdek']", function (e) {
      itog();
    }); // Запоминаем товары

    var products = new Object();

    function tovar() {
      var products = new Object();
      sessionStorage.removeItem('cart');
      var id, name, img, color_sel, colors, size_sel, sizes, price, data_color, tovar_shap;
      $(".cart-products .tovar").each(function (index) {
        id = $(this).attr('data-id');
        name = $(this).find('.title').text();
        img = $(this).find('.img img').attr('src');
        color_sel = $(this).find('.color .title').html();
        colors = $(this).find('.color ul').html();
        size_sel = $(this).find('select option:selected').text();
        sizes = $(this).find('select').html();
        price = $(this).find('.price').text();
        data_color = $(this).find('.color .title span').attr('data-color');
        tovar_shap = $(this).attr('data-tovar');
        products[index] = {
          idtovar: id,
          name: name,
          img: img,
          color_sel: color_sel,
          colors: colors,
          size_sel: size_sel,
          sizes: sizes,
          price: price,
          data_color: data_color,
          tovar_shap: tovar_shap
        };
      });

      if (Object.keys(products).length !== 0) {
        sessionStorage.setItem('cart', JSON.stringify(products));
      }

      console.log(tovar_shap);
      itog();
    } // Получаем из хранилища


    if (sessionStorage.getItem('cart')) {
      var products = JSON.parse(sessionStorage.getItem('cart'));
      $('.cart.empty').hide();
      $('.cart.cart-products').show();

      for (var key in products) {
        if (products.hasOwnProperty(key)) {
          var title = products[key]['name']; // Заголовок

          var img = products[key]['img']; // Изображение

          var id = products[key]['idtovar']; // ID

          var price = products[key]['price']; // Цена

          var tovar_shap = products[key]['tovar_shap']; // Цена

          console.log(tovar_shap);
          var classes = '';

          if (products[key]['tovar_shap'] === 'tovarshap') {
            classes = 'tovar-shap';
          } else {
            classes = '';
          }

          if (products[key]['sizes']) {
            var rost_sel = '<select>' + products[key]['sizes'] + '</select>'; // Цена
          } else {
            var rost_sel = ''; // Цена
          }

          var size_sel = products[key]['size_sel']; // Цена

          var item = '<div class="tovar ' + classes + '" data-tovar="' + tovar_shap + '" data-id="' + id + '"><div class="item">' + '<div class="img"><img src="' + img + '" alt=""></div>' + '<div class="title">' + title + '</div></div><div class="item">' + '<div class="size">' + rost_sel + '</div></div><div class="item">' + '<div class="price">' + price + '</div>' + '</div><button class="del"></button></div>';
          $('.cart-products .items-products').append(item);
        }
      }

      itog();
      $(".tovar-shap").each(function (index) {
        $('[data-id="' + $(this).attr('data-id') + '"]').parents('.item').find('.add').hide();
        $('[data-id="' + $(this).attr('data-id') + '"]').parents('.item').find('.del').show();
      });
    } // Итог


    function itog(coup) {
      $('.cart-products .itog .skid, .mob-oform .skid-mob').remove();
      var price = 0;
      var skid = 0;
      $(".cart-products .tovar").each(function (index) {
        var preg = $(this).find(".price").text();
        price += +preg.replace(/[^+\d]/g, '');
      });

      if (coup) {
        skid = price / 100 * coup;
        price = price - skid;
      }

      var skid1 = 0;

      if ($("[name='sdek']:checked").attr('data-price')) {
        price = price + 300;
      }

      if ($("[name='card']:checked").attr('data-price')) {
        skid1 = price / 100 * +$("[name='card']:checked").attr('data-price');
        price = price + skid1;
      }

      var countshap = 0;
      var countcmb = 0;
      var shapskid = 0;
      $(".tovar").each(function (index) {
        if ($(this).hasClass('tovar-shap')) {
          if (countshap != 2) {
            countshap += 1;
          }
        } else {
          countcmb += 1;
        }

        $('.cart-fix').addClass('nocart');

        if (index >= 0) {
          $('.cart-fix').show();
          $('.cart-fix').removeClass('nocart');
          $('.cart-fix small').text(index + 1);
        }
      });

      if (countcmb >= 2) {
        if (countshap > 0) {
          shapskid = countshap * 530;
          price = price - shapskid;
          var textsnud = '';

          if (countshap === 2) {
            textsnud = '2 снуда';
          } else if (countshap === 1) {
            textsnud = '1 снуд';
          }

          $('.cart-products .itog').prepend('<div class="skid"><span>Скидки <small>' + textsnud + ' в подарок:</small></span><div class="price">-' + shapskid + ' ₽</div></div>');
          $('.mob-oform').prepend('<div class="skid-mob"><div class="title-skid-mob">Шапка+снуд в подарок (x' + countshap + '):</div><span>-' + shapskid + ' ₽</span></div>');
        }
      }

      $('[name="oplata"]').val($("[name='card']:checked").parents('.radio').find('.title').text());
      $('[name="dostav"]').val($("[name='sdek']:checked").parents('.radio').find('.title').text());
      $('.cart-products .itog .total small, .cart-senk .itog small, .cart-dost .itog small, .cart-opl .itog, .mob-itog small').text(price + ' ₽');
      $('.cart-opl .btn-orange small').text('Оплатить ' + price + ' ₽');
    } // Купоны


    function coupon(name) {
      var coupon_1 = 'QQWKHSDF10';
      var coupon_2 = 'QQWKHSDF20';
      var coupon_3 = 'QQWKHSDF30';
      var coupon_4 = 'QQWKHSDF40';

      if (coupon_1 === name) {
        itog(10);
        return 10;
      } else if (coupon_2 === name) {
        itog(20);
        return 20;
      } else if (coupon_3 === name) {
        itog(30);
        return 30;
      } else if (coupon_4 === name) {
        itog(40);
        return 40;
      }
    }

    $(".promo").submit(function (e) {
      e.preventDefault();

      if (coupon($(this).find('input').val())) {
        sessionStorage.setItem('coupon', coupon($(this).find('input').val()));
        $(this).find('input').hide();
        $(this).find('.btn-orange').hide();
        $(this).append('<div class="promoadds">Ваша скидка ' + coupon($(this).find('input').val()) + '%' + '<button class="delpromo">Удалить</button></div>');
      } else {
        alert('Купон не верный');
      }
    });
    jQuery(document).on('click', ".delpromo", function (e) {
      e.preventDefault();
      $('.promo').find('input').show();
      $('.promo').find('.btn-orange').show();
      $('.promo').find('.promoadds').remove();
      sessionStorage.removeItem('coupon');
      itog();
    });

    if (sessionStorage.getItem('coupon')) {
      $('.promo').find('input').hide();
      $('.promo').find('.btn-orange').hide();
      $('.promo').append('<div class="promoadds">Ваша скидка ' + sessionStorage.getItem('coupon') + '%' + '<button class="delpromo">Удалить промокод</button></div>');
      itog(+sessionStorage.getItem('coupon'));
    }

    var block_show = null;

    function scrollTracking() {
      var wt = $(window).scrollTop();
      var wh = $(window).height();
      var et = $('.cart-products').offset().top;
      var eh = $('.cart-products').outerHeight();

      if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {
        if (block_show == null || block_show == false) {
          $('.mob-oform').addClass('active');
          $('.cart-fix').fadeOut(300);
        }

        block_show = true;
      } else {
        if (block_show == null || block_show == true) {
          $('.mob-oform').removeClass('active');
          $('.cart-fix').fadeIn(300);
        }

        block_show = false;
      }
    }

    $(window).scroll(function () {
      scrollTracking();
    });
    jQuery(document).on('click', "[href='#oform']", function (e) {
      e.preventDefault();
      $('body').addClass('oh1');
      $('.cart').hide();
      $('.cart-dost').show();
      $('.cart-products').removeClass('active');
      $('.cart-products .sidebar').fadeOut(300);
    });
    jQuery(document).on('click', "[href='#oform1']", function (e) {
      e.preventDefault();
      $('body').addClass('oh1');
      $('.cart-products').addClass('active');
      $('.cart-products .sidebar').fadeIn(300);
    });
    jQuery(document).on('click', ".bac", function (e) {
      e.preventDefault();
      $('.cart').hide();
      $('.cart-products').show();
      $('body').removeClass('oh1');
      $('.cart-products').removeClass('active');
      $('.cart-products .sidebar').fadeOut(300);
    });
    jQuery(document).on('click', ".bac1", function (e) {
      e.preventDefault();
      $('.cart').hide();
      $('.cart-products').show();
      $('body').addClass('oh1');
      $('.cart-products').addClass('active');
      $('.cart-products .sidebar').show();
    });
    jQuery(document).on('click', ".cart-senk .btn-orange", function (e) {
      e.preventDefault();
      $('.cart').hide();
      $('.cart.empty').show();
      var elementClick = $(this).attr("href");
      elementClick = elementClick.substr(1);
      var destination = $(elementClick).offset().top;
      $('body,html').animate({
        scrollTop: destination
      }, 1100);
    });
    $(".cart-dost").submit(function (e) {
      e.preventDefault();

      if ($('.card-popup:checked').length) {
        $('.cart').hide();
        $('.cart-opl').show();
      } else {
        var form_data = $(this).serialize();
        var textitems = '';
        var products = JSON.parse(sessionStorage.getItem('cart'));

        for (var _key in products) {
          if (products.hasOwnProperty(_key)) {
            var title = products[_key]['name']; // Заголовок

            var img = products[_key]['img']; // Изображение

            var id = products[_key]['idtovar']; // ID

            var price = products[_key]['price']; // Цена

            var color_sel = products[_key]['color_sel']; // Цена

            var colors = products[_key]['colors']; // Цена

            var size_sel = products[_key]['size_sel']; // Цена

            var data_color = products[_key]['data_color']; // Цена

            var color_name = products[_key]['color_name']; // Цена

            var item = '<div class="tovar" data-id="' + id + '"><div class="item">' + '<div class="title">' + title + '</div></div><div class="item">' + '<div class="size">Размер:' + size_sel + '</div></div><div class="item">' + '<div class="color">Цена: ' + price + '</div></div><hr><br>';
            textitems += item;
          }
        }

        form_data += "&itog=" + $('.cart-senk .itog small').text() + "&textmail=" + textitems;

        if (sessionStorage.getItem('coupon')) {
          form_data += "&coupon=Купон на " + sessionStorage.getItem('coupon') + '%';
        }

        $.ajax({
          type: "POST",
          url: "send.php",
          data: form_data,
          success: function success(data) {
            $(".cart-senk").show();
            $(".cart-dost").hide();
            $('.cart').hide();
            $('.cart.cart-senk').show();
            sessionStorage.removeItem('cart');
            sessionStorage.removeItem('coupon');
            $('body').removeClass('oh1');
            $('.tovar').remove();
            $('.cart-fix').hide();
            $('.cart-fix').addClass('nocart');
            $('.shap .podar .item .button button.del').hide();
            $('.shap .podar .item .button button.add').show();
            var destination = +$('.cart-senk').offset().top - 80;
            $('body,html').animate({
              scrollTop: destination
            }, 1100);
            $('.shapbtn').slideUp(300);
          }
        });
      }
    });
    jQuery(document).on('click', ".mob-menu", function () {
      jQuery(".mob-header").fadeToggle(500);
      $('body').toggleClass('oh');
    });
    jQuery(document).on('click', ".close-mob-1", function () {
      jQuery(".mob-header").fadeToggle(500);
      $('body').removeClass('oh');
    });
    jQuery(document).on('click', ".models .model .right ul", function () {
      $(this).find('li').show();
      $(this).addClass('ctn');
    });
    jQuery(document).on('click', ".shap .flex .item", function () {
      jQuery(".shap .flex  .item").removeClass('active');
      $(this).addClass('active');
    });
    jQuery(document).on('click', ".plus", function () {
      var count = +$(this).siblings('span').text();
      count = count + 1;
      $(this).siblings('span').text(count);
    });
    jQuery(document).on('click', ".minus", function () {
      var count = +$(this).siblings('span').text();

      if (count !== 1) {
        count = count - 1;
        $(this).siblings('span').text(count);
      }
    });
    jQuery(document).on('click', ".mob-header .toplevel a", function () {
      $(this).siblings('ul').slideToggle(300);
    });
    jQuery(document).on('click', ".spoler:not(.active) .title", function () {
      $('.spoler .text').slideUp(300);
      $('.spoler').removeClass('active');
      jQuery(this).siblings('.text').slideDown(300);
      jQuery(this).parents('.spoler').addClass("active");
    });
    jQuery(document).on('click', ".spoler.active .title", function () {
      jQuery(this).siblings('.text').slideUp(300);
      jQuery(this).parents('.spoler').removeClass("active");
    });
    jQuery(document).on('click', ".color .title", function () {
      $(this).siblings('ul').slideToggle(300);
    });
    jQuery(document).on('click', ".color li", function () {
      $(this).parents('ul').slideToggle(300);
      $(this).parents('.color').find('.title span').removeAttr('style');
      $(this).parents('.color').find('.title span').attr('style', $(this).attr('style'));
      tovar();
    });

    if ($(window).width() <= 991) {} // $("footer form").submit(function (e) {
    //     e.preventDefault();
    //     var form_data = $(form).serialize();
    //     $.ajax({
    //         type: "POST",
    //         url: "send.php",
    //         data: form_data,
    //         success: function () {
    //             $(".modal").modal('hide');
    //             $("#senk").modal('show');
    //         }
    //     });
    //     return false
    // });


    $('.slider_photo').slick({
      infinite: false,
      arrows: true,
      focusOnSelect: true,
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: '<button type="button" class="slick-prev"><svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<path d="M0.411057 15.0033C0.411057 15.5721 0.617882 16.0893 1.03158 16.503L14.4769 29.4312C14.8906 29.7932 15.4077 30 15.9249 30C16.4937 30 17.0109 29.7931 17.4246 29.3794C18.2002 28.552 18.2003 27.2592 17.3729 26.4318L5.47893 15.0033L17.3729 3.5748C18.2003 2.7991 18.2002 1.45458 17.4246 0.62718C16.6489 -0.200224 15.3043 -0.200227 14.4769 0.575464L1.03158 13.5036C0.617882 13.9173 0.411057 14.4345 0.411057 15.0033Z" fill="white"/>\n' + '</svg>\n</button>',
      nextArrow: '<button type="button" class="slick-next"><svg width="18" height="30" viewBox="0 0 18 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<path d="M17.5889 15.0033C17.5889 15.5721 17.3821 16.0893 16.9684 16.503L3.52311 29.4312C3.10941 29.7932 2.59226 30 2.07513 30C1.50629 30 0.98915 29.7931 0.575448 29.3794C-0.200243 28.552 -0.200256 27.2592 0.627148 26.4318L12.5211 15.0033L0.627148 3.5748C-0.200256 2.7991 -0.200243 1.45458 0.575448 0.62718C1.35114 -0.200224 2.69571 -0.200227 3.52311 0.575464L16.9684 13.5036C17.3821 13.9173 17.5889 14.4345 17.5889 15.0033Z" fill="white"/>\n' + '</svg>\n</button>',
      responsive: [{
        breakpoint: 1024,
        settings: {
          infinite: false,
          arrows: true,
          focusOnSelect: true,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 600,
        settings: {
          infinite: false,
          arrows: true,
          focusOnSelect: true,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 480,
        settings: {
          infinite: false,
          arrows: true,
          focusOnSelect: true,
          dots: false,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      }]
    });
    $('.sld-left').slick({
      infinite: true,
      arrows: true,
      focusOnSelect: true,
      dots: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<button type="button" class="slick-prev"><span><svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<g>\n' + '<path d="M17.1797 4.35836L9.53805 12L17.1797 19.6416L14.8214 22L4.82141 12L14.8214 2L17.1797 4.35836Z" fill="white"/>\n' + '</g>\n' + '</svg>\n</span></button>',
      nextArrow: '<button type="button" class="slick-next"><span><svg width="21" height="29" viewBox="0 0 21 29" fill="none" xmlns="http://www.w3.org/2000/svg">\n' + '<g >\n' + '<path d="M4.58984 4.66071L12.1921 12.263L4.58984 19.8652L6.93597 22.2114L16.8844 12.263L6.93597 2.3145L4.58984 4.66071Z" fill="white"/>\n' + '</g>\n' + '</svg>\n</span></button>',
      responsive: [{
        breakpoint: 767,
        settings: {
          infinite: true,
          arrows: true,
          adaptiveHeight: true,
          focusOnSelect: true,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });
    $('.sld-rev').slick((_$$slick = {
      infinite: true,
      arrows: false,
      focusOnSelect: true,
      dots: true,
      adaptiveHeight: true,
      slidesToShow: 1
    }, _defineProperty(_$$slick, "adaptiveHeight", true), _defineProperty(_$$slick, "slidesToScroll", 1), _$$slick));
    /*$(window).on("load",function(){
        $(".content").mCustomScrollbar();
    });*/

    $("[name='phone']").mask("+7 (999) 999-99-99");
    $('a[href^="#"].yak').click(function () {
      $('body').removeClass('oh');
      $('.mob-header').fadeOut();
      var elementClick = $(this).attr("href");
      elementClick = elementClick.substr(1);
      var destination = $(elementClick).offset().top - 60;
      $('body,html').animate({
        scrollTop: destination
      }, 1100);
      return false;
    });
    /*$("#myModalBox").modal('show');*/
  });
});
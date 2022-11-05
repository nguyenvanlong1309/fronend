(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


    /* Image Slider - Swiper */
    var imageSlider = new Swiper('.image-slider', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
		},
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
		breakpoints: {
            // when window is <= 580px
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });


    /* Text Slider - Swiper */
	var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
    });


    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: function(url) {        
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/', 
                    id: function(url) {        
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Details Lightbox - Magnific Popup */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
    
    
    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });


    // // /* Sign Up Form */
    // $("#signUpForm").validator().on("submit", function(event) {
    // 	if (event.isDefaultPrevented()) {
    //         // handle the invalid form...
    //         sformError();
    //         ssubmitMSG(false, "Vui lòng điền thông tin đầy đủ !!!");
    //     } else {
    //         // everything looks good!
    //         event.preventDefault();
    //         ssubmitForm();
    //     }
    // });

    // function ssubmitForm() {
    //     // initiate variables with form content
	// 	var email = $("#semail").val();
	// 	var name = $("#sname").val();
	// 	var password = $("#spassword").val();
    //     var terms = $("#sterms").val();
        
    //     $.ajax({
    //         type: "POST",
    //         url: "php/signupform-process.php",
    //         data: "email=" + email + "&name=" + name + "&password=" + password + "&terms=" + terms, 
    //         success: function(text) {
    //             if (text == "success") {
    //                 sformSuccess();
    //             } else {
    //                 sformError();
    //                 ssubmitMSG(false, text);
    //             }
    //         }
    //     });
	// }

    // function sformSuccess() {
    //     $("#signUpForm")[0].reset();
    //     ssubmitMSG(true, "Sign Up Submitted!");
    //     $("input").removeClass('notEmpty'); // resets the field label after submission
    // }

    // function sformError() {
    //     $("#signUpForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //         $(this).removeClass();
    //     });
	// }

    // function ssubmitMSG(valid, msg) {
    //     if (valid) {
    //         var msgClasses = "h3 text-center tada animated";
    //     } else {
    //         var msgClasses = "h3 text-center";
    //     }
    //     $("#smsgSubmit").removeClass().addClass(msgClasses).text(msg);
    // }


    // /* Log In Form */
    // $("#logInForm").validator().on("submit", function(event) {
    // 	if (event.isDefaultPrevented()) {
    //         // handle the invalid form...
    //         lformError();
    //         lsubmitMSG(false, "Vui lòng điền thông tin đầy đủ !!!");
    //     } else {
    //         // everything looks good!
    //         event.preventDefault();
    //         lsubmitForm();
    //     }
    // });

    // function lsubmitForm() {
    //     // initiate variables with form content
	// 	var email = $("#lemail").val();
	// 	var password = $("#lpassword").val();
        
    //     $.ajax({
    //         type: "POST",
    //         url: "php/loginform-process.php",
    //         data: "email=" + email + "&password=" + password, 
    //         success: function(text) {
    //             if (text == "success") {
    //                 lformSuccess();
    //             } else {
    //                 lformError();
    //                 lsubmitMSG(false, text);
    //             }
    //         }
    //     });
	// }

    // function lformSuccess() {
    //     $("#logInForm")[0].reset();
    //     lsubmitMSG(true, "Log In Submitted!");
    //     $("input").removeClass('notEmpty'); // resets the field label after submission
    // }

    // function lformError() {
    //     $("#logInForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //         $(this).removeClass();
    //     });
	// }

    // function lsubmitMSG(valid, msg) {
    //     if (valid) {
    //         var msgClasses = "h3 text-center tada animated";
    //     } else {
    //         var msgClasses = "h3 text-center";
    //     }
    //     $("#lmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    // }


    // /* Newsletter Form */
    // $("#newsletterForm").validator().on("submit", function(event) {
    // 	if (event.isDefaultPrevented()) {
    //         // handle the invalid form...
    //         nformError();
    //         nsubmitMSG(false, "Vui lòng điền thông tin đầy đủ !!!");
    //     } else {
    //         // everything looks good!
    //         event.preventDefault();
    //         nsubmitForm();
    //     }
    // });

    // function nsubmitForm() {
    //     // initiate variables with form content
	// 	var email = $("#nemail").val();
    //     var terms = $("#nterms").val();
    //     $.ajax({
    //         type: "POST",
    //         url: "php/newsletterform-process.php",
    //         data: "email=" + email + "&terms=" + terms, 
    //         success: function(text) {
    //             if (text == "success") {
    //                 nformSuccess();
    //             } else {
    //                 nformError();
    //                 nsubmitMSG(false, text);
    //             }
    //         }
    //     });
	// }

    // function nformSuccess() {
    //     $("#newsletterForm")[0].reset();
    //     nsubmitMSG(true, "Subscribed!");
    //     $("input").removeClass('notEmpty'); // resets the field label after submission
    // }

    // function nformError() {
    //     $("#newsletterForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //         $(this).removeClass();
    //     });
	// }

    // function nsubmitMSG(valid, msg) {
    //     if (valid) {
    //         var msgClasses = "h3 text-center tada animated";
    //     } else {
    //         var msgClasses = "h3 text-center";
    //     }
    //     $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    // }
    

    // /* Privacy Form */
    // $("#privacyForm").validator().on("submit", function(event) {
    // 	if (event.isDefaultPrevented()) {
    //         // handle the invalid form...
    //         pformError();
    //         psubmitMSG(false, "Vui lòng điền thông tin đầy đủ !!!");
    //     } else {
    //         // everything looks good!
    //         event.preventDefault();
    //         psubmitForm();
    //     }
    // });

    // function psubmitForm() {
    //     // initiate variables with form content
	// 	var name = $("#pname").val();
	// 	var email = $("#pemail").val();
    //     var select = $("#pselect").val();
    //     var terms = $("#pterms").val();
        
    //     $.ajax({
    //         type: "POST",
    //         url: "php/privacyform-process.php",
    //         data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms, 
    //         success: function(text) {
    //             if (text == "success") {
    //                 pformSuccess();
    //             } else {
    //                 pformError();
    //                 psubmitMSG(false, text);
    //             }
    //         }
    //     });
	// }

    // function pformSuccess() {
    //     $("#privacyForm")[0].reset();
    //     psubmitMSG(true, "Request Submitted!");
    //     $("input").removeClass('notEmpty'); // resets the field label after submission
    // }

    // function pformError() {
    //     $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
    //         $(this).removeClass();
    //     });
	// }

    // function psubmitMSG(valid, msg) {
    //     if (valid) {
    //         var msgClasses = "h3 text-center tada animated";
    //     } else {
    //         var msgClasses = "h3 text-center";
    //     }
    //     $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    // }
    

    // /* Back To Top Button */
    // // create the back to top button
    // $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    // var amountScrolled = 700;
    // $(window).scroll(function() {
    //     if ($(window).scrollTop() > amountScrolled) {
    //         $('a.back-to-top').fadeIn('500');
    //     } else {
    //         $('a.back-to-top').fadeOut('500');
    //     }
    // });


	// /* Removes Long Focus On Buttons */
	// $(".button, a, button").mouseup(function() {
	// 	$(this).blur();
	// });

})(jQuery);


// Đối tượng `Validator`
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;

        // Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        
        // Lặp qua từng rule & kiểm tra
        // Nếu có lỗi thì dừng việc kiểm
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }
        
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            // Lặp qua từng rules và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {
                        
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        }

        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(function (rule) {

            // Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function (inputElement) {
               // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function () {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                } 
            });
        });
    }

}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isUserName = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined :  message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :  message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác';
        }
    }
}


// Show password
const passField = document.querySelector("password");
const showBtn = document.querySelector("show-eye eye");
showBtn.onclick = () => {
  if (passField.type === "password") {
    passField.type = "text";
    showBtn.classList.add("hide-btn");
  } else {
    passField.type = "password";
    showBtn.classList.remove("hide-btn");
  }
};


// Filter


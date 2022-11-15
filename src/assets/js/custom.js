


/*=============================================================
    Authour URI: www.binarycart.com
    License: Commons Attribution 3.0

    http://creativecommons.org/licenses/by/3.0/

    100% To use For Personal And Commercial Use.
    IN EXCHANGE JUST GIVE US CREDITS AND TELL YOUR FRIENDS ABOUT US

    ========================================================  */


(function ($) {
    "use strict";
    var mainApp = {

        main_fun: function () {
            /*====================================
            METIS MENU
            ======================================*/
            $('#main-menu').metisMenu();

            /*====================================
              LOAD APPROPRIATE MENU BAR
           ======================================*/
            $(window).bind("load resize", function () {
                if ($(this).width() < 768) {
                    $('div.sidebar-collapse').addClass('collapse')
                } else {
                    $('div.sidebar-collapse').removeClass('collapse')
                }
            });

            /*====================================
            MORRIS BAR CHART
         ======================================*/
            Morris.Bar({
                element: 'morris-bar-chart',
                data: [{
                    y: 'Jan',
                    a: 85,
                    b: 90
                }, {
                    y: 'Feb',
                    a: 115,
                    b: 90
                }, {
                    y: 'Mar',
                    a: 119,
                    b: 90
                }, {
                    y: 'Apr',
                    a: 122,
                    b: 90
                },{
                    y: 'May',
                    a: 110,
                    b: 90
                },{
                    y: 'Jun',
                    a: 115,
                    b: 90
                },{
                    y: 'Jul',
                    a: 82,
                    b: 90
                },{
                    y: 'Aug',
                    a: 77,
                    b: 90
                },{
                    y: 'Sep',
                    a: 80,
                    b: 90
                }, {
                    y: 'Oct',
                    a: 105,
                    b: 90
                }, {
                    y: 'Nov',
                    a: 130,
                    b: 90
                }, {
                    y: 'Dec',
                    a: 180,
                    b: 90
                }],
                xkey: 'y',
                ykeys: ['a', 'b'],
                labels: ['Dự kiến', 'Thực tế'],
                hideHover: 'auto',
                resize: true
            });

            /*====================================
          MORRIS DONUT CHART
       ======================================*/
            Morris.Donut({
                element: 'morris-donut-chart',
                data: [{
                    label: "Sách vở, quần áo",
                    value: 17.5
                }, {
                    label: "Tiền xây dựng",
                    value: 27.5
                },{
                    label: "Các loại khác",
                    value: 35
                }, {
                    label: "Các thiết bị học",
                    value: 20
                }],
                resize: true
            });

        },

        initialization: function () {
            mainApp.main_fun();

        }

    }
    // Initializing ///

    $(document).ready(function () {
        mainApp.main_fun();
    });
}(jQuery));



//Filter


var pageApp = {
    'init': function(){
        this.globalPollifil();
        this.determineIE();
    },
    'globalPollifil': function(){
        if (!('classList' in document.documentElement) && Object.defineProperty && typeof HTMLElement !== 'undefined') {
            Object.defineProperty(HTMLElement.prototype, 'classList', {
                get: function() {
                    var self = this;

                    function update(fn) {
                        return function(value) {
                            var classes = self.className.split(/\s+/);
                            var index = classes.indexOf(value);

                            fn(classes, index, value);
                            self.className = classes.join(' ');
                        };
                    }

                    var ret = {
                        add: update(function(classes, index, value) {
                            ~index || classes.push(value);
                        }),

                        remove: update(function(classes, index) {
                            ~index && classes.splice(index, 1);
                        }),

                        toggle: update(function(classes, index, value) {
                            ~index ? classes.splice(index, 1) : classes.push(value);
                        }),

                        contains: function(value) {
                            return !!~self.className.split(/\s+/).indexOf(value);
                        },

                        item: function(i) {
                            return self.className.split(/\s+/)[i] || null;
                        }
                    };

                    Object.defineProperty(ret, 'length', {
                        get: function() {
                            return self.className.split(/\s+/).length;
                        }
                    });

                    return ret;
                }
            });
        }

        (function() {
            var lastTime = 0;
            var vendors = ['ms', 'moz', 'webkit', 'o'];
            for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                    || window[vendors[x]+'CancelRequestAnimationFrame'];
            }

            if (!window.requestAnimationFrame)
                window.requestAnimationFrame = function(callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                        timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };
        }());
    },
    'determineIE': function(){

        // function getInternetExplorerVersion(){
        //     var rv = -1;
        //     if (navigator.appName == 'Microsoft Internet Explorer')
        //     {
        //         var ua = navigator.userAgent;
        //         var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        //         if (re.exec(ua) != null)
        //             rv = parseFloat( RegExp.$1 );
        //     }
        //     else if (navigator.appName == 'Netscape')
        //     {
        //         var ua = navigator.userAgent;
        //         var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        //         if (re.exec(ua) != null)
        //             rv = parseFloat( RegExp.$1 );
        //     }
        //     return rv;
        // }
        //
        // if(getInternetExplorerVersion()!==-1){
        //     $('html').addClass('ie-js ie-stile');
        // }
        // $('html').addClass('ie-js ie-stile');



    }

};

var moduleApp = {
    'init': function () {
        this.validation();
        this.calculation();
    },
    'validation': function(){
        var $step1 = $('.js-first-step'),
            $step2 = $('.js-second-step'),
            $terms = $('.task-wrapper .term'),
            $value1 = $terms.eq(0),
            $value2 = $terms.eq(1);

        $step1.on('change', function(){
            var $this = $(this);
            if($this.val() == $value1.val()){
                $value1.removeClass('error');
                $('.second-step-container').addClass('active');
                $this.attr('readonly','');
            }
            else{
                $value1.addClass('error');
            }
        });


        $step2.on('change', function(){
            var $this = $(this),
                $answer = $('.js-answer');

            if($this.val() == $value2.val()){
                $value2.removeClass('error');
                $answer.removeAttr('readonly').addClass('edit');
                $answer.attr('type', 'number').val('');
                $this.attr('readonly','');
            }
            else{
                $value2.addClass('error');
            }
        });
    },
    'calculation': function () {
        var $terms = $('.task-wrapper .term'),
            $value1 = parseInt($terms.eq(0).val()),
            $value2 = parseInt($terms.eq(1).val());

        $('.js-answer').on('change', function(){
            var $this = $(this);

            console.log($value1 + $value2);

            if(parseInt($this.val()) == $value1 + $value2){
                $this.removeClass('edit error').attr('readonly','');
            }
            else{
                $this.addClass('error')
            }
        });
    }
};


$(document).ready(function(){
    // init globals
    pageApp.init();
    moduleApp.init();

});

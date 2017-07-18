
window.zSlider = Object.create({
    var: {
        slider: jQuery('#slider'),
        onTranslateBoolVar: 0,
        browserMouseWheelSting: '',
        hasScrolled: 0,
        arr1: [0,0,0,0],
        arr2: [0,0,100,0],
        onYouTubeIframeAPIReadyFired: false,
        onYouTubeIframeAPI_checkOnLoad: true,        
        isMobile: (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
    },
    tl: new TimelineMax({
        delay: 0,
        repeat: 0,
        repeatDelay: 0,
        onUpdate: false,
        onRepeat: false,
        onComplete: false
    }),
    init: function() {
        var t = this;

        t.resize();
        jQuery(document.documentElement).keyup(function (event) {
            if (event.keyCode == 37) {
                t.owl.trigger('prev.owl.carousel');
            } 
            else if (event.keyCode == 39) {
                t.owl.trigger('next.owl.carousel');
            }
        });
    },
    resize: function() {
        var t = this;
        // var id = '#' + t.id;

        // if(t.var.hasScrolled == 0){
            // jQuery(id).css('height', window.innerHeight);
            // jQuery(id + ' > .slides.owl-carousel .owl-stage-outer .owl-stage .owl-item .slide').css('height', window.innerHeight);
            t.redrawRect();
        // }
    },
    redrawRect: function() {
        var t = this,
            id = '#' + t.id;

        jQuery(id + ' .owl-item:not(.animated) .slide').css('clip', 'rect(0px ' + window.innerWidth + 'px ' + window.innerHeight + 'px ' + '0px)');
        jQuery(id + ' .owl-item:not(.animated) .slide').css('top','0%');
        jQuery(id + ' .owl-item:not(.animated) .slide .bg').css('top','0%');
    },
    clipPath: function() {
        var t = this,
            el = '#' + window.zSlider.id + ' .owl-item.owl-animated-out > .slide';

        TweenMax.set(el, { 'clip':'rect(0px '+window.innerWidth+'px 0px 0px)' });    
    },
    onTranslateBool: function() {
        window.zSlider.var.onTranslateBoolVar = 0;
        window.zSlider.redrawRect();
    },
    pauseAllVideos: function(bool){
        var t = this,
            id = '#' + t.id;

        if(jQuery(id + ' .owl-item div.bg.video .video_iframe').length != 0) {
            jQuery('.video_iframe').each(function(){
                var name = jQuery(this).attr('name');
            	jQuery(frames[name].document.body).find("video").get(0).pause();
            });
        }
    },
    restartOwl: function(bool){
        var t = this,
            id = '#' + t.id;

        if(bool){
            t.owl.trigger('to.owl.carousel', [0, 0]);
            t.owl.trigger('refresh.owl.carousel');
            t.owl.trigger('stop.owl.autoplay');
            t.owl.data('owl.carousel').settings.autoplayTimeout = jQuery(id + ' .owl-item.active .slide').attr('data-timeout');
            t.owl.trigger('play.owl.autoplay');
            var timeout = jQuery(id + ' .owl-item.active .slide').attr('data-timeout')/1000;
            TweenMax.killTweensOf('#slider .pagination .owl-dot .bar');
            TweenMax.fromTo(id + ' .pagination .owl-dot.active .bar', timeout, {css:{width:'0%'}}, {css:{width:'100%'}, ease: Power0.easeNone});
        } else {
            t.owl.trigger('to.owl.carousel', [0]);
        }
    },
    fitIframe: function(id){
        var vid = document.querySelector('#' + id);
        var wrapper = vid.parentNode;
        var wrapperTwo = vid.parentNode.parentNode;
        window.youtubeiFrameFit = fit(wrapper, wrapperTwo, {
                cover: true,
                watch: true
            });
        window.youtubeiFrameFit.trigger();
    },
    triggerYoutube: function(vars){
        var t = this,
            id = '#' + t.id;

        if(jQuery(id + ' .owl-item.active div.bg.video iframe.yt').length != 0) {
            var t = this,
                prefix = '',
                ytID = jQuery('.owl-item.active iframe.yt').attr('id'),
                ytString = '',
                fn = '';

            if (vars == 'stop'){
                prefix = 'stopVideo_';
            }
            if (vars == 'play'){
                prefix = 'playVideo_';
                t.fitIframe(ytID);
            }

            ytString = prefix+ytID;
            fn = window[ytString];
            if(typeof fn === 'function') {
                fn();
            }
        }
    },
    autoplayComplete: function(){
        if(typeof(window.zSlider.owl.data('owl.carousel')) != "undefined") {
            if(window.zSlider.owl.data('owl.carousel').current() + 1 == window.zSlider.owl.data('owl.carousel').items().length ){
                window.zSlider.restartOwl();
            }
        }
    },
    makeid: function(){
        var id = '',
            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
        for( var i=0; i < 5; i++ )
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        return id;
    },
    onPreloaderEnd: function(){
        var t = this,
            id = '#' + t.id;

        if(jQuery(id + ' .owl-item.active div.bg.video .video_iframe').length != 0) {
            var name = jQuery(id + ' .owl-item.active div.bg.video .video_iframe').attr('name');
            try {
            	jQuery(frames[name].document.body).find("video").get(0).play();
            } catch (e) {
            }
        }
    },
    onLoad: function(){
        var t = this,
            id = '#' + t.id;

        t.tl.staggerTo(id + ' > .pagination .pagination_table .owl-dot', 0.2, {top: '0px', opacity: 1, ease: Power2.easeOut, onComplete: t.onPreloaderEnd }, 0.1, '-=0.1');

        if (typeof t.owl !== 'undefined' && t.owl.data('owl.carousel').settings !== 'undefined' && t.owl.data('owl.carousel').settings.autoplay) {
            t.restartOwl(true);
        }

        /*
        if(t.var.isMobile){
            jQuery('body').on({
                'touchmove': function(e) {}
            });
        } else {
            if ( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ) {
                t.var.browserMouseWheelSting = 'DOMMouseScroll MozMousePixelScroll';
            } else {
                t.var.browserMouseWheelSting = 'wheel mousewheel';
            }
            jQuery(window).on(t.var.browserMouseWheelSting, function() {
                if(t.var.hasScrolled == 0){}
            });
        }
        */
    }
});

jQuery(document).on({
    ready: function(){
        if(typeof window.zSlider !== 'undefined' && document.getElementById(window.zSlider.id)) {
            window.zSlider.__proto__.returnSlides = Object
                .keys(window.zSlider.var.slides)
                .map(function(key) {
                    return this.zSlider.var.slides[key];
                })
                .map(function(slide, index) {
                    if( slide.enabled == 'true' ) {
                        var backgroundImage = '',
                            backgroundVideo = '',
                            backgroundVideoID = '',
                            backgroundVideoScript = ''

                        if( slide.background_image.type == 'image' ){
                            backgroundImage = '<div class="bg image" style="background-size:' + slide.background_image_size + ';background-image:url(' + slide.background_image.url + '); opacity:' + slide.background_opacity + ';"></div>'
                        }
                        if( slide.background_video && !slide.background_video_embed ){
                            backgroundVideoID = this.zSlider.makeid();
                            backgroundVideo = '<div class="bg video ' + backgroundVideoID + '" style="opacity:' + slide.background_opacity + ';"><iframe class="video_iframe" id="videoFrame_' + backgroundVideoID + '" name="videoFrame_' + backgroundVideoID + '" src="' + this.zSlider.var.siteurl + '/wp-content/plugins/zSlider/inc/iframe_video.php?videoURL=' + slide.background_video[0].video.url + '&mime_type=' + slide.background_video[0].video.mime_type + '&volume=' + slide.background_video_volume / 100 +'&poster=' + slide.background_video_poster.url + '&site_url=' + this.zSlider.var.siteurl + '"></iframe></div>';
                        }
                        if( slide.background_video_embed ){
                            backgroundVideo = '<div class="bg video" style="opacity:' + slide.background_opacity + ';">';
                            backgroundVideo += slide.background_video_embed;
                            backgroundVideo += '</div>';
                        }
                        return '\
                            <div class="slide" style="background-color: ' + slide.background_color + ';" data-index="' + index + '" data-timeout="' + slide.autoplayTimeout + '">' + 
                                '<div class="content">' + backgroundImage + backgroundVideo + 
                                    '<div class="container">' + 
                                        '<h1 class="title" style="color: ' + slide.headline_color + ';">' + slide.title + '</h1>' + 
                                        '<p class="subheadline" style="color: ' + slide.text_color + ';">' + slide.subheadline + '</p>' + 
                                        '<a class="page ' + slide.cta_style + '" href="' + slide.page + '" target="_self">' + slide.cta_text + '<i class="fa fa-arrow-right" aria-hidden="true"></i></a>' + 
                                    '</div>\
                                </div>\
                            </div>\
                        </div>\
                        ';
                    }
                });

            window.zSlider.__proto__.returnPagination = Object
                .keys(window.zSlider.var.slides)
                .map(function(key) {
                    return this.zSlider.var.slides[key];
                })
                .map(function(slide, index) {
                    if( slide.subheadline_pagination == '' ){
                        slide.subheadline_pagination = '&nbsp;';
                    }
                    return '\
                    <div class="owl-dot">' + 
                        '<div class="bar2"></div><div class="bar"></div>\
                        <h1 class="title_pagination">' + slide.title_pagination + '</h1>' + 
                        '<p class="subheadline_pagination">' + slide.subheadline_pagination + '</p>' + 
                    '</div>\
                    ';
                });


            document.getElementById(window.zSlider.id).innerHTML = '\
                <div class="slides owl-carousel"></div>\
                <div class="pagination">\
                    <div class="pagination_table container"></div>\
                </div>';
            document.getElementById(window.zSlider.id).getElementsByClassName('slides')[0].innerHTML = window.zSlider.__proto__.returnSlides.join('');
            document.getElementById(window.zSlider.id).getElementsByClassName('pagination_table')[0].innerHTML = window.zSlider.__proto__.returnPagination.join('');

            window.zSlider.owl = jQuery('#' + window.zSlider.id + ' .slides');
            window.zSlider.owl.owlCarousel({
                nav: true,
                navText: ['<span class="dashicons dashicons-arrow-left-alt2"></span>', '<span class="dashicons dashicons-arrow-right-alt2"></span>'],
                items: 1,
                loop: false,
                mouseDrag: true,
                autoHeight: false,
                margin: 0,
                autoplay: window.zSlider.var.slider_autoplay,
                autoplayTimeout: 3000,
                dotsContainer: '#' + window.zSlider.id + ' .pagination_table',
                animateOut: 'OutUp',
                animateIn: 'InUp',
                // onResize: function(){},
                // onResized: function(){},
                onInitialize: function(){
                    var t = this;
                    if(window.zSlider.var.isMobile){
                        t.settings.autoplay = false;
                        t.options.autoplay = false;
                    }
                },
                onInitialized: function(){
                    var t = this,
                		currSlide = t._current + 1,
                		length = t._items.length,
                        id = '#' + window.zSlider.id;

                    if (t.settings.autoplay) {
                        window.zSlider.owl.trigger('refresh.owl.carousel');
            			window.zSlider.owl.trigger('stop.owl.autoplay');
                        t.settings.autoplayTimeout = jQuery(id + ' .owl-item.active .slide').attr('data-timeout');
            			window.zSlider.owl.trigger('play.owl.autoplay');
                        var timeout = jQuery(id + ' .owl-item.active .slide').attr('data-timeout')/1000;
            			TweenMax.fromTo(id + ' .pagination .owl-dot.active .bar', timeout, {css:{width:'0%'}}, {css:{width:'100%'}, ease: Power0.easeNone});
                    }
                    jQuery('<div class="slide-num">' + currSlide + '/' + length + '</div>').insertAfter(id + ' > .slides.owl-carousel .owl-nav > .owl-prev');
                    window.zSlider.redrawRect();
                },
                onChange: function(){
                    var t = this,
                        id = '#' + window.zSlider.id;

                    if (t.settings.autoplay) {
            			TweenLite.to(id + ' .pagination .owl-dot.active .bar', 0.5, {width:'100%', ease: Power2.easeOut});
                    }
                },
                // onChanged: function(){},
                onTranslate: function(){
                    var t = this,
                		currSlide = t._current + 1,
                		length = t._items.length,
                        id = '#' + window.zSlider.id;

    				jQuery(id + ' > .slides.owl-carousel .owl-nav > div.slide-num').html(currSlide + '/' + length);

                    if (t.settings.autoplay) {
            			TweenLite.to(id + ' .pagination .owl-dot.active .bar', 0.5, {width:'0%', ease: Power2.easeOut});
                    }
                    if(window.zSlider.var.onTranslateBoolVar == 0) {
                        window.zSlider.var.onTranslateBoolVar = 1;
                        window.zSlider.var.arr1 = [0,0,0,0];
                        TweenLite.to(window.zSlider.var.arr1, 0.5, { endArray:window.zSlider.var.arr2, onUpdate: window.zSlider.clipPath, onComplete: window.zSlider.onTranslateBool});
                        window.zSlider.triggerYoutube('stop')
                        TweenLite.to(id + ' .owl-item.owl-animated-out > .slide .bg', 0.5, {top:'-20%', ease: Power0.easeNone});
                    } else {
                        window.zSlider.redrawRect();
                    }
                },
                onTranslated: function(){
                	var t = this,
                        id = '#' + window.zSlider.id;

                    window.zSlider.pauseAllVideos();

                    if (t.settings.autoplay) {
                        window.zSlider.owl.trigger('refresh.owl.carousel');
            			window.zSlider.owl.trigger('stop.owl.autoplay');
                        t.settings.autoplayTimeout = jQuery(id + ' .owl-item.active .slide').attr('data-timeout');
            			window.zSlider.owl.trigger('play.owl.autoplay');
                        var timeout = jQuery(id + ' .owl-item.active .slide').attr('data-timeout')/1000;
            			TweenMax.fromTo(id + ' .pagination .owl-dot.active .bar', timeout, {css:{width:'0%'}}, {css:{width:'100%'}, ease: Power0.easeNone, onComplete: window.zSlider.autoplayComplete });
                    }
                    if(jQuery(id + ' .owl-item.active div.bg.video .video_iframe').length != 0) {
                        var name = jQuery(id + ' .owl-item.active div.bg.video .video_iframe').attr('name');
                        try {
                        	jQuery(frames[name].document.body).find('video').get(0).play();
                        } catch (e) {
                        }
                    }

                    window.zSlider.triggerYoutube('play');
                    window.zSlider.redrawRect();
                }
            });
            window.zSlider.init();
            window.zSlider.onLoad();
        }
    }
});
// END ready:

jQuery(window).on({
    resize: function(){
        if(typeof window.zSlider.resize === 'function') {
            window.zSlider.resize();
        }
    },
    load: function(){
        if( window.zSlider.var.onYouTubeIframeAPI_checkOnLoad &&
            typeof window.zSlider.var.onYouTubeIframeAPIReadyFired === 'boolean') {
            if(window.zSlider.var.onYouTubeIframeAPIReadyFired != true){
                window.zSlider.var.onYouTubeIframeAPIReadyFired = true;
                window.onYouTubeIframeAPIReady();
            }
        }
    }
});

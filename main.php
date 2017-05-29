
<link rel='stylesheet' href='<?php echo site_url(); ?>/wp-admin/load-styles.php?load%5B%5D=dashicons' type='text/css' media='all' />

<style type="text/css">
    <?php
    echo file_get_contents(dirname(__FILE__).'/js/vendor/owl_carousel/assets/owl.carousel.css').
        file_get_contents(dirname(__FILE__).'/css/style.css');
    ?>
</style>

<script type="text/javascript">

    <?php
    echo file_get_contents(dirname(__FILE__).'/js/vendor/gs/TweenMax.min.js').
        file_get_contents(dirname(__FILE__).'/js/vendor/gs/TimelineMax.min.js').
        file_get_contents(dirname(__FILE__).'/js/vendor/gs/plugins/EndArrayPlugin.min.js').
        file_get_contents(dirname(__FILE__).'/js/vendor/owl_carousel/owl.carousel.min.js').
        file_get_contents(dirname(__FILE__).'/js/vendor/gs/plugins/EndArrayPlugin.min.js').
        file_get_contents(dirname(__FILE__).'/js/vendor/fit.min.js').
        file_get_contents(dirname(__FILE__).'/js/vendor/jquery.fitvids.js').
        file_get_contents(dirname(__FILE__).'/js/slider.js');
    ?>

    window.zSlider.__proto__.id = '<?php echo get_field('slider_id', 'option'); ?>';
    window.zSlider.var.siteurl = '<?php echo get_option('siteurl'); ?>';
    window.zSlider.var.template_directory_uri = '<?php echo get_template_directory_uri(); ?>';
    window.zSlider.var.slider_autoplay = <?php echo get_field('slider_autoplay', 'option'); ?>;
    window.zSlider.var.slides = [<?php 
        $slides = get_field('slide', 'option');
        $i = 0;
        $len = 0;
        $background_video_embed_script = '';
        $onYouTubeIframeAPIReady = '';
        if ( $slides ) {
            foreach( $slides as $slide):
                if( $slide['enabled'] == 'true' ) {
                    $len++;
                }
            endforeach;
            foreach( $slides as $slide ):
                if( $slide['enabled'] == 'true' ) {
                    $i++;
                    if ( $slide['background_video_embed'] != '' ){
                        $characters = 'abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                        $randstring = '';
                        for ($i2 = 0; $i2 < 12; $i2++) {
                            $randstring .= $characters[rand(0, strlen($characters) - 1)];
                        }
                        $slide['background_video_embed_id'] = $randstring;
                        $iframe = $slide['background_video_embed'];
                        preg_match('/src="(.+?)"/', $iframe, $matches);
                        $src = $matches[1];
                        $pos = strrpos($src, '/') + 1;
                        if ($pos){
                            $id = substr($src, $pos);
                            $posEnd = strpos($id, '?');
                            $ytid = substr($id, 0, $posEnd);
                            $slide['background_video_embed_ytid'] = $ytid;
                            $onYouTubeIframeAPIReady .= '
                                window.player_' . $randstring . ' = new YT.Player("' . $randstring . '", {
                                    playerVars: {
                                        "rel":  0,
                                        "controls":  0,
                                        "showinfo":  0,
                                        "autohide":  1,
                                        "loop":  1,
                                        "fs":  0,
                                        "html5": 1,
                                        "modestbranding":  1,
                                        "enablejsapi": 1,
                                        "playlist": "'.$ytid.'"
                                    },
                                    events: {
                                        "onReady": window.onPlayerReady_' . $randstring .'
                                    }
                                });
                            ';

                            $background_video_embed_script .= '
                                window.playVideo_' . $randstring . ' = function() {
                                    window.player_' . $randstring . '.playVideo();
                                }
                                window.stopVideo_' . $randstring . ' = function() {
                                    window.player_' . $randstring . '.pauseVideo();
                                }
                                window.onPlayerReady_' . $randstring .' = function(){
                                    window.player_' . $randstring . '.setVolume(' . $slide['background_video_volume'] . ');
                                    window.player_' . $randstring . '.playVideo();
                                    setTimeout(function(){
                                        window.player_' . $randstring . '.pauseVideo();
                                        window.player_' . $randstring . '.seekTo(0, false);
                                    }, 500);
                                }
                                ';
                        }

                        $params = array();
                        if ( stripos(strtolower($src), 'youtube.com') ) {
                            $params = array(
                                'rel' => 0,
                                'controls' => 0,
                                'showinfo' => 0,
                                'autohide' => 1,
                                'loop' => 1,
                                'fs' => 0,
                                'html5' => 1,
                                'modestbranding' => 1,
                                'enablejsapi' => 1,
                                'playlist' => $ytid
                            );
                        }
                        $new_src = add_query_arg($params, $src);
                        $attributes = 'frameborder="0"';
                        $iframe = '<iframe class="yt" id="' . $randstring . '" height="360" width="640" src="' . $new_src . '" '. $attributes .' allowfullscreen></iframe>';
                        $slide['background_video_embed'] = $iframe;
                    }
                    echo json_encode($slide);
                }
                if ( $i < $len && $i != 0 ) {
                    echo ',';
                }
            endforeach;
        }
    ?>];

    window.onYouTubeIframeAPIReady = function() {
        setTimeout(function(){
            jQuery("iframe.yt").parent().fitVids();
            <?php echo $onYouTubeIframeAPIReady; ?>
	        window.zSlider.var.onYouTubeIframeAPIReadyFired = true;
        }, 1000);
    }

    <?php echo $background_video_embed_script; ?>

</script>

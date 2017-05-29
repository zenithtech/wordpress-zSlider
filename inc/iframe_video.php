<?php
$videoURL       = isset($_GET['videoURL']) && $_GET['videoURL']!='' ? $_GET['videoURL'] : '';
$mime_type      = isset($_GET['mime_type']) && $_GET['mime_type']!='' ? $_GET['mime_type'] : '';
$volume         = isset($_GET['volume']) && $_GET['volume']!='' ? $_GET['volume'] : 0;
$autoplay       = isset($_GET['autoplay']) && $_GET['autoplay']!='' ? $_GET['autoplay'] : 0;
$poster         = isset($_GET['poster']) && $_GET['poster']!='' ? $_GET['poster'] : '';
$tint           = isset($_GET['tint']) && $_GET['tint']!='' ? '#'.$_GET['tint'] : 'transparent';
$tintopacity    = isset($_GET['tintopacity']) && $_GET['tintopacity']!='' ? $_GET['tintopacity'] : 0;
// $site_url       = isset($_GET['site_url']) && $_GET['site_url']!='' ? $_GET['site_url'] : '';
?><!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width">
        <script type="text/javascript">
            <?php echo file_get_contents(dirname(dirname(dirname(dirname(dirname(dirname(__FILE__)))))).'/wp-includes/js/jquery/jquery.js'); ?>
            jQuery(window).on({
                load:function(){
                    jQuery("video").get(0).volume = <?php echo $volume; ?>;
                    jQuery("video").get(0).pause();
                    jQuery("video").get(0).currentTime = 0;
                    <?php if($autoplay){ ?>
                    jQuery("video").get(0).play();
                    <?php } ?>
                }
            });
        </script>
        <style type="text/css">
            *::-webkit-media-controls-panel {
              display: none!important;
              -webkit-appearance: none;
            }
            *::--webkit-media-controls-play-button {
              display: none!important;
              -webkit-appearance: none;
            }
            *::-webkit-media-controls-start-playback-button {
              display: none!important;
              -webkit-appearance: none;
            }
            .tint {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2;
                opacity: <?php echo $tintopacity; ?>;
                background-color: <?php echo $tint; ?>;
            }
            video {
                height: 100%;
                width: 100%;
                display: block;
                border-spacing: 0;
                padding: 0;
                margin: 0;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                object-fit: cover;
                object-position: center;
            }
        </style>
    </head>
    <body style="margin: 0px;">
        <video name="media" preload="none" poster="<?php echo $poster; ?>" loop<?php if($autoplay){ ?> autoplay<?php } ?>>
            <source src="<?php echo $videoURL; ?>" type="<?php echo $mime_type; ?>">
        </video>
        <div class="tint"></div>
    </body>
</html>

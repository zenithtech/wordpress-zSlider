# wordpress-zSlider
Custom images and videos slider script for Wordpress using [ACF](https://github.com/elliotcondon/acf), [Owl-Carousel](https://github.com/OwlCarousel2/OwlCarousel2), [Bootstrap](https://github.com/twbs/bootstrap), and animation using [GreenSock](https://github.com/greensock/GreenSock-JS).

This is not a WP plugin. It's a slider script intended for advnaced usage and customization within WP templates.

----

## Features
- Abilty to upload images and videos from library, and videos from YouTube.
- Abilty to enable/disable the slideshow autoplay.
- Abilty to enable/disable each slide individually.
- Ability to set a different autoplay timeouts for each slide.
- Ability to set the volume for video slides (library vidoes, youtube).
- Videos fills the display area witout padding.
- ACF json structure included for import.
- Navigation buttons (top-right), indicating the current and total number of slides.
- Pagination buttons row (bottom) with custom titles and subtitles.
- Progress bar for slider autoplay timeout displays above the bottom pagination buttons.
- Videos loop when playtime reaches the end.
- Slider loops when it reaches the end (if autoplay is enabled).
- Mobile-ready responsive layout.

## Usage
1. Copy this repo into your `plugins` directory, naming it `zSlider`.
2. Install the required [ACF](https://github.com/elliotcondon/acf) plugin.
3. Import the json file `acf-zSlider.json` using the ACF.
4. Add the ACF Options WP admin menu item by adding the below code to your themes `functions.php` file:

```
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'zSlider Settings',
		'menu_title'	=> 'zSlider',
		'menu_slug' 	=> 'zslider-slider',
		'capability'	=> 'edit_posts',
		'redirect'	=> false,
		'icon_url' 	=> 'dashicons-slides'
	));
}
```

5. Goto the new WP admin`zSlider` tab, edit the slider to your liking, and set the `ID` of the tag you wish to render it to, in this case `slider`.
6. Edit your custom WP page template as such:

```
<div id="slider" class="z-slider"></div>

<?php include_once(dirname(dirname(dirname(__FILE__))).'/plugins/zSlider/main.php'); ?>
```

7. If you're using the slider within content, remember to set a height, such as:
```
<style type="text/css">
	.z-slider {
		height: 500px;
	}
</style>
```
Otherwise the slider will automatically adjust to fit the height and width of any container you place it into.

If you have a second WP installation, or other WP installations on the same server, there's no need to copy the `zSlider` folder again. Simply include the slider `main.php` file in the same way from the other WP installation, such as:

```
<?php include(dirname(dirname(dirname(dirname(dirname(__FILE__))))).'/mySite.com/wp-content/plugins/zSlider/main.php'); ?>
```

----

## Examples:
https://zenitht.com/wp/wordpress-zslider-plugin-test/

(u: wp / p: wp)

----

## Screenshots:
https://zenitht.com/screenshots/zSlider/screenshot_0.png

https://zenitht.com/screenshots/zSlider/screenshot_1.png

https://zenitht.com/screenshots/zSlider/screenshot_2.png

![screenshot_0](https://zenitht.com/screenshots/zSlider/screenshot_0.png)
![screenshot_1](https://zenitht.com/screenshots/zSlider/screenshot_1.png)
![screenshot_2](https://zenitht.com/screenshots/zSlider/screenshot_2.png)

----

## License ##

This package is licensed under MIT license. See LICENSE for details.



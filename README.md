# wordpress-zSlider
Custom images and videos slider script for Wordpress using [ACF](https://github.com/elliotcondon/acf), [Owl-Carousel](https://github.com/OwlCarousel2/OwlCarousel2), [Bootstrap](https://github.com/twbs/bootstrap), and animation using [GreenSock](https://github.com/greensock/GreenSock-JS).

This is not a WP plugin. It's a slider script intended for advnaced usage and customization within WP templates.

## Features
- ACF json structure included for import.
- Slider can display images and videos.
- Videos from library files and YouTube fill the display area witout padding.

## Usage
- Copy this repo into your active theme directory, naming it `zSlider`.
- Instal the required [ACF](https://github.com/elliotcondon/acf) plugin.
- Import the json file `acf-zSlider.json` using the ACF.
- Add the ACF Options WP admin menu item by adding the below code to your themes `functions.php` file:
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
- Goto the new WP admin`zSlider` tab, edit the slider to your liking, and set the ID of the tag you wish to render it to, in this case `slider`.
- Edit your custom WP page template as such:
```
<div id="slider"></div>
<?php include_once('zSlider/main.php'); ?>
```
## Examples:
Slider automatically filling the window: [https://zenitht.com/wp-slider/]

Slider filling the area: [https://zenitht.com/wp-slider/?page_id=34]

(u: wp / p: wp)

## License
[GPLv2](http://www.gnu.org/licenses/gpl-2.0.html) or later

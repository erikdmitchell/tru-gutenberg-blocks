<?php
/**
 * Plugin Name: The Run Up Gutenberg Blocks
 * Plugin URI:
 * Description: The Run Up Gutenberg Blocks
 * Version: 0.1.0
 * Author: Erik Mitchell
 * Author URI:
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: tru-gutenberg-blocks
 * Domain Path: /languages
 *
 * @package TRUGutenbergBlocks
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
    die;
}

// Define TRU_GUTENBERG_BLOCKS_PLUGIN_FILE.
if ( ! defined( 'TRU_GUTENBERG_BLOCKS_PLUGIN_FILE' ) ) {
    define( 'TRU_GUTENBERG_BLOCKS_PLUGIN_FILE', __FILE__ );
}

// Include the main TRU_Gutenberg_Blocks class.
if ( ! class_exists( 'TRU_Gutenberg_Blocks' ) ) {
    include_once dirname( __FILE__ ) . '/class-tru-gutenberg-blocks.php';
}

/**
 * WP Developer Tutorial (basics): https://developer.wordpress.org/block-editor/tutorials/block-tutorial/
 * WP for JS Tutorial: https://javascriptforwp.com/courses/wordpress-block-development/
 */

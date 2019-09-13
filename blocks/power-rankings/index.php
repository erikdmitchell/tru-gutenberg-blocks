<?php
/**
 * Power rankings block setup
 *
 * @package TRUGutenbergBlocks
 * @since   0.1.0
 */

/**
 * Register block.
 *
 * @access public
 * @return void
 */
function tru_power_rankings_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/power-rankings/';

    wp_register_script(
        'tru-power-rankings-script',
        $url . 'block.js',
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor', 'wp-data' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type(
        'tru-blocks/power-rankings',
        array(
            'style' => 'tru-power-rankings-style',
            'editor_style' => 'tru-power-rankings-editor',
            'editor_script' => 'tru-power-rankings-script',
        )
    );
}
add_action( 'init', 'tru_power_rankings_register_block' );

/**
 * Add editor styles.
 *
 * @access public
 * @return void
 */
function tru_power_rankings_block_editor_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/power-rankings/';

    wp_register_style(
        'tru-power-rankings-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_editor_assets', 'tru_power_rankings_block_editor_styles' );

/**
 * Add frontend styles.
 *
 * @access public
 * @return void
 */
function tru_power_rankings_block_frontend_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/power-rankings/';

    wp_enqueue_style(
        'tru-power-rankings-style',
        $url . 'style.css',
        array(),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_assets', 'tru_power_rankings_block_frontend_styles' );

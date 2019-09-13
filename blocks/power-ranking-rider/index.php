<?php
/**
 * Power ranking block setup
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
function tru_power_ranking_rider_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/power-ranking-rider/';

    wp_register_script(
        'tru-power-ranking-rider-script',
        $url . 'block.js',
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type(
        'tru-blocks/power-ranking-rider',
        array(
            'style' => 'tru-power-ranking-rider-style',
            'editor_style' => 'tru-power-ranking-rider-editor',
            'editor_script' => 'tru-power-ranking-rider-script',
        )
    );
}
add_action( 'init', 'tru_power_ranking_rider_register_block' );

/**
 * Add editor styles.
 *
 * @access public
 * @return void
 */
function tru_power_ranking_rider_block_editor_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/power-ranking-rider/';

    wp_register_style(
        'tru-power-ranking-rider-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_editor_assets', 'tru_power_ranking_rider_block_editor_styles' );

/**
 * Add frontend styles.
 *
 * @access public
 * @return void
 */
function tru_power_ranking_rider_block_frontend_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/power-ranking-rider/';

    wp_enqueue_style(
        'tru-power-ranking-rider-style',
        $url . 'style.css',
        array(),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_assets', 'tru_power_ranking_rider_block_frontend_styles' );

/**
 * Add power_ranking image style.
 *
 * @access public
 * @return void
 */
function tru_power_ranking_add_image_size() {
    add_image_size( 'power_ranking', 280, 160, true );
}
add_action( 'init', 'tru_power_ranking_add_image_size' );

/**
 * Add power_ranking image to admin.
 *
 * @access public
 * @param mixed $sizes
 * @return void
 */
function tru_power_ranking_image_sizes_admin( $sizes ) {
    return array_merge(
        $sizes,
        array(
            'power_ranking' => __( 'Power Ranking' ),
        )
    );
}
add_filter( 'image_size_names_choose', 'tru_power_ranking_image_sizes_admin' );

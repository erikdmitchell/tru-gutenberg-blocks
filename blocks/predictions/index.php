<?php
/**
 * Predictions block setup
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
function tru_predictions_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/predictions/';

    wp_register_script(
        'tru-predictions-script',
        $url . 'block.js',
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type(
        'tru-blocks/predictions',
        array(
            'style' => 'tru-predictions-style',
            'editor_style' => 'tru-predictions-editor',
            'editor_script' => 'tru-predictions-script',
        )
    );
}
add_action( 'init', 'tru_predictions_register_block' );

/**
 * Add editor styles.
 *
 * @access public
 * @return void
 */
function tru_predictions_block_editor_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/predictions/';

    wp_register_style(
        'tru-predictions-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_editor_assets', 'tru_predictions_block_editor_styles' );

/**
 * Add frontend styles.
 *
 * @access public
 * @return void
 */
function tru_predictions_block_frontend_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/predictions/';

    wp_enqueue_style(
        'tru-predictions-style',
        $url . 'style.css',
        array(),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_assets', 'tru_predictions_block_frontend_styles' );

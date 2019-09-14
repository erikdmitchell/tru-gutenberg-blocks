<?php
/**
 * Race prediction results block setup
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
function tru_race_prediction_results_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/race-prediction-results/';

    wp_register_script(
        'tru-race-prediction-results-script',
        $url . 'block.js',
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor', 'wp-data' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type(
        'tru-blocks/race-prediction-results',
        array(
            'style' => 'tru-race-prediction-results-style',
            'editor_style' => 'tru-race-prediction-results-editor',
            'editor_script' => 'tru-race-prediction-results-script',
        )
    );
}
add_action( 'init', 'tru_race_prediction_results_register_block' );

/**
 * Add editor styles.
 *
 * @access public
 * @return void
 */
function tru_race_prediction_results_block_editor_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/race-prediction-results/';

    wp_register_style(
        'tru-race-prediction-results-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_editor_assets', 'tru_race_prediction_results_block_editor_styles' );

/**
 * Add frontend styles.
 *
 * @access public
 * @return void
 */
function tru_race_prediction_results_block_frontend_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/race-prediction-results/';

    wp_enqueue_style(
        'tru-race-prediction-results-style',
        $url . 'style.css',
        array(),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_assets', 'tru_race_prediction_results_block_frontend_styles' );

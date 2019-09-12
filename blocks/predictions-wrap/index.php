<?php

function tru_predictions_wrap_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/predictions-wrap/';

    wp_register_script(
        'tru-predictions-wrap-script',
        $url . 'block.js',
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type(
        'tru-blocks/predictions-wrap',
        array(
            'style' => 'tru-predictions-wrap-style',
            'editor_style' => 'tru-predictions-wrap-editor',
            'editor_script' => 'tru-predictions-wrap-script',
        )
    );
}
add_action( 'init', 'tru_predictions_wrap_register_block' );

function tru_predictions_wrap_block_editor_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/predictions-wrap/';

    wp_register_style(
        'tru-predictions-wrap-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_editor_assets', 'tru_predictions_wrap_block_editor_styles' );

function tru_predictions_wrap_block_frontend_styles() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/predictions-wrap/';

    wp_enqueue_style(
        'tru-predictions-wrap-style',
        $url . 'style.css',
        array(),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
}
add_action( 'enqueue_block_assets', 'tru_predictions_wrap_block_frontend_styles' );

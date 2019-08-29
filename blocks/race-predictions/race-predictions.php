<?php

function tru_race_predictions_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/race-predictions/';
    wp_register_script(
        'tru-race-predictions',
        $url . 'race-predictions.js',
        array( 'wp-blocks', 'wp-element' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-race-predictions-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-race-predictions',
        $url . 'style.css',
        array( ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type( 'tru-blocks/race-predictions', array(
        'style' => 'tru-race-predictions',
        'editor_style' => 'tru-race-predictions-editor',
        'editor_script' => 'tru-race-predictions',
    ) ); 
}
add_action( 'init', 'tru_race_predictions_register_block' );
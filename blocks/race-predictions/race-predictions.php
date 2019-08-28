<?php

function tru_race_predictions_register_block() {
    wp_register_script(
        'tru-race-predictions',
        TRU_GUTENBERG_BLOCKS_URL . 'blocks/race-predictions/race-predictions.js',
        array( 'wp-blocks', 'wp-element' )
    );
 
    register_block_type( 'tru-blocks/race-predictions', array(
        'editor_script' => 'tru-race-predictions',
    ) );
 
}
add_action( 'init', 'tru_race_predictions_register_block' );
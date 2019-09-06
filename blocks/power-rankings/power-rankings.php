<?php

function tru_power_rankings_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/power-rankings/';
    
    wp_register_script(
        'tru-power-rankings',
        $url . 'power-rankings.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-power-rankings-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-power-rankings',
        $url . 'style.css',
        array( ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type( 'tru-blocks/power-rankings', array(
        'style' => 'tru-power-rankings',
        'editor_style' => 'tru-power-rankings-editor',
        'editor_script' => 'tru-power-rankings',
    ) ); 
}
add_action( 'init', 'tru_power_rankings_register_block' );
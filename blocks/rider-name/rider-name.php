<?php

function tru_rider_name_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/rider-name/';
    
    wp_register_script(
        'tru-rider-name',
        $url . 'rider-name.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-rider-name-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-rider-name',
        $url . 'style.css',
        array( ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type( 'tru-blocks/rider-name', array(
        'style' => 'tru-rider-name',
        'editor_style' => 'tru-rider-name-editor',
        'editor_script' => 'tru-rider-name',
    ) ); 
}
add_action( 'init', 'tru_rider_name_register_block' );
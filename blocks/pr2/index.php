<?php

function tru_pr2_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/pr2/';
    
    wp_register_script(
        'tru-pr2-script',
        $url . 'block.js',
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-pr2-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-pr2-style',
        $url . 'style.css',
        array( ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type( 'tru-blocks/pr2', array(
        'style' => 'tru-pr2-style',
        'editor_style' => 'tru-pr2-editor',
        'editor_script' => 'tru-pr2-script',
    ) ); 
}
add_action( 'init', 'tru_pr2_register_block' );
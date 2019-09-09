<?php

function tru_inner_block_test_register_block() {
    $url = TRU_GUTENBERG_BLOCKS_URL . 'blocks/inner-block-test/';
    
    wp_register_script(
        'tru-inner-block-test-script',
        $url . 'block.js',
        array( 'wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-inner-block-test-editor',
        $url . 'editor.css',
        array( 'wp-edit-blocks' ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );
 
    wp_register_style(
        'tru-inner-block-test-style',
        $url . 'style.css',
        array( ),
        TRU_GUTENBERG_BLOCKS_VERSION
    );

    register_block_type( 'tru-blocks/inner-block-test', array(
        'style' => 'tru-inner-block-test-style',
        'editor_style' => 'tru-inner-block-test-editor',
        'editor_script' => 'tru-inner-block-test-script',
    ) ); 
}
add_action( 'init', 'tru_inner_block_test_register_block' );
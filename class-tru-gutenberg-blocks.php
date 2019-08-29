<?php
/**
 * Main Blocks class
 *
 * @package TRUGutenbergBlocks
 * @since   0.1.0
 */

/**
 * Final TRU_Gutenberg_Blocks class.
 *
 * @final
 */
final class TRU_Gutenberg_Blocks {

    /**
     * Version
     *
     * @var string
     * @access public
     */
    public $version = '0.1.0';

    /**
     * Construct function.
     *
     * @access public
     * @return void
     */
    public function __construct() {
        $this->define_constants();
        $this->includes();
        $this->load_blocks();
        $this->init();
    }

    /**
     * Define constants function.
     *
     * @access private
     * @return void
     */
    private function define_constants() {
        $this->define( 'TRU_GUTENBERG_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
        $this->define( 'TRU_GUTENBERG_BLOCKS_URL', plugin_dir_url( __FILE__ ) );
        $this->define( 'TRU_GUTENBERG_BLOCKS_VERSION', $this->version );
    }

    /**
     * Define function.
     *
     * @access private
     * @param mixed $name (name).
     * @param mixed $value (value).
     * @return void
     */
    private function define( $name, $value ) {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

    /**
     * Includes function.
     *
     * @access public
     * @return void
     */
    public function includes() {
        //include_once( TRU_GUTENBERG_BLOCKS_PATH . 'gberg.php' );
    }
    
    /**
     * Load blocks.
     * 
     * @access public
     * @return void
     */
    public function load_blocks() {
        foreach ( glob( TRU_GUTENBERG_BLOCKS_PATH . 'blocks/**/*.php' ) as $file ) :
            include_once( $file );
        endforeach;
    }    

    /**
     * Init function.
     *
     * @access public
     * @return void
     */
    public function init() {
        add_filter( 'block_categories', array( $this, 'block_categories'), 10, 2 );
    }
    

    /**
     * Custom block categories.
     * 
     * @access public
     * @param mixed $categories array.
     * @param mixed $post object.
     * @return array
     */
    public function block_categories( $categories, $post ) {
        if ( $post->post_type !== 'post' ) {
            return $categories;
        }
        
        return array_merge(
            $categories,
            array(
                array(
                    'slug' => 'tru',
                    'title' => __( 'The Run Up', 'tru-gutenberg-blocks' ),
                    'icon'  => '',
                ),
            )
        );
    }
    
    
}

new TRU_Gutenberg_Blocks();
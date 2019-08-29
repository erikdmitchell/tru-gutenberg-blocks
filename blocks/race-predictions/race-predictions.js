( function( blocks, element ) {
    var el = element.createElement;
 
    blocks.registerBlockType( 'tru-blocks/race-predictions', {
        title: 'Race Predictions',
        icon: 'format-status',
        description: __( 'Block for race predictions.' )
        category: 'tru',
        edit: function( props ) {
            return el(
                'p',
                { className: props.className },
                'Hello World, step 2 (from the editor, in green).'
            );
        },
        save: function() {
            return el(
                'p',
                {},
                'Hello World, step 2 (from the frontend, in red).'
            );
        },
    } );
}(
    window.wp.blocks,
    window.wp.element
) );
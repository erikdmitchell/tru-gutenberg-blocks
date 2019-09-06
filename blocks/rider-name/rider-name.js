( function( blocks, element ) {
    var el = element.createElement;
 
    blocks.registerBlockType( 'tru-blocks/rider-name', {
        title: 'Rider Name',
        icon: 'format-status',
        category: 'tru',
        attributes: {
            riderName: {
                type: 'string',
                //source: 'children',
                //selector: 'p',
            },
        },         
/*
        edit: function() {
            return el(
                'p',
                { style: blockStyle },
                'Hello World, step 1 (from the editor).'
            );
        },
        save: function() {
            return el(
                'p',
                { style: blockStyle },
                'Hello World, step 1 (from the frontend).'
            );
        },
*/

	edit: function( props ) {
		return wp.element.createElement( wp.editor.PlainText, {
			className: props.className,
			value: props.attributes.content,
			onChange: function( content ) {
				props.setAttributes( { content: content } );
			},
		} );
	},

        edit: function( props ) {
            var riderName = props.attributes.riderName;
            
            function onChangeRiderName( newRiderName ) {
                props.setAttributes( { riderName: newRiderName } );
            }
 
            return el( RichText, {
                tagName: 'p',
                className: props.className,
                onChange: onChangeContent,
                value: content,
            } );
        },
 
        save: function( props ) {
            return el( RichText.Content, {
                tagName: 'p', value: props.attributes.content,
            } );
        },
        
    } );
}(
    window.wp.blocks,
    window.wp.element
) );
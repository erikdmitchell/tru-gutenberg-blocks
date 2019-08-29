( function( blocks, editor, element ) {
    var el = element.createElement;
    var RichText = editor.RichText;
 
    blocks.registerBlockType( 'tru-blocks/power-rankings', {
        title: 'Race Predictions',
        icon: 'format-status',
        category: 'tru',
        attributes: {
            content: {
                type: 'array',
                source: 'children',
                selector: 'p',
            },
        },        
        edit: function( props ) {
            var content = props.attributes.content;
            
            function onChangeContent( newContent ) {
                props.setAttributes( { content: newContent } );
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
    window.wp.editor,
    window.wp.element
) );
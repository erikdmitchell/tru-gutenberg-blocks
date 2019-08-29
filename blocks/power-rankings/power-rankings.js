( function( blocks, editor, element ) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InnerBlocks = editor.InnerBlocks;
    
    const blocksTemplate = [
        [ 'core/heading', { placeholder: 'Rider Name' } ],
        [ 'core/image', { placeholder: 'Rider Image' } ],
        [ 'core/paragraph', { placeholder: 'Content' } ],
    ];    
 
    blocks.registerBlockType( 'tru-blocks/power-rankings', {
        title: 'Power Rankings',
        icon: 'list-view',
        category: 'tru',
        edit: ( props ) => {
            return el( InnerBlocks, {
                template: blocksTemplate,
                templateLock: true
            });
        },
        save: ( props ) => {
            return el( InnerBlocks.Content, {} );
        },   
    } );
}(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element
) );

/*
  
  name (string)
  last week (int)  
  details (editor)
  image (image)
    
*/
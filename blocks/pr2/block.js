/*
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
*/

/*
  
  name (string)
  last week (int)  
  details (editor)
  image (image)
    
*/ 


(function (blocks, editor, components, i18n, element) {
	var el = wp.element.createElement;
  	var registerBlockType = wp.blocks.registerBlockType;
  	var RichText = wp.editor.RichText;
  	var BlockControls = wp.editor.BlockControls;
  	var AlignmentToolbar = wp.editor.AlignmentToolbar;
  	var MediaUpload = wp.editor.MediaUpload;
  	var InspectorControls = wp.editor.InspectorControls;
  	var TextControl = components.TextControl;
  	
    registerBlockType('tru-blocks/pr2', { 
        title: i18n.__('Power Ranking Rider'),
        description: i18n.__('A custom block for displaying a rider in a power ranking.'),
        icon: 'list-view',
        category: 'tru',
        attributes: { 
          title: {
            type: 'array',
            source: 'children',
            selector: 'h3'
          },
          bio: {
            type: 'array',
            source: 'children',
            selector: 'p'
          },
          mediaURL: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'src'
          },
          riderName: {
            type: 'text'
          }
        },
        edit: function (props) {
              var attributes = props.attributes
              var alignment = props.attributes.alignment
              var facebookURL = props.attributes.facebookURL
              var twitterURL = props.attributes.twitterURL
              var instagramURL = props.attributes.instagramURL
              var linkedURL = props.attributes.linkedURL
              var emailAddress = props.attributes.emailAddress
        
              var onSelectImage = function (media) {
                return props.setAttributes({
                  mediaURL: media.url,
                  mediaID: media.id
                })
              }
        
              function onChangeAlignment (newAlignment) {
                props.setAttributes({ alignment: newAlignment })
              }
        	
              return [
        
        	    // We build the editor interface of our block here.
        		
              ]
        },    
    } );  	

})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)
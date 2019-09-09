(function (blocks, editor, components, i18n, element) {
    const el = wp.element.createElement;
    const { registerBlockType } = wp.blocks;
    const { InnerBlocks } = wp.editor;
	const { RichText, InspectorControls } = editor;
	const { Fragment } = element;
    const {
    	RangeControl,
    	Panel,
    	PanelBody
    } = components;
     
    const BLOCKS_TEMPLATE = [
        [ 'core/image', {} ],
        [ 'core/paragraph', { placeholder: 'Image Details' } ],
    ];

    registerBlockType( 'tru-blocks/template', {
        title: 'My Template Block',
        category: 'tru',
        attributes: {
        	count: {
        		type: 'number',
        		default: 2
        	}
        },       
        edit: function( props ) {
        	return (
        		el( Fragment, {},
                    el( InspectorControls, {},
                    	// Panel
                    	el( PanelBody, { title: 'Block Settings', initialOpen: true },
                    		el( RangeControl, {
                				label: 'Count',
                				min: 1,
                				max: 10,
                				onChange: ( value ) => {
                					props.setAttributes( { count: value } );
                				},
                				value: props.attributes.count
                            }),
                     
                    	)
                     
                    ),
        			/*  
        			 * Here will be your block markup 
        			 */
                     el( InnerBlocks, {
                        template: BLOCKS_TEMPLATE,
                        templateLock: false
                     })
        		)
            )
        },
        save: ( props ) => {
            return el( InnerBlocks.Content, {} );
        },
    }); 
})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)


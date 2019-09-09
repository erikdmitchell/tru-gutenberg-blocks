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
    
    const TEMPLATE_OPTIONS = [
    	{
    		title: 'Two Columns',
    		//icon: <svg />,
    		template: [
    			[ 'core/column', { width: 50 } ],
    			[ 'core/column', { width: 50 } ],
    		],
    	},
    	{
    		title: 'Three Columns',
    		//icon: <svg />,
    		template: [
    			[ 'core/column', { width: 33.33 } ],
    			[ 'core/column', { width: 33.33 } ],
    			[ 'core/column', { width: 33.33 } ],
    		],
    	},
    ];    

    registerBlockType( 'tru-blocks/template', {
        title: 'My Template Block',
        category: 'tru',
        attributes: {
        	count: {
        		type: 'number',
        		default: 1
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
                					console.log('update: ' + value);
                				},
                				value: props.attributes.count
                            }),
                     
                    	)
                     
                    ),
        			/*  
        			 * Here will be your block markup 
        			 */
                     el( InnerBlocks, {
    					__experimentalTemplateOptions: TEMPLATE_OPTIONS,
    					//__experimentalOnSelectTemplateOption: setTemplate,
/*
    					__experimentalOnSelectTemplateOption={ ( nextTemplate ) => {
    						if ( nextTemplate === undefined ) {
    							nextTemplate = getColumnsTemplate( DEFAULT_COLUMNS );
    						}
    
    						setTemplate( nextTemplate );
    						setForceUseTemplate( true );
    					} }
*/
    					//__experimentalAllowTemplateOptionSkip,
    					//allowedBlocks={ ALLOWED_BLOCKS } />
					
                        template: BLOCKS_TEMPLATE,
                        templateLock: false
                     })        			 
/*
			<div className={ classes }>
				<InnerBlocks
					__experimentalTemplateOptions={ TEMPLATE_OPTIONS }
					__experimentalOnSelectTemplateOption={ ( nextTemplate ) => {
						if ( nextTemplate === undefined ) {
							nextTemplate = getColumnsTemplate( DEFAULT_COLUMNS );
						}

						setTemplate( nextTemplate );
						setForceUseTemplate( true );
					} }
					__experimentalAllowTemplateOptionSkip
					template={ showTemplateSelector ? null : template }
					templateLock="all"
					allowedBlocks={ ALLOWED_BLOCKS } />
			</div>  
*/        			 
/*
                     el( InnerBlocks, {
                        template: BLOCKS_TEMPLATE,
                        templateLock: false
                     })
*/
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


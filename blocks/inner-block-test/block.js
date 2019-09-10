(function (blocks, editor, components, i18n, element, data) {
    const el = wp.element.createElement;
    const { registerBlockType } = blocks;
    const { InnerBlocks } = editor;
	const { RichText, InspectorControls } = editor;
	const { Fragment, useState } = element;
    const {
    	RangeControl,
    	Panel,
    	PanelBody
    } = components;
    const { times, dropRight } = lodash;
    const { dispatch, select, registry } = data;
     
    const BLOCKS_TEMPLATE = [
        [ 'core/image', {} ]
    ];
    
    const ALLOWED_BLOCKS = [ 'core/image' ];
    const ffffff = 1;

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
            var attributes = props.attributes;
            
            // load functions.
            var getColumnsTemplate = function(count) {
                return times( count, () => [ 'core/image' ] );
            }            
            
            var updateColumns = function(oldCount, newCount) {              
            	const { clientId } = props;
            	const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
            	const { getBlocks } = select( 'core/block-editor' );
            
            	let innerBlocks = getBlocks( clientId );
            
            	// Redistribute available width for existing inner blocks.
            	const isAddingColumn = newCount > oldCount;
            
            	if ( isAddingColumn ) {
            		innerBlocks = [
            			innerBlocks,
            			times( newCount - oldCount, () => {
            				return createBlock( 'core/column' );
            			} ),
            		];
            	} else {
            		// The removed column will be the last of the inner blocks.
            		innerBlocks = dropRight( innerBlocks, oldCount - newCount );
            	}
            
            	replaceInnerBlocks( clientId, innerBlocks, false );    
            }            
            
            const [ template, setTemplate ] = useState( getColumnsTemplate( attributes.count ) );            
            
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
                    				updateColumns(attributes.count, value);
                					props.setAttributes( { count: value } );
                				},
                				value: attributes.count
                            }),
                     
                    	)
                     
                    ),
        			/*  
        			 * Here will be your block markup 
        			 */
                     el( InnerBlocks, {
    					//__experimentalTemplateOptions: TEMPLATE_OPTIONS,
    					__experimentalOnSelectTemplateOption: setTemplate,
    					__experimentalOnSelectTemplateOption: ( nextTemplate ) => {
    						if ( nextTemplate === undefined ) {
    							nextTemplate = getColumnsTemplate( ffffff );
    						}
    
    						setTemplate( nextTemplate );
    						//setForceUseTemplate( true );
    					},
    					__experimentalAllowTemplateOptionSkip: true,
    					allowedBlocks: ALLOWED_BLOCKS,
					
                        template: template,
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
  window.wp.element,
  window.wp.data
)

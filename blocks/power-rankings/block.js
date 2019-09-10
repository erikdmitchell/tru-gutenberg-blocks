(function (blocks, editor, components, i18n, element, data) {
    const el = wp.element.createElement;
    const { registerBlockType, createBlock } = blocks;
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
        [ 'tru-blocks/power-ranking-rider', {} ]
    ];
    
    const ALLOWED_BLOCKS = [ 'tru-blocks/power-ranking-rider' ];
    const DEFAULT_BLOCK_COUNT = 1;

    registerBlockType( 'tru-blocks/power-rankings', {
        title: 'Power Rankings',
        icon: 'list-view',
        category: 'tru',
        attributes: {
        	riderCount: {
        		type: 'number',
        		default: 1
        	}
        },       
        edit: function( props ) {
            var attributes = props.attributes;
            
            // load functions.
            var getRiderTemplate = function(count) {
                return times( count, () => [ 'tru-blocks/power-ranking-rider' ] );
            }            
            
            var updateRiders = function(oldCount, newCount) {              
            	const { clientId } = props;
            	const { replaceInnerBlocks } = dispatch( 'core/block-editor' );
            	const { getBlocks } = select( 'core/block-editor' );
            
            	let innerBlocks = getBlocks( clientId );
            
            	// Redistribute available width for existing inner blocks.
            	const isAddingRider = newCount > oldCount;
            
            	if ( isAddingRider ) {              	
            		innerBlocks = [
            			...innerBlocks,
            			...times( newCount - oldCount, () => {
            				return createBlock( 'tru-blocks/power-ranking-rider' );
            			} ),
            		];
            	} else {
            		// The removed column will be the last of the inner blocks.
            		innerBlocks = dropRight( innerBlocks, oldCount - newCount );
            	}
            
            	replaceInnerBlocks( clientId, innerBlocks, false );    
            }            
            
            const [ template, setTemplate ] = useState( getRiderTemplate( attributes.riderCount ) );            
            
        	return (
        		el( Fragment, {},
                    el( InspectorControls, {},
                    	// Panel
                    	el( PanelBody, { title: 'Block Settings', initialOpen: true },
                    		el( RangeControl, {
                				label: 'Rider Count',
                				min: 1,
                				max: 10,
                				onChange: ( value ) => {
                    				updateRiders(attributes.riderCount, value);
                					props.setAttributes( { riderCount: value } );
                				},
                				value: attributes.riderCount
                            }),
                     
                    	)
                     
                    ),
        			/*  
        			 * Here will be your block markup 
        			 */
                     el( InnerBlocks, {
    					__experimentalOnSelectTemplateOption: setTemplate,
    					__experimentalOnSelectTemplateOption: ( nextTemplate ) => {
    						if ( nextTemplate === undefined ) {
    							nextTemplate = getRiderTemplate( DEFAULT_BLOCK_COUNT );
    						}
    
    						setTemplate( nextTemplate );
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

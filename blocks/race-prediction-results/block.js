(function (blocks, editor, components, i18n, element, data) {
    const el = wp.element.createElement;
    const { registerBlockType, createBlock } = blocks;
    const { InnerBlocks } = editor;
	const { RichText } = editor;
	const { useState } = element;
    const { times, dropRight } = lodash;
    const { dispatch, select, registry } = data;
    const TextControl = components.TextControl;
     
    const BLOCKS_TEMPLATE = [
        [ 'tru-blocks/predictions', {} ]
    ];
    
    const ALLOWED_BLOCKS = [ 'tru-blocks/predictions' ];
    const DEFAULT_BLOCK_COUNT = 1;

    registerBlockType( 'tru-blocks/race-prediction-results', {
        title: 'Race Prediction Results',
        icon: 'awards',
        category: 'tru',
        attributes: {
        	raceName: {
        		type: 'string',
        		selector: 'div.race-name'
        	}
        },       
        edit: function( props ) {
            var attributes = props.attributes;
            
            // load functions.
            var getRiderTemplate = function(count) {
                return times( count, () => [ 'tru-blocks/predictions' ] );
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
            				return createBlock( 'tru-blocks/predictions' );
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
        		el( 'div', { className: props.className },
        			/*  
        			 * Here will be your block markup 
        			 */
        			 el( 'div', { className: 'race-prediction-results-wrap' },
                        el( TextControl, {
                            className: 'race-name',
                            placeholder: i18n.__( 'Race Name' ),
                            value: attributes.raceName,
                            onChange: function( newRaceName ) {
                                props.setAttributes( { raceName: newRaceName } );
                            },
                            keepplaceholderonfocus: 'true',
                        } ),        			 
        			    el( 'ol', {},
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
        		)
            )
        },
        save: ( props ) => {
            var attributes = props.attributes;
            
            return ( 
                el( 'div', { className: props.className },
                    el( 'div', { className: 'race-prediction-results-wrap' },
                        el( 'div', { className: 'race-name' }, attributes.raceName ),
                        el( 'ol', {},
                            el( InnerBlocks.Content, {} )
                        )
                    )
                )
            )
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

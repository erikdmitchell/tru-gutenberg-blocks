function getColumnsTemplate(count) {
	let templates = [];

	for (let i = 0; i < count; i++) {
		templates.push([
			'core/image'
		]);
	}

	return templates;
}

(function (blocks, editor, components, i18n, element) {
    const el = wp.element.createElement;
    const { registerBlockType } = wp.blocks;
    const { InnerBlocks } = wp.editor;
	const { RichText, InspectorControls } = editor;
	const { Fragment, useState } = element;
    const {
    	RangeControl,
    	Panel,
    	PanelBody
    } = components;
    const { times } = lodash;
     
    const BLOCKS_TEMPLATE = [
        [ 'core/image', {} ],
        //[ 'core/paragraph', { placeholder: 'Image Details' } ],
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
                					props.setAttributes( { count: value } );
                					updateColumns(value);
                					console.log('update: ' + value);
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
    					//__experimentalAllowTemplateOptionSkip,
    					allowedBlocks: ALLOWED_BLOCKS,
					
                        template: template,
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

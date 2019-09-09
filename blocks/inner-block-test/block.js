(function (blocks, editor, components, i18n, element) {
    const el = wp.element.createElement;
    const { registerBlockType } = wp.blocks;
    const { InnerBlocks } = wp.editor;
	const { RichText, InspectorControls } = editor;
	const { Fragment } = element;
    const {
    	TextControl,
    	CheckboxControl,
    	RadioControl,
    	SelectControl,
    	TextareaControl,
    	ToggleControl,
    	RangeControl,
    	Panel,
    	PanelBody,
    	PanelRow
    } = components;
     
    const BLOCKS_TEMPLATE = [
        [ 'core/image', {} ],
        [ 'core/paragraph', { placeholder: 'Image Details' } ],
    ];

    registerBlockType( 'tru-blocks/template', {
        title: 'My Template Block',
        category: 'tru',
        attributes: {
        	list_id: {
        		type: 'string',
        		// default: '12345' // you can set a default value
        	},
        	doubleoptin: {
        		type: 'boolean' // for ToggleControl we need boolean type
        	}
        },       
        edit: function( props ) {
         
        	return (
        		el( Fragment, {},
        			el( InspectorControls, {},
        				el( PanelBody, { title: 'Form Settings', initialOpen: true },
         
        					/* Text Field */
        					el( PanelRow, {},
        						el( TextControl,
        							{
        								label: 'List ID',
        								onChange: ( value ) => {
        									props.setAttributes( { list_id: value } );
        								},
        								value: props.attributes.list_id
        							}
        						)
        					),
         
        					/* Toggle Field */
        					el( PanelRow, {},
        						el( ToggleControl,
        							{
        								label: 'Double Opt In',
        								onChange: ( value ) => {
        									props.setAttributes( { doubleoptin: value } );
        								},
        								checked: props.attributes.doubleoptin,
        							}
        						)
        					)
         
        				),
         
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
    
/*
                     el( InnerBlocks, {
                        template: BLOCKS_TEMPLATE,
                        templateLock: false
                     })
*/     	
/*
    registerBlockType('tru-blocks/power-ranking-rider', { 
        title: i18n.__('Power Ranking Rider'),
        description: i18n.__('A custom block for displaying a rider in a power ranking.'),
        icon: 'list-view',
        category: 'tru',
        attributes: { },
        edit: function (props) {
              var attributes = props.attributes;
                            	
              return []
            },
        save: function (props) {
            var attributes = props.attributes;

            return ();
        }
    })	
*/

})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)


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
 
	// 1st Panel – Form Settings
	el( PanelBody, { title: 'Form Settings', initialOpen: true },
 
		// Text field
		el( PanelRow, {},
			el( TextControl,
				{
					label: 'List ID',
					onChange: ( value ) => {
						props.setAttributes( { list_id: value } );
					},
					// type: 'number', // in case it is a number field
					value: props.attributes.list_id
				}
			)
		),
 
		// Toggle
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
 
	// 2nd Panel – Awesome Fields (closed by default, see initialOpen parameter)
	el( PanelBody, { title: 'Awesome fields', initialOpen: false },
 
		// Textarea field
		el( TextareaControl,
			{
				label: 'Textarea Control',
				onChange: ( value ) => {
					props.setAttributes( { textarea_attr: value } );
				},
				value: props.attributes.textarea_attr,
			}
		),
 
		// Checkbox field
		el( CheckboxControl,
			{
				label: 'Checkbox Control',
				onChange: ( value ) => {
					props.setAttributes( { chekbox_attr: value } );
				},
				checked: props.attributes.chekbox_attr,
			}
		),
 
		// Select dropdown field
		el( SelectControl,
			{
				label: 'Select Control',
				options : [
					{ label: 'Option 1', value: 'val_1' },
					{ label: 'Option 2', value: 'val_2' },
				],
				onChange: ( value ) => {
					props.setAttributes( { select_attr: value } );
				},
				value: props.attributes.select_attr
			}
		),
 
		// Radio buttons
		el( RadioControl,
			{
				label: 'Radio Control',
				//help: 'Some kind of description',
				options : [
					{ label: 'Option 1', value: 'value_1' },
					{ label: 'Option 2', value: 'value_2' },
				],
				onChange: ( value ) => {
					props.setAttributes( { radio_attr: value } );
				},
				selected: props.attributes.radio_attr
			}
		),
 
		// Range
		el( RangeControl,
			{
				label: 'Range Control',
				min: 2,
				max: 10,
				onChange: ( value ) => {
					props.setAttributes( { range_attr: value } );
				},
				value: props.attributes.range_attr
			}
		),
 
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


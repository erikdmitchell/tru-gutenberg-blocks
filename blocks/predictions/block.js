(function (blocks, editor, components, i18n, element) {
    var el = wp.element.createElement;
    var registerBlockType = wp.blocks.registerBlockType;
    const { RichText, InspectorControls } = editor;
    var MediaUpload = wp.editor.MediaUpload;
    var TextControl = components.TextControl;
    var IconButton = components.IconButton;
    
	const { Fragment, useState } = element;
    const {
    	RangeControl,
    	Panel,
    	PanelBody
    } = components;    
    
    registerBlockType('tru-blocks/predictions', { 
        title: i18n.__('Predictions'),
        description: i18n.__('A custom block for displaying rider predictions wrap up.'),
        icon: 'money',
        category: 'tru',
        attributes: { 
            riderName: {
                type: 'array',
                source: 'children',
                selector: 'div.predictions-name',
            },
            details: {
                type: 'array',
                source: 'children',
                selector: 'div.predictions-details'
            },
            mediaID: {
                type: 'number',
            },
            mediaURL: {
                type: 'string',
                source: 'attribute',
                selector: 'img',
                attribute: 'src',
            },
            lastWeek: {
                type: 'string',
                default: 'n/a'
            },			          
        },
        edit: function (props) {
            var attributes = props.attributes;
            
            var onSelectImage = function (media) {
                return props.setAttributes({
                    mediaURL: media.sizes.power_ranking.url,
                    mediaID: media.id
                })
            }  
            
            return (          
                el( Fragment, {},
                    el( InspectorControls, {},
                    	el( PanelBody, { title: 'Block Settings', initialOpen: true },
                            el( TextControl, {
								label: 'Last Week',
								onChange: ( value ) => {
									props.setAttributes( { lastWeek: value } );
								},
								value: attributes.lastWeek
							})
                    	) 
                    ),                    
                    el('li', { className: props.className },
                        el('div', { className: 'predictions' },                    
                            el( 'div', { className: attributes.mediaID ? 'predictions-image image-active' : 'predictions-image image-inactive' },
                                el( MediaUpload, {
                                    onSelect: onSelectImage,
                                    type: 'image',
                                    value: attributes.mediaID,
                                    render: function( obj ) {
                                        return el( IconButton, {
                                            className: attributes.mediaID ? 'image-button' : 'button button-large',
                                            onClick: obj.open
                                            },
                                            ! attributes.mediaID ? i18n.__( 'Upload Image' ) : el( 'img', { src: attributes.mediaURL } )
                                        );
                                    }
                                } )
                            ),
                            
                            el( 'div', { className: 'predictions-content' },
                                el( RichText, {
                                    tagName: 'p',
                                    className: 'predictions-name',
                                    inline: false,
                                    placeholder: i18n.__( 'Rider Name' ),
                                    value: attributes.riderName,
                                    onChange: function( newRiderName ) {
                                        props.setAttributes( { riderName: newRiderName } );
                                    },
                                    keepPlaceholderOnFocus: true,
                                } ),						
                                el( RichText, {
                                    tagName: 'p',
                                    inline: true,
                                    placeholder: i18n.__( 'Write the details here...' ),
                                    value: attributes.details,
                                    onChange: function( newDetails ) {
                                        props.setAttributes( { details: newDetails } );
                                    },
                                    keepPlaceholderOnFocus: true,
                                } ),
                            ),					
                        )
                    )
                )
            )
        },
        save: function (props) {
            var attributes = props.attributes;
            
            return (
                el( 'li', { className: props.className },
                    el('div', { className: 'predictions'  },
                        attributes.mediaURL &&
                        el( 'div', { className: 'predictions-image' },
                            el( 'img', { src: attributes.mediaURL } ),
                        ),
                        el( 'div', { className: 'predictions-content' },
                            el( 'div', { className: 'predictions-name' }, attributes.riderName ),
                                attributes.details && el( 'div', { className: 'predictions-details' }, attributes.details ),
                                //attributes.lastWeek && el( 'div', { className: 'predictions-last-week' }, attributes.lastWeek )
                        )
                    )
                )
            );
        }
    });	
})(
    window.wp.blocks,
    window.wp.editor,
    window.wp.components,
    window.wp.i18n,
    window.wp.element
)
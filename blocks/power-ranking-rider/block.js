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
    
    registerBlockType('tru-blocks/power-ranking-rider', { 
        title: i18n.__('Power Ranking Rider'),
        description: i18n.__('A custom block for displaying a rider in a power ranking.'),
        icon: 'businessman',
        category: 'tru',
        parent: ['tru-blocks/power-ranking-rider'],
        attributes: { 
            riderName: {
                type: 'array',
                source: 'children',
                selector: 'div.power-ranking-rider-name',
            },
            details: {
                type: 'array',
                source: 'children',
                selector: 'div.power-ranking-rider-details'
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
                        el('div', { className: 'power-ranking-rider' },                    
                            el( 'div', { className: attributes.mediaID ? 'power-ranking-rider-image image-active' : 'power-ranking-rider-image image-inactive' },
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
                            
                            el( 'div', { className: 'power-ranking-rider-content' },
                                el( RichText, {
                                    tagName: 'p',
                                    className: 'power-ranking-rider-name',
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
                                } )
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
                    el('div', { className: 'power-ranking-rider'  },
                        attributes.mediaURL &&
                        el( 'div', { className: 'power-ranking-rider-image' },
                            el( 'img', { src: attributes.mediaURL } ),
                        ),
                        el( 'div', { className: 'power-ranking-rider-content' },
                            el( 'div', { className: 'power-ranking-rider-name' }, attributes.riderName ),
                                attributes.details && el( 'div', { className: 'power-ranking-rider-details' }, attributes.details ),
                                //attributes.lastWeek && el( 'div', { className: 'power-ranking-rider-last-week' }, attributes.lastWeek )
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
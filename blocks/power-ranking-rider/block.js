(function (blocks, editor, components, i18n, element) {
	var el = wp.element.createElement;
  	var registerBlockType = wp.blocks.registerBlockType;
  	var RichText = wp.editor.RichText;
  	//var BlockControls = wp.editor.BlockControls;
  	//var AlignmentToolbar = wp.editor.AlignmentToolbar;
  	var MediaUpload = wp.editor.MediaUpload;
  	//var InspectorControls = wp.editor.InspectorControls;
  	var TextControl = components.TextControl;
  	var IconButton = components.IconButton;
  	
    registerBlockType('tru-blocks/power-ranking-rider', { 
        title: i18n.__('Power Ranking Rider'),
        description: i18n.__('A custom block for displaying a rider in a power ranking.'),
        icon: 'list-view',
        category: 'tru',
        attributes: { 
          riderName: {
				type: 'array',
				source: 'children',
				selector: 'p.power-ranking-rider-name',
          },
          details: {
            type: 'array',
            source: 'children',
            selector: 'p'
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
				type: 'array',
				source: 'children',
				selector: 'p.power-ranking-rider-last-week',
			},			          
        },
        edit: function (props) {
              var attributes = props.attributes;
        
              var onSelectImage = function (media) {
                return props.setAttributes({
                  mediaURL: media.url,
                  mediaID: media.id
                })
              }  
                    	
              return [
                el('div', { className: props.className },
                  el('div', { className: 'power-ranking-rider-image-wrap' },

					el( 'div', {
						className: attributes.mediaID ? 'nelio-testimonial-image image-active' : 'nelio-testimonial-image image-inactive',
						style: attributes.mediaID ? { backgroundImage: 'url(' + attributes.mediaURL + ')' } : {}
					},
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

					el( 'div', {
						className: 'power-ranking-rider-content' },
						el( RichText, {
							tagName: 'p',
							inline: true,
							placeholder: i18n.__( 'Write the testimonial here...' ),
							value: attributes.details,
							onChange: function( newDetails ) {
								props.setAttributes( { details: newDetails } );
							},
							keepPlaceholderOnFocus: true,
						} ),
						el( RichText, {
							tagName: 'p',
							className: 'power-ranking-rider-name',
							inline: false,
							placeholder: i18n.__( 'Name' ),
							value: attributes.riderName,
							onChange: function( newRiderName ) {
								props.setAttributes( { riderName: newRiderName } );
							},
							keepPlaceholderOnFocus: true,
						} ),
						el( RichText, {
							tagName: 'p',
							className: 'power-ranking-rider-last-week',
							inline: false,
							placeholder: i18n.__( 'Position' ),
							value: attributes.lastWeek,
							onChange: function( newLastWeek ) {
								props.setAttributes( { lastWeek: newLastWeek } );
							},
							keepPlaceholderOnFocus: true,
						} ),
					),					
                )
                )
              ]
            },
        save: function (props) {
            var attributes = props.attributes;
        
/*
            return (
              el('div', { className: props.className  },
              el('div', { className: 'power-ranking-rider'  },
                el('div', { className: 'power-ranking-rider-image' },
                  el('img', { src: attributes.mediaURL })
                ),
                el('div', { className: 'power-ranking-rider-content' },
                  el(RichText.Content, {
                    tagName: 'h3',
                    value: attributes.riderName
                  }),
                  el(RichText.Content, {
                    tagName: 'rider-details',
                    value: attributes.details
                  }),
                  el(RichText.Content, {
                    tagName: 'rider-last-week',
                    value: attributes.lastWeek
                  }),
          )
        )
      )
      )
*/

			return (
				el( 'div', { className: props.className },
					attributes.mediaURL &&
					el( 'div', { className: 'nelio-testimonial-image', style: { backgroundImage: 'url('+attributes.mediaURL+')' } },
						el( 'img', { src: attributes.mediaURL } ),
					),
					el( 'div', { className: 'power-ranking-rider-content' },
						attributes.details && el( 'p', {}, attributes.details ),
						el( 'p', { className: 'power-ranking-rider-name' }, attributes.riderName ),
						attributes.lastWeek && el( 'p', { className: 'power-ranking-rider-last-week' }, attributes.lastWeek )
					)
				)
			);
    }
  })	

})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)
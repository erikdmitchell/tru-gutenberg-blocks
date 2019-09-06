(function (blocks, editor, components, i18n, element) {
	var el = wp.element.createElement;
  	var registerBlockType = wp.blocks.registerBlockType;
  	var RichText = wp.editor.RichText;
  	//var BlockControls = wp.editor.BlockControls;
  	//var AlignmentToolbar = wp.editor.AlignmentToolbar;
  	var MediaUpload = wp.editor.MediaUpload;
  	//var InspectorControls = wp.editor.InspectorControls;
  	var TextControl = components.TextControl;
  	
    registerBlockType('tru-blocks/pr2', { 
        title: i18n.__('Power Ranking Rider'),
        description: i18n.__('A custom block for displaying a rider in a power ranking.'),
        icon: 'list-view',
        category: 'tru',
        attributes: { 
          riderName: {
            source: 'text',
            selector: 'h3'
          },
          details: {
            type: 'array',
            source: 'children',
            selector: 'rider-details'
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
            type: 'number',
            source: 'text',
            selector: 'rider-last-week'
          },
        },
        edit: function (props) {
              var attributes = props.attributes;
        
              var onSelectImage = function (media) {
                return props.setAttributes({
                  imageURL: media.url
                })
              }  
                    	
              return [
                el('div', { className: props.className },
                  el('div', { className: 'power-ranking-rider-image-wrap' },

					el( 'div', { className: 'power-ranking-rider-image' },
						el( MediaUpload, {
							onSelect: onSelectImage,
							allowedTypes: 'image',
							value: attributes.mediaID,
							render: function( obj ) {
								return el( components.Button, {
										className: attributes.mediaID ? 'image-button' : 'button button-large',
										onClick: obj.open
									},
									! attributes.mediaID ? i18n.__( 'Upload Image', 'gutenberg-examples' ) : el( 'img', { src: attributes.mediaURL } )
								);
							}
						} )
					),
                  el('div', { className: 'power-ranking-rider-content' },
                    el(RichText, {
                      key: 'editable',
                      tagName: 'h3',
                      placeholder: 'Rider Name',
                      keepPlaceholderOnFocus: true,
                      value: attributes.riderName,
                      onChange: function (newRiderName) {
                        props.setAttributes({ riderName: newRiderName })
                      }
                    }),
                    el(RichText, {
                      key: 'editable',
                      tagName: 'p',
                      placeholder: i18n.__('Write details...'),
                      keepPlaceholderOnFocus: true,
                      value: attributes.details,
                      onChange: function (newDetails) {
                        props.setAttributes({ details: newDetails })
                      }
                    }),
                    el(TextControl, {
                      //key: 'editable',
                      //tagName: 'p',
                      placeholder: i18n.__('Last week'),
                      //keepPlaceholderOnFocus: true,
                      value: attributes.lastWeek,
                      onChange: function (newLastWeek) {
                        props.setAttributes({ lastWeek: newLastWeek })
                      }
                    }),
                                        
                  )
                )
                )
              ]
            },
        save: function (props) {
            var attributes = props.attributes;
        
            return (
              el('div', { className: props.className  },
              el('div', { className: 'power-ranking-rider'  },
                el('div', { className: 'power-ranking-rider-image' },
                  el('img', { src: attributes.imageURL })
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
    }
  })	

})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)
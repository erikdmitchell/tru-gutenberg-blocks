/*
( function( blocks, editor, element ) {
    var el = element.createElement;
    var registerBlockType = blocks.registerBlockType;
    var InnerBlocks = editor.InnerBlocks;
    
    const blocksTemplate = [
        [ 'core/heading', { placeholder: 'Rider Name' } ],
        [ 'core/image', { placeholder: 'Rider Image' } ],
        [ 'core/paragraph', { placeholder: 'Content' } ],
    ];    
 
    blocks.registerBlockType( 'tru-blocks/power-rankings', {
        title: 'Power Rankings',
        icon: 'list-view',
        category: 'tru',
        edit: ( props ) => {
            return el( InnerBlocks, {
                template: blocksTemplate,
                templateLock: true
            });
        },
        save: ( props ) => {
            return el( InnerBlocks.Content, {} );
        },   
    } );
}(
    window.wp.blocks,
    window.wp.editor,
    window.wp.element
) );
*/

/*
  
  name (string)
  last week (int)  
  details (editor)
  image (image)
    
*/ 


(function (blocks, editor, components, i18n, element) {
	var el = wp.element.createElement;
  	var registerBlockType = wp.blocks.registerBlockType;
  	var RichText = wp.editor.RichText;
  	var BlockControls = wp.editor.BlockControls;
  	var AlignmentToolbar = wp.editor.AlignmentToolbar;
  	var MediaUpload = wp.editor.MediaUpload;
  	var InspectorControls = wp.editor.InspectorControls;
  	var TextControl = components.TextControl;
  	
    registerBlockType('tru-blocks/pr2', { 
        title: i18n.__('Power Ranking Rider'),
        description: i18n.__('A custom block for displaying a rider in a power ranking.'),
        icon: 'list-view',
        category: 'tru',
        attributes: { 
          title: {
            type: 'array',
            source: 'children',
            selector: 'h3'
          },
          bio: {
            type: 'array',
            source: 'children',
            selector: 'p'
          },
          mediaURL: {
            type: 'string',
            source: 'attribute',
            selector: 'img',
            attribute: 'src'
          },
          riderName: {
            type: 'text'
          }
        },
        edit: function (props) {
              var attributes = props.attributes
              var riderName = props.attributes.riderName
        
              var onSelectImage = function (media) {
                return props.setAttributes({
                  mediaURL: media.url
                })
              }
        
/*
              function onChangeAlignment (newAlignment) {
                props.setAttributes({ alignment: newAlignment })
              }
*/
        	
              return [
        
                el(BlockControls, { key: 'controls' }, // Display controls when the block is clicked on.
                  el('div', { className: 'components-toolbar' },
                    el(MediaUpload, {
                      onSelect: onSelectImage,
                      type: 'image',
                      render: function (obj) {
                        return el(components.Button, {
                          className: 'components-icon-button components-toolbar__control',
                          onClick: obj.open
                        },
                        // Add Dashicon for media upload button.
                        el('svg', { className: 'dashicon dashicons-edit', width: '20', height: '20' },
                          el('path', { d: 'M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z' })
                        ))
                      }
                    })
                  ),
/*
                  // Display alignment toolbar within block controls.
                  el(AlignmentToolbar, {
                    value: alignment,
                    onChange: onChangeAlignment
                  })
*/
                ),
                el(InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
                  el(components.PanelBody, {
                    title: i18n.__('Social Media Links'),
                    className: 'block-social-links',
                    initialOpen: true
                  },
                  el('p', {}, i18n.__('Add links to your social media profiles.')),
                  // Email address text field option.
                  el(TextControl, {
                    type: 'text',
                    label: i18n.__('Rider Nane'),
                    value: riderName,
                    onChange: function (newRiderName) {
                      props.setAttributes({ riderName: newRiderName })
                    }
                  }))
                ),
                el('div', { className: props.className },
                  el('div', {
                    className: attributes.mediaID ? 'organic-profile-image image-active' : 'organic-profile-image image-inactive',
                    style: attributes.mediaID ? { backgroundImage: 'url(' + attributes.mediaURL + ')' } : {}
                  },
                  el(MediaUpload, {
                    onSelect: onSelectImage,
                    type: 'image',
                    value: attributes.mediaID,
                    render: function (obj) {
                      return el(components.Button, {
                        className: attributes.mediaID ? 'image-button' : 'button button-large',
                        onClick: obj.open
                      },
                      !attributes.mediaID ? i18n.__('Upload Image') : el('img', { src: attributes.mediaURL })
                      )
                    }
                  })
                  ),
                  el('div', { className: 'organic-profile-content', style: { textAlign: alignment } },
                    el(RichText, {
                      key: 'editable',
                      tagName: 'h3',
                      placeholder: 'Profile Name',
                      keepPlaceholderOnFocus: true,
                      value: attributes.title,
                      onChange: function (newTitle) {
                        props.setAttributes({ title: newTitle })
                      }
                    }),
                    el(RichText, {
                      key: 'editable',
                      tagName: 'p',
                      placeholder: i18n.__('Write a brief bio...'),
                      keepPlaceholderOnFocus: true,
                      value: attributes.bio,
                      onChange: function (newBio) {
                        props.setAttributes({ bio: newBio })
                      }
                    }),
                    el('div', { className: 'organic-profile-social' },
                      attributes.riderName && el('a', {
                        className: 'social-link',
                        href: 'mailto:' + attributes.riderName,
                        target: '_blank'
                      },
                      el('i', { className: 'fa fa-envelope' })
                      )
                    )
                  )
                )        		
              ]
        save: function (props) {
            var attributes = props.attributes
            var riderName = props.attributes.riderName
        
            return (
              el('div', { className: props.className },
                el('div', { className: 'organic-profile-image', style: { backgroundImage: 'url(' + attributes.mediaURL + ')' } },
                  el('img', { src: attributes.mediaURL })
                ),
                el('div', { className: 'organic-profile-content', style: { textAlign: attributes.alignment } },
                  el(RichText.Content, {
                    tagName: 'h3',
                    value: attributes.title
                  }),
                  el(RichText.Content, {
                    tagName: 'p',
                    value: attributes.bio
                  }),
                  el('div', { className: 'organic-profile-social' },
                    attributes.riderName && el('a', {
                      className: 'social-link',
                      href: 'mailto:' + attributes.riderName,
                      target: '_blank'
                    },
                    el('i', { className: 'fa fa-envelope' })
                    )
                  )
                )
              )
            )
          }
        })
        },    
    } );  	

})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)
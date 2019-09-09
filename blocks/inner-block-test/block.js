(function (blocks, editor, components, i18n, element) {
	var el = wp.element.createElement;
  	var registerBlockType = wp.blocks.registerBlockType;
  	var RichText = wp.editor.RichText;
  	var MediaUpload = wp.editor.MediaUpload;
  	var TextControl = components.TextControl;
  	var IconButton = components.IconButton;
  	
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

})(
  window.wp.blocks,
  window.wp.editor,
  window.wp.components,
  window.wp.i18n,
  window.wp.element
)
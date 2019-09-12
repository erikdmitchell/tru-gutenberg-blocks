(function (blocks, components, i18n, element) {
    var el = element.createElement;
    
    const registerBlockType = blocks.registerBlockType;
    const TextControl = components.TextControl; 
    
    registerBlockType('tru-blocks/predictions', { 
        title: i18n.__('Predictions'),
        description: i18n.__('A custom block for displaying rider predictions.'),
        icon: 'money',
        category: 'tru',
        parent: ['tru-blocks/race-prediction-results'],
        attributes: { 
            riderName: {
                type: 'string',
                selector: 'div.rider-name'
            },
            place: {
                type: 'string',
                selector: 'div.rider-place'
            },
            points: {
                type: 'string',
                selector: 'div.points'
            },			          
        },
        edit: function (props) {
            var attributes = props.attributes;

            return (          
                el('li', { className: props.className },                                
                    el( TextControl, {
                        className: 'rider-name',
                        placeholder: i18n.__( 'Rider Name' ),
                        value: attributes.riderName,
                        onChange: function( newRiderName ) {
                            props.setAttributes( { riderName: newRiderName } );
                        },
                        keepplaceholderonfocus: 'true',
                    } ),
                    el( TextControl, {
                        className: 'rider-place',
                        placeholder: i18n.__( 'Rider Place' ),
                        value: attributes.place,
                        onChange: function( newPlace ) {
                            props.setAttributes( { place: newPlace } );
                        },
                        keepplaceholderonfocus: 'true',
                        type: 'number',
                    } ),
                    el( TextControl, {
                        className: 'points',
                        placeholder: i18n.__( 'Points' ),
                        value: attributes.points,
                        onChange: function( newPoints ) {
                            props.setAttributes( { points: newPoints } );
                        },
                        keepplaceholderonfocus: 'true',
                        type: 'number',
                    } ),					
                )   
            )
        },
        save: function (props) {
            var attributes = props.attributes;
           
            return (
                el('li', { className: props.className },
                    el( 'div', { className: 'rider-name' }, attributes.riderName ),
                    el( 'div', { className: 'rider-place' }, attributes.place ),
                    el( 'div', { className: 'points' }, attributes.points ),                            
                )               
            );
        }
    });	
})(
    window.wp.blocks,
    window.wp.components,
    window.wp.i18n,
    window.wp.element
)
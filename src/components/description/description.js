import React from 'react';

const Description = (props) => {
    const { image } = props;
    return (
        <React.Fragment>
            {
                image && Object.keys(image).length > 0 &&
                <div>
                    <p><strong>Title</strong>{image['title']}</p>
                    <p><strong>Description</strong>{image['description']}</p>
                    <p><strong>Cost</strong> {image.cost}</p>
                    <p><strong>ID #</strong>{image.id}</p>
                    <p><strong>Thumbnail File</strong> {image.thumbnail}</p>
                    <p><strong>Large Image File</strong> {image.image}</p>
                </div>
            }
        </React.Fragment>
    )
}

export default Description;
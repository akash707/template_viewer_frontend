import React from 'react';
import {API_BASE_URL} from '../../env.config';

const Thumbnail = (props) => {
    const { images, handleSelectedImage, selectedImage } = props;
    return (
        <React.Fragment>
            {
                images.length > 0 && images.map((image) => {
                    const activeClass = selectedImage && selectedImage.id === image.id ? 'active' : null;
                    return (
                        <a key={image.id} className={activeClass} onClick={() => handleSelectedImage(image)}>
                            <img src={`${API_BASE_URL}${image.thumbnail_image_url}`} alt="7111-m" width="145" height="121" />
                            <span>{image.id}</span>
                        </a>
                    )
                })
            }
        </React.Fragment>
    )
}

export default Thumbnail;
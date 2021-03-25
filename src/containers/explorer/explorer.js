import React, { Component } from 'react';
import { connect } from 'react-redux';
import './explorer.css';
import Description from '../../components/description/description';
import Thumbnail from '../../components/thumbnail/thumbnail';
import loader from '../../assets/images/loader.gif'
import * as actions from '../../store/actions/index'
import Error from './error';
import { API_BASE_URL, PER_PAGE_LIMIT } from '../../env.config';

class Explorer extends Component {

    state = {
        images: [],
        selectedImage: {}
    }

    componentDidMount() {
        this.props.fetchImages(1, PER_PAGE_LIMIT);
    }

    handleSelectedImage = (image) => {
        this.setState({
            selectedImage: { ...image }
        });
    }

    fetchNextPageData = () => {
        let { currentPage, nextPage } = this.props;
        if (nextPage > 0) {
            this.props.fetchImages(currentPage + 1, PER_PAGE_LIMIT);
        }
    }

    fetchPreviousPageData = () => {
        let { currentPage } = this.props;
        if (currentPage > 1) {
            this.props.fetchImages(currentPage - 1, PER_PAGE_LIMIT);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.nextPage !== this.props.nextPage) {
            const { images } = this.props;
            if (images && images.length > 0) {
                this.setState({
                    selectedImage: images[0]
                });
            }
        }
    }

    render() {
        const {
            loading,
            error,
            images,
            nextPage,
            currentPage
        } = this.props;
        const {
            selectedImage
        } = this.state;
        return (
            <React.Fragment>
                {loading && <img className="loader" src={loader} alt="Loader" />}
                {
                    !loading && (error.length > 0 ? (<Error errors={error} />) :
                        ((images && images.length > 0) && <div id="container">
                            <div id="main" role="main">
                                <div id="large">
                                    <div className="group">
                                        <img src={`${API_BASE_URL}${selectedImage.large_image_url}`} alt="large" width="430" height="360" />
                                        <div className="details">
                                            <Description image={selectedImage} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="thumbnails">
                                <div className="group">
                                    <Thumbnail images={images} handleSelectedImage={this.handleSelectedImage} selectedImage={selectedImage} />
                                </div>
                                <span onClick={this.fetchPreviousPageData} className={(currentPage === 1) ? 'previous disabled' : 'previous'} title="Previous">Previous</span>
                                <a onClick={this.fetchNextPageData} className={(nextPage === 0) ? 'next disabled' : 'next'} title="Next">Next</a>
                            </div>
                        </div>)
                    )
                }
                {
                    (error.length === 0) && (images.length === 0) && (
                        <div>
                            <h1>No data available for the preview</h1>
                        </div>
                    )
                }
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error,
        images: state.images,
        nextPage: state.nextPage,
        currentPage: state.currentPage,
        totalImages: state.totalImages
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchImages: (pageNo, limit) => dispatch(actions.fetchImages(pageNo, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
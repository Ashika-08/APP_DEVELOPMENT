import React from 'react';
import './carousel.css'; // Import the CSS specific to the carousel

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                '/pic/carousel14.png',
                '/pic/carousel15.png',
                '/pic/carousel11.png',
                '/pic/carousel12.png',
                '/pic/carousel13.png',
                '/pic/carousel10.png',
                '/pic/carousel9.png',
                // Add paths to more images here
            ],
            currentIndex: 0,
            autoSlideInterval: null
        };
    }

    componentDidMount() {
        this.startAutoSlide();
    }

    componentWillUnmount() {
        this.stopAutoSlide();
    }

    startAutoSlide = () => {
        this.autoSlideInterval = setInterval(this.nextSlide, 3000); // Change slide every 3 seconds
    }

    stopAutoSlide = () => {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    nextSlide = () => {
        this.setState(prevState => {
            const nextIndex = (prevState.currentIndex + 1) % prevState.images.length;
            return { currentIndex: nextIndex };
        });
    }

    render() {
        const { images, currentIndex } = this.state;

        return (
            <div className="carousel" onMouseEnter={this.stopAutoSlide} onMouseLeave={this.startAutoSlide}>
                <img src={images[currentIndex]} alt="carousel" className="carousel_image" />
            </div>
        );
    }
}

export default Carousel;

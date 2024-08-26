
const images = {
    wall: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660195756/hype/images/wall.jpg',
    back: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660195853/hype/images/back2.png',
    front: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660195803/hype/images/front.png',
    hype: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660195710/hype/images/hype.png',
    background: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660121391/hype/images/ScifiPage/background2.png',
    layerOne: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660121385/hype/images/ScifiPage/layerOne.png',
    layerTwo: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660121386/hype/images/ScifiPage/layerTwo.png',
    layerThree: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660121385/hype/images/ScifiPage/layerThree.png',
    layerFour: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660121385/hype/images/ScifiPage/layerFour.png',
    layerFive: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660121385/hype/images/ScifiPage/layerFive.png',
    backgroundM: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660210148/hype/images/MetallicPage/ldmyj7d4djnoetriqbou.png',
    layerOneM: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660210147/hype/images/MetallicPage/u6ddt0idyx55icbn1lyp.png',
    layerTwoM: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660210148/hype/images/MetallicPage/nhqc4mftnkpvhnvqo545.png',
    layerThreeM: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660210148/hype/images/MetallicPage/czmewyiv9tei51vuisar.png',
    layerFourM: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660210148/hype/images/MetallicPage/hfkuwevt1bwabuhlbszc.png',
    layerFiveM: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660210147/hype/images/MetallicPage/hsegsvga2cotpfssfggh.png',
    layerOneC: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660253340/hype/images/hx8ud4jrvnd6rytbffu7.png',
    layerTwoC: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660253335/hype/images/qsqf1pu54jjepzuo9v1s.png',
    layerThreeC: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660253328/hype/images/q2qcacsbqjrbyrvg2xb4.png',
    titleSciFi: 'https://res.cloudinary.com/drixmykpt/image/upload/v1661985496/hype/images/ScifiPage/sgv8yorwyoxum9dxlhkm.png',
    titleMetallic: 'https://res.cloudinary.com/drixmykpt/image/upload/v1662036601/hype/images/MetallicPage/dsninr01yvqbkkb81elr.png'
}


const data = {
    aboutPage: {
        offset: 1,
        imagesArray: [
            { image: images.wall, speed: 0.8 },
            { image: images.back, speed: 1 },
            { image: images.hype, speed: 1.2 },
            { image: images.front, speed: 1.4 },
        ]
    },
    sciFiPage:{
        offset: 2,
        imagesArray: [
            { image: images.background, speed: 0.8 },
            { image: images.layerOne, speed: 1 },
            { image: images.layerTwo, speed: 1.2 },
            { image: images.layerThree, speed: 1.4 },
            { image: images.layerFour, speed: 1.6 },
            { image: images.layerFive, speed: 1.8 },
        ]
    },
    metallicPage: {
        offset: 3,
        imagesArray: [
            { image: images.backgroundM, speed: 0.8 },
            { image: images.layerOneM, speed: 1 },
            { image: images.layerTwoM, speed: 1.2 },
            { image: images.layerThreeM, speed: 1.4 },
            { image: images.layerFourM, speed: 1.6 },
            { image: images.layerFiveM, speed: 2.4 },
        ]
    },
}

export { data, images }
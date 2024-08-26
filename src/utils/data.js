const black =  { color1: '#070707', realColor1: '#070707', name: 'BLACK', metalness1: 0.6 }
const blackMetal = { color1: '#070707', realColor1: '#070707', name: 'BLACK-METAL', metalness1: 0.9 }
const red = { color1: '#b31414', realColor1: '#570303', name: 'RED', metalness1: 0.1 }
const royal = { color1: '#1834d6', realColor1: '#050c30', name: 'ROYAL', metalness1: 0.5 }
const silver = { color1: '#aaaaaa', realColor1: '#ddd', name: 'SILVER', metalness1: 1 }
const white =  { color1: '#fff', realColor1: '#666', name: 'WHITE', metalness1: 0.1 }
const bronze = { color1: '#CD7F32', realColor1: '#ad6924', name: 'BRONZE', metalness1: 1 }
const grey = { color1: '#71787b', realColor1: '#111111', name: 'GREY', metalness1: 0.3 }
const burgundy =    { color1: '#6b0736', realColor1: '#2b081c', name: 'BURGUNDY', metalness1: 0.5 }
const gold = { color1: '#9C823A', realColor1: '#9C823A', name: 'GOLD', metalness1: 0.9 }
const blackGold =  { color1: '#070707', color2: '#9C823A', realColor1: '#070707', realColor2: '#9C823A',name: 'BLACK / GOLD', metalness1: 0.1, metalness2: 0.9 }
const redSilver = { color1: '#b31414', color2: '#aaaaaa', realColor1: '#570303', realColor2: '#cccccc', name: 'RED / SILVER', metalness1: 0.1, metalness2: 0.9 }
const royalNavy = { color1: '#1834d6', color2: '#10207a', realColor1: '#091559', realColor2: '#0c164e', name: 'ROYAL / NAVY', metalness1: 0.1, metalness2: 0.9 }
const blackSilver = { color1: '#444444', color2: '#aaaaaa', realColor1: '#1c1c1c', realColor2: '#cccccc', name: 'BLACK / SILVER', metalness1: 0.1, metalness2: 0.9  }
const blackMetalGold =  { color1: '#070707', color2: '#9C823A', realColor1: '#070707', realColor2: '#9C823A', name: 'METAL-BLACK / GOLD', metalness1: 0.9, metalness2: 0.9  }
const burgundySilver =  { color1: '#6b0736', color2: '#aaaaaa', realColor1: '#210211', realColor2: '#ddd', name: 'BURGUNDY / SILVER', metalness1: 0.1, metalness2: 1  }
const silverSilver =  { color1: '#aaaaaa', color2: '#aaaaaa', realColor1: '#ddd', realColor2: '#ddd', name: 'SILVER / SILVER', metalness1: 1, metalness2: 1  }
const whiteGold = { color1: '#ffffff', color2: '#9C823A', realColor1: '#666', realColor2: '#9C823A', name: 'WHITE / GOLD', metalness1: 0.1, metalness2: 0.9  }
const whiteSilver = { color1: '#ffffff', color2: '#aaaaaa', realColor1: '#666', realColor2: '#cccccc', name: 'WHITE / SILVER', metalness1: 0.1, metalness2: 0.9  }
const blackBronze = { color1: '#070707', color2: '#CD7F32', realColor1: '#070707', realColor2: '#694017', name: 'BLACK / BRONZE', metalness1: 0.1, metalness2: 0.9  }
const blackRubber = { color1: '#070707', realColor1: '#070707', name: 'BLACK', metalness1: 0.1 }
const redRubber = { color1: '#b31414', realColor1: '#570303', name: 'RED', metalness1: 0.1 }
const royalRubber = { color1: '#1834d6', realColor1: '#091559', name: 'ROYAL', metalness1: 0.1 }
const whiteRubber =  { color1: '#fff', realColor1: '#666', name: 'WHITE', metalness1: 0.1 }
const greyRubber = { color1: '#444444', realColor1: '#1c1c1c', name: 'GREY', metalness1: 0.1 }
const burgundyRubber =    { color1: '#6b0736', realColor1: '#210211', name: 'BURGUNDY', metalness1: 0.1 }
const whiteGoldCalc = { color1: '#ffffff', color2: '#9C823A', realColor1: '#ddd', realColor2: '#9C823A', name: 'WHITE / GOLD', metalness1: 0.1, metalness2: 0.9  }
const whiteSilverCalc = { color1: '#ffffff', color2: '#aaaaaa', realColor1: '#ddd', realColor2: '#cccccc', name: 'WHITE / SILVER', metalness1: 0.1, metalness2: 0.9  }
const whiteEraser = { color1: '#aaaaaa', realColor1: '#ddd', name: 'WHITE', metalness1: 1 }
const silverEraser = { color1: '#aaaaaa', realColor1: '#666', name: 'SILVER', metalness1: 1 }
const blackLogo = { color1: '#070707', material: 'LogoPlateDecalBlack', name: 'BLACK', metalness1: 1 }
const whiteLogo = { color1: '#ffffff', material: 'LogoPlateDecalWhite', name: 'WHITE', metalness1: 0.3 }
const goldLogo = { color1: '#9C823A', material: 'LogoPlateDecalGold', name: 'GOLD', metalness1: 1 }
const silverLogo = { color1: '#aaaaaa', material: 'LogoPlateDecalWhite', name: 'SILVER', metalness1: 1 }
const plasticTexture = { image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660642450/hype/images/lid-textures/chaw3nfrhdbiyuly56yk.jpg', name:'NO PATTERN', normalScale:0.1}
const sunburstTexture = { image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660642451/hype/images/lid-textures/xknabjmm1wgvn3adydk5.jpg', name:'SUNBURST', normalScale:0.6}
const stripeTexture = { image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660642450/hype/images/lid-textures/vvz0zyn1go0vajlqpxhp.jpg', name:'STRIPES', normalScale:1}
const sciFiTexture = { image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660642451/hype/images/lid-textures/sbyx28ynv1psiierquyv.jpg', name:'SCI-FI', normalScale:0.8}

export default [
    {
      name: 'Base',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138495/hype/images/LayoutImages/vkta40nfw3u3hv6pvuyv.png', 
      height: 100,
      colors: [ black,blackMetal,red,royal,silver, white, bronze, grey,burgundy,gold],
      displayName: 'Base'
    },
    {
      name: 'Lid',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138497/hype/images/LayoutImages/rablzm1pxvjsttjwhuki.png', 
      height: 100,
      colors: [black,blackMetal,red,royal,silver, white, bronze, grey, burgundy,gold],
      displayName: 'Lid'
    },
    {
      name: 'CalculatorTray',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138496/hype/images/LayoutImages/kstfalwqnhxnjxbcqqxj.png', 
      height: 100,
      colors: [ blackMetal,red,royal,silver, white, bronze, grey,burgundy,gold],
      displayName: 'Calculator Tray'
    },
    {
      name: 'Buttons',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138497/hype/images/LayoutImages/lrosgommntpw8dqyt7pn.png', 
      height: 100,
      colors: [ blackRubber,redRubber,royalRubber, whiteRubber, greyRubber,burgundyRubber],
      displayName: 'Buttons'
    },
    {
      name: 'TopPlate',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138498/hype/images/LayoutImages/jxceqgua9jtg4vbnz8xg.png',
      height: 100,
      colors: [ black,blackMetal,red,royal,silver, white, bronze, grey,burgundy,gold],
      displayName: 'Top Plate'
    },
    {
      name: 'Tray',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138498/hype/images/LayoutImages/ohd5jp5xxghcav1vxdos.png',
      height: 100,
      colors: [ black,blackMetal,red,royal,silver, white, bronze, grey,burgundy,gold],
      displayName: 'Tray'
    },
    {
      name: 'Sharpener',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138499/hype/images/LayoutImages/qki5rljomeynt51ert95.png', 
      height: 100,
      colors: [blackGold, redSilver,royalNavy,blackSilver,blackMetalGold,burgundySilver, silverSilver,whiteGold,whiteSilver,blackBronze],
      displayName: 'Sharpener'
    },
    {
      name: 'Calculator',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138495/hype/images/LayoutImages/mhra4qkdgodompbyrfn3.png', 
      height: 100,
      colors: [blackGold, redSilver,royalNavy,blackSilver,blackMetalGold,burgundySilver, silverSilver,whiteGoldCalc,whiteSilverCalc,blackBronze],
      displayName: 'Calculator'
    },
    {
      name: 'ClaspAndHinges',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138495/hype/images/LayoutImages/owbc3fwbwfqwcpjxf0h1.png',
      height: 100,
      colors: [ black,blackMetal,red,royal,silver, white, bronze, grey,burgundy,gold],
      displayName: 'Clasp and Hinges'
    },
    {
      name: 'Rubber',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138498/hype/images/LayoutImages/l41xczzffznrm604sohs.png',
      height: 100,
      colors: [ black,red,royal,silverEraser, whiteEraser, bronze, grey,burgundy,gold],
      displayName: 'Rubber'
    },
    {
      name: 'SharpenerClips',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138498/hype/images/LayoutImages/zlsmkv9iruskjttt2qvh.png',
      height: 100,
      colors: [ black,red,royal,silver, white, bronze, grey,burgundy,gold],
      displayName: 'Sharpener Clips'
    },
    {
      name: 'LogoPlate',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138497/hype/images/LayoutImages/tsvhfyagtnppign44orx.png',
      height: 100,
      colors: [ black,red,royal,silver, white, bronze, grey,burgundy,gold],
      displayName: 'Logo Plate'
    },
    {
      name: 'Pencils',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138497/hype/images/LayoutImages/sl5xqp7dkruttpv8sufv.png',
      height: 100,
      colors: [ blackGold, redSilver,royalNavy,blackSilver,blackMetalGold,burgundySilver, silverSilver,whiteGoldCalc,whiteSilverCalc,blackBronze],
      displayName: 'Pencils'
    },
    {
      name: 'Logo',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138497/hype/images/LayoutImages/bnfejortgmunotl6l2jj.png',
      height: 100,
      colors: [ whiteLogo, blackLogo, goldLogo, silverLogo ],
      displayName: 'Logo'
    },
    {
      name: 'LidRim',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138986/hype/images/LayoutImages/wwsf8mrbugpa99acwe1s.png',
      height: 100,
      colors: [ black,blackMetal,red,royal,silver, white, bronze, grey,burgundy,gold ],
      displayName: 'Lid Rim'
    },
    {
      name: 'LidTexture',
      image: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660138497/hype/images/LayoutImages/rablzm1pxvjsttjwhuki.png',
      height: 100,
      colors: [ sciFiTexture, plasticTexture, stripeTexture, sunburstTexture ],
      displayName: 'Lid Texture'
    }                                                    
  ]

const dataInfoMenu = [
  { 
    name: 'SINGLE CLICK', 
    height: 100, 
    suffix: "One", 
    text: 'Single click on the part of the model you wish to change. Select the colour from the menu.',
    gif: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660139446/hype/images/gifs/xvndnailusoodpcunsnv.gif'
  },{
    name: 'DOUBLE CLICK', 
    height: 100, 
    suffix: 'Two',
    text: 'Highlighted buttons can be double clicked to show their action.  Double click on any open parts to return them to the closed position',
    gif: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660139468/hype/images/gifs/zc7spqyaxdvlzsuiofww.gif'
  },{
    name: 'MENU', 
    height: 100, 
    suffix: 'Three',
    text: 'Click the bottom tab to reveal the menu. Click on the part you would like to change. Clicking on the calculator, rubber or sharpener from the menu will highlight the object, press back to return',
    gif: 'https://res.cloudinary.com/drixmykpt/image/upload/v1660139516/hype/images/gifs/to8srdfszlyujy7zvxow.gif'
  }
]

export { dataInfoMenu }
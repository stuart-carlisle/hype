'use client'
import { proxy } from 'valtio'

export default
    proxy({
        animating:false,
        width: 1200,
        darkMode: true,
        scrollPosition: 0,
        current: null,
        zoom: false,
        lidZoom: false,
        trayOpen: false,
        rubberOpen: false,
        calculatorReleased: false,
        sharpenerLifted: false,
        lidOpen: false,
        highlightAction: null,
        pencilHighlight: false,
        isBlue:false,
        items: typeof window !== "undefined" && JSON.parse(localStorage.getItem('state'))||{
            Base: {
                colorName: 'BLACK',
                Main:{
                    part: 'Base',
                    color: "#070707",
                    metalness: 0.1,
                    displayColor: "#070707",
                    displayName: 'Base'
                }
            },
            Tray: {
                colorName: 'GOLD',
                Main:{
                    part: 'Tray',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#9C823A",
                    displayName: 'Tray'
                }
            },
            Lid: {
                colorName: 'BLACK / GOLD',
                Main:{
                    part: 'Lid',
                    color: "#070707",
                    metalness: 0.1,
                    displayColor: "#070707",
                    displayName: 'Lid'
                },
            },
            Calculator: {
                colorName: 'BLACK / GOLD',
                Main:{
                    part: 'CalculatorBody',
                    color: "#070707",
                    metalness: 0.1,
                    displayColor: "#070707",
                    displayName: 'Calculator'
                },
                Secondary:{
                    part: 'CalculatorTrimAndButtons',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#9C823A",
                },
            },
            CalculatorTray: {
                colorName: 'GOLD',
                Main:{
                    part: 'CalculatorTray',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#9C823A",
                    displayName: 'Calc Tray'
                }
            },
            Buttons: {
                colorName: 'BLACK - RUBBER',
                Main:{
                    part: 'Button1',
                    color: "#070707",
                    metalness: 0.1,
                    displayColor: "#070707",
                    displayName: 'Buttons'
                }
            },
            Button1: {
                id: null,
            },
            Button2: {
                id: null,
            },
            Button3: {
                id: null,
            },
            Button4: {
                id: null,
            },
            LogoPlate: {
                colorName: 'GOLD',
                Main:{
                    part: 'Rubber',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#9C823A",
                    displayName: 'Logo Plate'
                },
            },
            Rubber: {
                colorName: 'GOLD',
                Main:{
                    part: 'Rubber',
                    color: "#9C823A",
                    metalness: 0.6,
                    displayColor: "#9C823A",
                    displayName: 'Rubber'
                },
            },
            Sharpener:{
                colorName: 'BLACK / GOLD',
                Main:{
                    part: 'Sharpener',
                    color: "#070707",
                    metalness: 0.1,
                    displayColor: "#070707",
                    displayName: 'Sharpener'
                },
                Secondary:{
                    part: 'SharpenerBlade',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#9C823A",
                }
            },
            SharpenerClips:{
                colorName: 'GOLD',
                Main:{
                    part: 'SharpenerClips',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#9C823A",
                    displayName: 'Clips'
                }
            },
            ClaspAndHinges: {
                colorName: 'GOLD',
                Main:{
                    part: 'ClaspAndHinges',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#9C823A",
                    displayName: 'Clasp'
                },
            },
            TopPlate: {
                colorName: 'BLACK',
                Main:{
                    part: 'TopPlate',
                    color: "#070707",
                    metalness: 0.1,
                    displayColor: "#070707",
                    displayName: 'Top Plate'
                }
            },
            Pencils: {
                colorName: 'BLACK / GOLD',
                Main:{
                    part: 'PencilBody',
                    color: "#070707",
                    metalness: 0.2,
                    displayColor: "#070707",
                    displayName: 'Pencils'
                },
                Secondary:{
                    part: 'PencilTrim',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#9C823A",
                },
            },
            Logo: {
                colorName: 'BLACK',
                Main:{
                    materialName: 'LogoPlateDecalBlack',
                    metalness: 0.9,
                    color: "#070707",
                    displayColor: "#070707",
                    displayName: 'Logo'
                }
            },
            LidRim: {
                colorName: 'GOLD',
                Main:{
                    part: 'LidRim',
                    color: "#9C823A",
                    metalness: 0.9,
                    displayColor: "#070707",
                    displayName: 'Lid Rim'
                },
            },
            LidTexture:{
                colorName: 'NO PATTERN',
                Main:{
                    part: 'LidTexture',
                    textureName: 'NO PATTERN',
                    image: 'Textures/plastic-image.png',
                    normalScale: 0.1,
                    displayName: 'Lid Texture'
                }
            }
        },
    })
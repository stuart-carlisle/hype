'use client'
import { proxy } from 'valtio'

export default
    proxy({
        width: 1200,
        isMobile: false,
    })
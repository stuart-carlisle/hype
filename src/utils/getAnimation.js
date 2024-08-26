'use client'
import * as THREE from 'three'

const getAnimation = ({clipName, mixers, clips, objectRef}) => {
 
  const findClipIndex = (name) => { //finds the index of the clip in the clips array - not case sensitive
    return clips.findIndex((clip)=>{
      return clip.name.toLowerCase() === name.toLowerCase()
    })
  }
  
  const actionIndex = findClipIndex(clipName)

  let result
  if(actionIndex===-1){
    result = null
  }else{
    const action = mixers[actionIndex].clipAction(clips[actionIndex], objectRef) //create the action
    
    action.clampWhenFinished = true //ensures the position is not reset after animation 
    action.setLoop(THREE.LoopOnce) //plays once
  
    const duration = clips[actionIndex].duration*1000 //duration of clip in ms
  
    result = {action,duration}
  }
  return result
}

const checkActions = (clip, mixer, index, refs) => {
  let action = null
  if(!!refs.tray.current){
    action = (clip.name.toLowerCase()==='buttonaction1')&&{ action: mixer.clipAction(clip, refs.button1.current), actionName: clip.name, duration: clip.duration }
    action = (clip.name.toLowerCase()==='buttonaction2')&&{ action: mixer.clipAction(clip, refs.button2.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='buttonaction3')&&{ action: mixer.clipAction(clip, refs.button3.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='buttonaction4')&&{ action: mixer.clipAction(clip, refs.button4.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='logoaction')&&{ action: mixer.clipAction(clip, refs.logoPlate.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='trayopenaction'||clip.name.toLowerCase()==='traycloseaction')&&{ action: mixer.clipAction(clip, refs.tray.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='rubberopenaction'||clip.name.toLowerCase()==='rubbercloseaction')&&{ action: mixer.clipAction(clip, refs.rubberTray.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='calculatorreleaseaction'||clip.name.toLowerCase()==='calculatoraction = action'||clip.name.toLowerCase()==='calculatorhighlight')&&{ action: mixer.clipAction(clip, refs.calculator.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='sharpenerlaction = taction'||clip.name.toLowerCase()==='sharpenerfallaction')&&{ action: mixer.clipAction(clip, refs.sharpenerBase.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='sharpenerhighlight')&&{ action: mixer.clipAction(clip, refs.sharpener.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='rubberhighlight')&&{ action: mixer.clipAction(clip,refs.rubber.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='lidopenaction'||clip.name.toLowerCase()==='lidcloseaction')&&{ action: mixer.clipAction(clip, refs.lid.current), actionName: clip.name, duration: clip.duration}
    action = (clip.name.toLowerCase()==='clipopenaction'||clip.name.toLowerCase()==='clipcloseaction')&&{ action: mixer.clipAction(clip, refs.clasp.current), actionName: clip.name, duration: clip.duration}
  }
  return action
}

export { getAnimation as default, checkActions }
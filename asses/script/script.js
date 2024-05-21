let _menu = document.getElementById('_menu')
let _musicList = document.getElementById('_musicList')
let _box = document.getElementById('_box')
let _main  = document.getElementsByTagName('main')[0]

//part1: menu setting

_menu.addEventListener('click',()=>{
    _musicList.style.transition = 'all 0.5s'
    _musicList.style.right = 0   
    })


 _main.addEventListener('click',(e)=>{  
   if((e.target.getAttribute('class')) == '_description'){
    _musicList.style.right = '-100%'    
  }
 })


 window.addEventListener('resize',()=>{   
      if(window.innerWidth >992){
         _musicList.style.right = 0       
     }else{
        _musicList.style.right = '-100%' 
     }  
 }) 

//part2: music player
let _img1 = document.querySelectorAll('#_musicList>._list>div>img')
let _img2 = document.querySelectorAll('#_img img') 
let flag1 = 0
let flag2 = 4
let flag3 = 4
let _h2 = document.querySelectorAll('#_music h2')
let _audio =  document.querySelectorAll('main audio')
let flag4 = 0
let _play = document.getElementById('_play')
let _pause = document.getElementById('_pause')
let _backward = document.getElementById('_backward')
let _forward = document.getElementById('_forward')
let _currentTime = document.getElementById('_currentTime')
let _totalTime = document.getElementById('_totalTime')
let _circle = document.getElementById('_circle')
let _line = document.getElementById('_line')
let _line2 = document.getElementById('_line2')
let _duration = 0
let x = 0
let _percent = 0 
_img2.forEach(element => {
   element.setAttribute('data-num2',flag2)
   flag2-- 
})

_h2.forEach(val=>{
   val.setAttribute('data-num3',flag3)
   flag3--
})
_audio.forEach(element => {
  element.setAttribute('data-num4',flag4) 
  element.setAttribute('data-play','off')  
  element.setAttribute('data-pause','false')  
  flag4++      
   })


_img1.forEach(element => {   
   element.setAttribute('data-num1',flag1)
   flag1++
   element.addEventListener('click',(e)=>{
      //styleing start
      _reset()
      element.style.border = '3px solid  #75D1FF'
       element.nextElementSibling.style.display = 'block'
       element.nextElementSibling.nextElementSibling.style.display = 'block'
      _img2.forEach(val => {
         if( (val.getAttribute('data-num2')) == (element.getAttribute('data-num1')) ){
            val.style.transform = 'scale(1)'

         }else{
            val.style.transform = 'scale(0)'
         }
      })
      _h2.forEach(val => {
         val.style.display = 'none'
         if( (val.getAttribute('data-num3')) == (element.getAttribute('data-num1')) ){
            val.style.display = 'block'
         }         
        })
       //styleing end  


       //music player start codeing
        _audio.forEach(val => {    
        val.setAttribute('data-pause','false') 
        if(val.getAttribute('data-num4') == (element.getAttribute('data-num1'))){
         val.play()        
         val.setAttribute('data-play','on')    
         }else{
         val.pause()
         val.setAttribute('data-play','off') 
        }
       })
   })
})


_pause.addEventListener('click',()=>{
   _audio.forEach(val =>{
      if(val.getAttribute('data-play') == 'on'){
            val.pause()
            val.setAttribute('data-play','off')
            val.setAttribute('data-pause','true')            
      }
   })
})

_play.addEventListener('click',()=>{
   _audio.forEach(val =>{
      if(val.getAttribute('data-pause') == 'true'){
            val.play()
            val.setAttribute('data-play','on')            
      }else{
         val.setAttribute('data-play','off')       
      }      
   })
})

_forward.addEventListener('click',()=>{  
      for (let index = 0; index <_audio.length; index++) {      
      if((_audio[index].getAttribute('data-play') == 'on') && index != (_audio.length) -1 ){  
         _reset()      
          _audio[index].pause() 
          _audio[index+1].play()               
          _audio[index].setAttribute('data-play','off')  
          _audio[index+1].setAttribute('data-play','on')  
          _img1.forEach(val=>{
            if(val.getAttribute('data-num1') == _audio[index+1].getAttribute('data-num4')){
                val.style.border =  '3px solid  #75D1FF' 
                val.nextElementSibling.style.display = 'block'
                val.nextElementSibling.nextElementSibling.style.display = 'block'                         
            }             
          }) 
          _h2.forEach(val => {
            val.style.display = 'none'
            if( (val.getAttribute('data-num3')) == (_audio[index+1].getAttribute('data-num4')) ){
               val.style.display = 'block'
            }         
           })
          return
      }   
   }
})

_backward.addEventListener('click',()=>{       
   for(let index = 0; index <_audio.length; index++) {      
      if((_audio[index].getAttribute('data-play') == 'on') &&  index != 0){   
         _reset()      
          _audio[index].pause() 
          _audio[index-1].play()               
          _audio[index].setAttribute('data-play','off')  
          _audio[index-1].setAttribute('data-play','on')   
         _img1.forEach(val=>{
             if(val.getAttribute('data-num1') == _audio[index-1].getAttribute('data-num4')){
                 val.style.border =  '3px solid  #75D1FF'     
                 val.nextElementSibling.style.display = 'block'
                 val.nextElementSibling.nextElementSibling.style.display = 'block'                     
             }             
           }) 
           _h2.forEach(val => {
            val.style.display = 'none'
            if( (val.getAttribute('data-num3')) == (_audio[index-1].getAttribute('data-num4')) ){
               val.style.display = 'block'
            }         
           })
         return
      }   
   }
})

function _reset() {  
   _img1.forEach(element => {
      element.style.border = 'none'
       element.nextElementSibling.style.display = 'none'
       element.nextElementSibling.nextElementSibling.style.display = 'none'
   })
}

_line.addEventListener('mousemove',(e)=>{
   _line.addEventListener('click',()=>{
       _x = ((e.offsetX) * 100 ) / (_line.clientWidth)      
      _circle.style.left = _x + '%'
      _line2.style.width = _x + '%'
       _audio.forEach(val =>{
          if(val.getAttribute('data-play') == 'on'){
             val.currentTime = (_x * val.duration) / 100
             
          }         
       })
   })   
})

   const _myFunc = setInterval(() => {
     _audio.forEach(element => {       
      if(element.getAttribute('data-play') == 'on' ){
      let _t = Math.floor(+element.getAttribute('data-duration')) 
      let _tShow1 = Math.floor(_t / 60)
      let _tshow2 =_t -  (_tShow1 * 60)       
      _totalTime.innerText = _tShow1 + ' ' + ': ' + _tshow2  
      
      //line tranform whit the music
       let _t1 = element.currentTime
       _percent = (_t1 * 100) /_t
       _line2.style.width = _percent + '%'
       _circle.style.left = _percent + '%'
      }  
      //when music end
      element.addEventListener('ended',()=>{ 
       let _next = element.parentElement.nextElementSibling.children[0]       
      element.setAttribute('data-play','off')
      _next.play()
      _next.setAttribute('data-play','on')
      _reset() 
      //when music end styling img
      _img1.forEach(val=>{
         if(val.getAttribute('data-num1') == _next.getAttribute('data-num4')){
            val.style.border = '3px solid  #75D1FF'
            val.nextElementSibling.style.display = 'block'
            val.nextElementSibling.nextElementSibling.style.display = 'block'
         }        
      }) 
      _h2.forEach(val => {
         val.style.display = 'none'
         if( (val.getAttribute('data-num3')) == (_next.getAttribute('data-num4')) ){
            val.style.display = 'block'
         }         
        })
      })     
       })
       return
 }, 0);




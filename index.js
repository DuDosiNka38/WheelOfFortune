const sectors = [
    { label: 'Stack' },
    {  label: '10' },
    {  label: '200' },


  ]
  

  const rand = (m, M) => Math.random() * (M - m) + m
const ctx =  document.querySelector('#wheel').getContext('2d');
const spinEl = document.querySelector('#spin')
const AddOption = document.querySelector('#option')
const radius =  ctx.canvas.width / 2;
const Allwheel = 2 * Math.PI;


const friction  = 0.998


const getIndex = () => Math.floor(sectors.length - ( ang  / Allwheel) * sectors.length) % sectors.length

let angVel = 0;
let ang = 0;


function drawSector(sector, i) {
  const oneZone = 2 * Math.PI / sectors.length;
    const ang = oneZone * i
    ctx.save()
    ctx.beginPath()

    i % 2 === 0 ? 
    ctx.fillStyle = 'rgb(182, 29, 29)' :
    ctx.fillStyle = 'rgb(88, 68, 68)'
    ctx.moveTo(radius , radius )
    ctx.arc(radius , radius , radius , ang, ang + oneZone)
    ctx.lineTo(radius , radius )
    ctx.fill()

    ctx.translate(radius , radius )
    ctx.rotate(ang + oneZone / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff' 
    ctx.font = 'bold 30px sans-serif'
    ctx.fillText(sector.label,radius - 10, 10)
    ctx.restore()
  }

  function rotate() {
    const sector = sectors[getIndex()]
    ctx.canvas.style.transform = `rotate(${ang - Math.PI / 2}rad)`
    spinEl.textContent = !angVel ? 'SPIN' : sector.label
    if(getIndex() % 2 === 0){
    spinEl.style.background = 'rgb(182, 29, 29)'
    }else{
      spinEl.style.background = 'rgb(88, 68, 68)'
    }
}

function priviosPrize(){
  const sector = sectors[getIndex()]
  document.getElementsByClassName("privious")[0].innerHTML = "<h4>Privious prize :" + sector.label + "</h4>";
console.log( "Privious prize :" + sector.label)
}

function frame() {
    if (!angVel) return
    angVel *= friction 
    if (angVel < 0.002){
      angVel = 0
      priviosPrize()
    } 
    ang += angVel 
    ang %= Allwheel 
    rotate()
  }


  function engine() {
    frame()
    requestAnimationFrame(engine)
  }


function drawOptions(){
for(let i =0; i < sectors.length; i++){
  document.getElementById("option").innerHTML += "<div class= 'sector'> <span>" + sectors[i].label + 
  "</span> <button value='"+i+"' onclick='clearOption(value)' class='delete'>Delete</button> </div>";
console.log(sectors[i].label)
}
}


function clearOptions(){
  document.getElementById("option").innerHTML = "";
}

function clearOption(value){
  let a = value
  if(sectors.length  != 1){
  sectors.splice(a, 1)
  clearOptions()
  init()
  }else{
    alert("You must have at least one(")
  }
}

function Add(){
  let option =  document.querySelector('#option_input').value 
  console.log("Working")
  console.log(option)
     sectors.push({label: option})
     document.querySelector('#option_input').value = ""
     clearOptions()
     init()

}

function init() {
  
  sectors.forEach(drawSector)
  drawOptions()
  rotate() 
  engine() 
  spinEl.addEventListener('click', () => {
    if (!angVel) angVel = rand(0.25, 0.45)
  })

}
init()
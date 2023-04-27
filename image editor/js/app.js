// selectors
let btns = document.querySelectorAll(".filter-btn");
let title = document.querySelector(".effect .title");
let percent = document.querySelector(".percent p");
let bar = document.querySelector(".range input");
let uploadBtn = document.querySelector(".upload-btn");
let fileInput = document.querySelector(".upload-btn input");
let img = document.querySelector(".img-holder img");
let container = document.querySelector(".container");
let rotateBtns = document.querySelectorAll(".rotation");
let horizontalBtn = document.getElementById("horizontal");
let verticalBtn = document.getElementById("vertical");
let resetBtn = document.querySelector(".reset button");
let downloadBtn = document.querySelector(".save");

// filter percents 
let brightness = 100,
    saturation = 100,
    inversion = 0,
    grayscale = 0;

let rotate = 0;
let flipH = 1;
let flipV = 1;

percent.textContent = `${brightness}%`;
// event listeners
btns.forEach(btn => {

    btn.addEventListener(
        "click",
        (e)=> {

            let clickedFilter = e.target;
            let barID = bar.dataset.id;
            barID = e.target.textContent;

            bar.value = barID == 'brightness' ? brightness : barID == 'saturation' ? saturation : barID == 'inversion' ? inversion : grayscale;

            btns.forEach(btn=> {
                btn.classList.remove("active");
            })

            btnSelection(clickedFilter);

            changeName(filterName = clickedFilter.textContent);

            percent.textContent = changeFilterAttr(filterName);

            
            
        }
    )


})

bar.addEventListener(
    "change",
    (e)=> {

        percent.textContent = `${e.target.value}%`;

        switch(title.textContent) {

            case "brightness":
                brightness = e.target.value;
                applyFilter();
            break;

            case "saturation":
                saturation = e.target.value;
                applyFilter();
            break;

            case "inversion":
                inversion = e.target.value;
                applyFilter();
            break;

            case "grayscale":
                grayscale = e.target.value;
                applyFilter();
            break;
        }
    }
)
uploadBtn.addEventListener("click", ()=> {

    fileInput.click();

})

// upload image
fileInput.addEventListener("change", (e)=> {

    // console.log(fileInput.files[0]);

    // get real [encrypted] image source
    let file = URL.createObjectURL(fileInput.files[0]);

    img.src = file;

    container.classList.remove("disable");

})

// image rotate
rotateBtns.forEach(btn => {

    btn.addEventListener("click", (e)=> {

        e.target.id == 'right' ? applyRotate(true) : applyRotate(false);
    })
})

// flip image
horizontalBtn.addEventListener("click", flipHorizontal);
verticalBtn.addEventListener("click", flipVertical);

// download

downloadBtn.addEventListener("click", ()=> {

    draw();
})

// reset 
resetBtn.addEventListener("click", reset);
// functions
function btnSelection(clicked) {

    clicked.classList.add("active")
}
function changeName(filterName) {

    title.textContent = filterName;
}
function changeFilterAttr(filterName) {

    switch(filterName) {

        case "brightness":
            bar.dataset.id = 'brightness';
            return percent.textContent = `${brightness}%`
        break

        case "saturation":
            bar.dataset.id = 'saturation';
            return percent.textContent = `${saturation}%`
        break

        case "inversion":
            bar.dataset.id = 'inversion';
            return percent.textContent = `${inversion}%`
        break

        case "grayscale":
            bar.dataset.id = 'grayscale';
            return percent.textContent = `${grayscale}%`
        break
    }
}

function applyFilter() {

    img.style.filter = `brightness(${brightness / 100}) saturate(${saturation / 100}) invert(${inversion / 100})grayscale(${grayscale / 100})`;

}

function applyRotate(positive) {

    positive ? rotate+= 90 : rotate -= 90;

    img.style.transform = `rotate(${rotate}deg)`

}  

function flipHorizontal() {

    flipH = flipH == 1 ? -1 : 1;

    console.log(`flip horizontal value: ${flipH}`);
    img.style.transform = `scale(${flipH}, ${flipV})`;
}

function flipVertical() {

    flipV = flipV == 1 ? -1 : 1;

    console.log(`flip vertical value: ${flipV}`);
    img.style.transform = `scale(${flipH}, ${flipV})`;
}

function reset() {

    // set default values
    brightness = saturation = 100;
    inversion = grayscale = 0;
    rotate = 0;
    flipH = 1;
    flipV = 1;

    btns[0].click();

    applyFilter();
    
    img.style.transform = `rotate(${rotate}deg)`;
    
    img.style.transform = `scaleX(${flipH})`;

    img.style.transform = `scaleY(${flipV})`;

}
function draw() {

    // create a new art board
    let canvas =  document.createElement("canvas");
    
    // the art object
    let context = canvas.getContext("2d");

    // art object props & methods
    // console.log(context); 

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.style.border = `5px solid white`;

    context.filter = `brightness(${brightness / 100}) saturate(${saturation / 100}) invert(${inversion / 100})grayscale(${grayscale / 100})`;

    // not my code
    context.translate(canvas.width / 2,canvas.height / 2);
    if(rotate !== 0) {
        context.rotate(rotate * (Math.PI / 180))
    }
    context.scale(flipH, flipV);
    context.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    let save = document.createElement("a");
    save.href = `${canvas.toDataURL()}`
    save.download = 'img.jpg';
    save.click();
    console.log(save);
    // document.body.appendChild(canvas);

    

}
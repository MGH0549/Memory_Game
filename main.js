document.querySelector(".control_button span").onclick = function () {
    let yourname = prompt("Enter your name ");
    if (yourname == null|| yourname == "") { 
        document.querySelector('.name span').innerHTML="unknown";
    }
    else {
        document.querySelector(".name span").innerHTML=yourname;
        
    }
    document.querySelector(".control_button").remove();
}

let duration = 1000;
let blockscontainer = document.querySelector(".memory_game_block");
let blocks = Array.from(blockscontainer.children);
let orderrange = [...Array(blocks.length).keys()];


blocks.forEach((block, index) => {
    block.style.order = shuffle(orderrange)[index];
    
    block.addEventListener("click", (event) => {
        filpped(block);
    })

    function shuffle(array) {
        let current = array.length, temp, random;
        while (current > 0) {
            random = Math.floor(Math.random() * current);
            current--;
            temp = array[current];
            array[current] = array[random];
            array[random] = temp;
        
        }
        return array;
    }



    function filpped(selectedBlock) {
        selectedBlock.classList.add("is_flipped");

        let allflippedblocks = blocks.filter(block => block.classList.contains("is_flipped"));

        if (allflippedblocks.length===2) {
            stopclicking();
            checkmatch(allflippedblocks[0], allflippedblocks[1]);
        }
        
    }
});

function stopclicking() {
    blockscontainer.classList.add("non_click");
    setTimeout(() => {
    blockscontainer.classList.remove("non_click");
        
    },duration)
}
function checkmatch(block1,block2) {
    let tries = document.querySelector(".tries span");

    if (block1.dataset.tech === block2.dataset.tech) {
        block1.classList.remove("is_flipped");
        block2.classList.remove("is_flipped"); 
        
        block1.classList.add("is_match");
        block2.classList.add("is_match");
    }else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            block1.classList.remove("is_flipped");
            block2.classList.remove("is_flipped"); 
        },duration)
    }

}
const add_pin_modal = document.querySelector('.add_pin_modal');
var blabla = 0;
document.querySelector('.add_pin').addEventListener('click', () => {
    add_pin_modal.style.opacity = 1;
    add_pin_modal.style.pointerEvents = 'all';
});

add_pin_modal.children[0].children[1].children[2].children[0].addEventListener('click', () => {
    const users_data = {
        author: document.querySelector('#authors_name').value,
        board: 'default',
        title: document.querySelector('#pin_title').value,
        description: document.querySelector('#description_pin').value,
        collection: document.querySelector('#destination_pin').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector("#pin_size").value
    };
    create_preview(add_pin_modal, users_data);
    blabla = 1;

});

document.querySelector('.add_pin_modal').addEventListener('click', event => {
    if (event.target === add_pin_modal) {
        m_reset();
    }
});

let pin_image_blob = null;

document.querySelector('#img_upload').addEventListener('change', event => {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)){
            const reader = new FileReader();
            
            reader.onload = function(){
                const new_image = new Image();

                new_image.src = reader.result;
                pin_image_blob = reader.result;

                new_image.onload = function() {
                    const modals_pin = document.querySelector(".add_pin_modal .modals_pin");

                    new_image.classList.add('pin_max_width');

                    document.querySelector('.add_pin_modal .image_pin').appendChild(new_image);
                    document.querySelector('#img_upload_label').style.display = 'none';

                    modals_pin.style.display = 'block';

                    if (
                        new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                        new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                        ) {
                            new_image.classList.remove('pin_max_width');
                            new_image.classList.add('pin_max_height');     
                    }

                    modals_pin.style.opacity = 1;
                }

            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    document.querySelector('#img_upload').value = '';
});

document.querySelector(".pin_save").addEventListener('click', () => {
    const users_data = {
        author: document.querySelector("#authors_name").value,
        board: 'default',
        title: document.querySelector('#pin_title').value,
        description: document.querySelector('#description_pin').value,
        collection: document.querySelector('#destination_pin').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector("#pin_size").value
    }
    create_pin(users_data);
    m_reset();
    const section3 = add_pin_modal.children[0].children[0].children[1];
    console.log(users_data.img_blob);
    if (blabla === 1) {
        section3.children[0].removeChild(section3.children[0].children[0]);
        section3.children[0].children[0].style.display = "flex";
    }
});
 
function create_pin(details){
    const new_pin = document.createElement('DIV');
    const new_image = new Image();

    new_image.src = details.img_blob;
    new_pin.style.opacity = 0;
    
    new_image.onload = function () {
        new_pin.classList.add('card');
        new_pin.classList.add(`card_${details.pin_size}`);
        new_image.classList.add('pin_max_width');
        new_pin.innerHTML = `<div class ="title_pin">${details.title}</div>
    <aside class="comments_section">
        <h1>Last comments</h1>
        <div class="comments">
            <span>I love your post !</span>
        </div>
        <div class="add_comment">
            <input type="text" placeholder="Add a small comment" id="new_comment">
        </div>
        <div class="close_button">
            Close
        </div>
    </aside>
    <div class ="modal_pin">
        <div class ="modal_head">
            <div class ="save_card">
                <a href="${details.img_blob}" download="${details.title}">Save</a> 
            </div>
        </div>
        <div class ="modal_foot">
            <div class ="destination">
                <div class ="icon_pint_container">
                    <img src="../images/icons/upper-right-arrow.png" alt= "destination" class= "icon_pint" >
                </div>
                <span>${details.title}</span>
            </div>

            <div class = "icon_pint_container">
                <img src="../images/icons/comment.png" alt= "send" class="icon_pint" id="send" >
            </div>

            <div class = "icon_pint_container">
                <img src="../images/icons/ellipse.png" alt= "edit" class= "icon_pint" id = 'dots' >
            </div>

            <select name="size_choice" id="size_choice">
                <option value="" disabled selected>Select</option>
                <option value="small" selected>S</option>
                <option value="medium" selected>M</option>
                <option value="large" selected>L</option>
            </select>
        </div>
    </div>

    <div class = image_pin>
    </div>

    <div class="description_box description_box_${details.pin_size}">
        <div class="description_text">
            This pin is about ${details.description}.<br>
            It is part of the author's ${details.collection} collection.
            <p>This pin was made by ${details.author}</p>
        </div>
    </div>`;

        document.querySelector('.container_pin').appendChild(new_pin);
        new_pin.children[3].appendChild(new_image);

        if (
            new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
            new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
        ) {
            new_image.classList.remove('pin_max_width');
            new_image.classList.add('pin_max_height');     
        }
        // new_pin.children[2].children[1].children[3].style.opacity = 0;
        new_pin.style.opacity = 1;
        const send = new_pin.children[2].children[1].children[1].children[0];
        const dots = new_pin.children[2].children[1].children[2].children[0];
        dots.addEventListener('click',  () => {
            const size_menu = new_pin.children[2].children[1].children[3];
            size_menu.style.opacity = 1;
            change_size(new_pin);
        });

        const comments = new_pin.children[1];
        console.log(send);
        send.addEventListener('click', () => {
            console.log(1)
            comments.style.opacity = 1;
            add_comment(new_pin);
        });
 
    }
}

function m_reset() {
    const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

    add_pin_modal.style.opacity = 0;
    add_pin_modal.style.pointerEvents = 'none';
    document.querySelector('#img_upload_label').style.display = 'block';
    modals_pin.style.display = 'none';
    modals_pin.style.opacity = 0;

    if (modals_pin.children[0].children[0]) modals_pin.children[0].removeChild(modals_pin.children[0].children[0]);
    document.querySelector('#pin_title').value = '';
    document.querySelector('#description_pin').value = '';
    document.querySelector('#destination_pin').value = '';
    document.querySelector('#pin_size').value = '';
    document.querySelector("#authors_name").value = ''; 
    // document.querySelector(".preview").remove(document.querySelector('.preview_text'));

    // document.querySelector(".preview").appendChild(document.querySelector(".pre_preview"));
    pin_image_blob = null;
}

//Pin features
document.querySelector('#send').addEventListener('click', () => {
    document.querySelector('.comments_section').style.opacity = 1;
    const pin = document.querySelector("#send").parentElement.parentElement.parentElement.parentElement;
    console.log(pin) 
    add_comment(pin);
});

document.querySelector('#dots').addEventListener('click', () => {
    document.querySelector("#size_choice").style.opacity = 1;
    const pin = document.querySelector("#dots").parentElement.parentElement.parentElement.parentElement; 
    console.log(pin);
    change_size(pin);
});


function create_preview(modal, details) {
    const preview = document.createElement('DIV');
    preview.innerHTML = `This pin is about ${details.description}. <br> It is part of the author's ${details.collection} collection.
    <p>This pin was made by ${details.author}</p>`;
    console.log(`This pin was made by ${details.author}`);
    preview.classList.add('.preview_text');
    const section3 = modal.children[0].children[0].children[1];
    // console.log(section3);
    section3.children[0].children[0].style.display = "none" ;
    preview.style.width = '280px'; 
    section3.children[0].insertBefore(preview, section3.children[0].children[0]);
};

function change_size(pin) {
    const size_choice = pin.children[2].children[1].children[3]
    size_choice.addEventListener('change', () => {
        console.log(size_choice.value);
        new_size = 'card_'+size_choice.value;
        new_description = "description_box_"+size_choice.value;
        description_size = pin.children[4].classList[1];
        size = size_choice.parentElement.parentElement.parentElement.classList[1];
        size_choice.parentElement.parentElement.parentElement.classList.remove(size);
        size_choice.parentElement.parentElement.parentElement.classList.add(new_size);
        pin.children[4].classList.remove(description_size);
        pin.children[4].classList.add(new_description);
        size_choice.style.opacity = 0;
    });
}

function add_comment(pin){
    console.log(2)
    const comments = pin.children[1];
    // document.querySelector('#new_comment').value = '';
    if (comments.style.opacity == 1) { 
        console.log(1);
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                /*ADD the code to add a comment*/
                new_comment = comments.children[2].children[0].value;
                var com = document.createElement('DIV');
                com.innerHTML = `${new_comment}`; 
                comments.children[1].appendChild(com);
                comments.children[2].children[0].value = null;
            }
        });
    };
    comments.children[3].addEventListener('click', () => {
        comments.style.opacity = 0;
    });
}





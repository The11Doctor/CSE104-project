
const add_pin_modal = document.querySelector('.add_pin_modal');

document.querySelector('.add_pin').addEventListener('click', () => {
    add_pin_modal.style.opacity = 1;
    add_pin_modal.style.pointerEvents = 'all';
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
        author: 'Johana',
        board: 'default',
        title: document.querySelector('#pin_title').value,
        description: document.querySelector('#description_pin').value,
        destination: document.querySelector('#destination_pin').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector("#pin_size").value
    }
    create_pin(users_data);
    m_reset();
});

 
function create_pin(details){
    const new_pin = document.createElement('DIV');
    const new_image = new Image();

    new_image.src = details.img_blob;
    new_pin.style.opacity = 0;
    
    new_image.onload = function () {
        new_pin.classList.add('card');
        new_image.classList.add('pin_max_width');
        new_pin.innerHTML = `<div class ="title_pin">${details.title}</div>
    <div class ="modal_pin">
        <div class ="modal_head">
            <div class ="save_card"> Save </div>
        </div>

        <div class ="modal_foot">
            <div class ="destination">
                <div class ="icon_pint_container">
                    <img src="../images/icons/upper-right-arrow.png" alt= "destination" class= "icon_pint" >
                </div>
                <span>${details.destination}</span>
            </div>

            <div class = "icon_pint_container">
                <img src="../images/icons/send.png" alt= "send" class="icon_pint" >
            </div>

            <div class = "icon_pint_container">
                <img src="../images/icons/ellipse.png" alt= "edit" class= "icon_pint" >
            </div>
        </div>
    </div>

    <div class = image_pin>
    </div>`;

        document.querySelector('.container_pin').appendChild(new_pin);
        new_pin.children[2].appendChild(new_image);

        if (
            new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
            new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
        ) {
            new_image.classList.remove('pin_max_width');
            new_image.classList.add('pin_max_height');     
        }
        new_pin.style.opacity = 1;
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
    pin_image_blob = null;
}

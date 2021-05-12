let pin_image_blob = null;
document.querySelector(".preview_button").addEventListener('click', () => {
    const users_data = {
        author: document.querySelector('#authors_name').value,
        board: 'default',
        title: document.querySelector('#pin_title').value,
        description: document.querySelector('#description_pin').value,
        collection: document.querySelector('#destination_pin').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector("#pin_size").value
    };
    create_preview(users_data);

});


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
        author: document.querySelector('#authors_name').value,
        board: 'default',
        title: document.querySelector('#pin_title').value,
        description: document.querySelector('#description_pin').value,
        collection: document.querySelector('#destination_pin').value,
        img_blob: pin_image_blob,
        pin_size: document.querySelector("#pin_size").value
    };
    console.log(users_data);
});


function create_preview(details) {
    const preview = document.createElement('DIV');
    preview.innerHTML = `This pin is about ${details.description}. <br>It is part of the author's ${details.collection} collection.
    <p>This pin was made by ${details.author}</p>`;
    // console.log(`This pin was made by ${details.author}`);
    preview.classList.add('.preview_text');
    document.querySelector('.preview').removeChild(document.querySelector('.pre_preview'));
    document.querySelector('.preview').removeChild(document.querySelector('.pre_preview'));
    document.querySelector('.preview').appendChild(preview)
};
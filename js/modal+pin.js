
const add_pin_modal = document.querySelector('.add_pin_modal')
document.querySelector('.add_pin').addEventListener('click', () => {
  add_pin_modal.style.opacity = 1;
  add_pin_modal.style.pointerEvents = 'all'

});
document.querySelector('add_pin_modal').addEventListener('click', event => {
  if (event.target === add_pin_modal){
    reset_modal();

  }
})

let image_pin_blob = null;

document.querySelector('#img_upload').addEventListener('change', event => {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)){
            const reader = new FileReader();


            reader.onload = function(){
              const new_image = new Image();
              new_image.src = reader.result;
              image_pin_blob = reader.result;

              new_image.onload = function() {
                const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

                new_image.classList.add('pin_max_width');



                document.querySelector('.add_pin_modal .image_pin').appendChild(new_image);
                document.querySelector('#img_upload_label').style.display = 'none';

                 modals_pin.style.display = 'block';

                 if (
                    new_image.getBoundingClientRect().width < new_image.parentElement.getBoundingClientRect().width ||
                    new_image.getBoundingClientRect().height < new_image.parentElement.getBoundingClientRect().height
                 ) {
                    new_image.classList.add('pin_max_height');
                    new_image.classList.remove('pin_max_width');
                 }

                 modals_pin.style.opacity = 1;

              }
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    document.querySelector('#img_upload').value = '';

});

document.querySelector('.pin_save').addEventListener('click', () => {
  const users_data = {
    author:'BOSEY',
    board:'default',
    title: document.querySelector('#title_pin').value,
    description: document.querySelector('#destination_pin').value,
    title: document.querySelector('#destination_pin').value,
    img_blob: image_pin_blob ,
    pin_size: document.querySelector('#pin_size').value,
  }
});

function reset_modal() {
  const modals_pin = document.querySelector('add_pin_modal .modals_pin');

  add_pin_modal.style.opacity = 0;
  add_pin_modal.style.pointerEvents = 'none';

  if (modals_pin.children[0].children[0])
    modal_pin.children.removeChild(modals_pin.children[0].children[0]);
    document.querySelector('#title_pin').value = '';
    document.querySelector('#destination').value = '';
    document.querySelector('#pin_size').value = '';
    image_pin_blob = null;




}



document.querySelector('#picture').addEventListener('change', event => {
    if (event.target.files && event.target.files[0]) {
        if (/image\/*/.test(event.target.files[0].type)){
            const reader = new FileReader();
            
            reader.onload = function(){
                document.querySelector('.image_pin img').src = reader.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    document.querySelector('#picture').value = '';

});

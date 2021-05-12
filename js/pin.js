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

document.querySelector('#send').addEventListener('click', () => {
    document.querySelector('.comments_section').style.opacity = 1;
    add_comment();
});

function add_comment(){
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            /*ADD the code to add a comment*/
            new_comment = document.querySelector('#new_comment').value;
            console.log(new_comment);
        }

    });
}
    
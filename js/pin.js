// document.querySelector('#picture').addEventListener('change', event => {
//     if (event.target.files && event.target.files[0]) {
//         if (/image\/*/.test(event.target.files[0].type)){
//             const reader = new FileReader();
            
//             reader.onload = function(){
//                 document.querySelector('.image_pin img').src = reader.result;
//             }
//             reader.readAsDataURL(event.target.files[0]);
//         }
//     }
//     document.querySelector('#picture').value = '';
// });

document.querySelector('#send').addEventListener('click', () => {
    document.querySelector('.comments_section').style.opacity = 1;
    add_comment();

    document.querySelector('.close_button').addEventListener('click', () => {
        document.querySelector('.comments_section').style.opacity = 0;
    })
});

document.querySelector('#dots').addEventListener('click', () => {
    size_choice = document.querySelector('#size_choice')
    size_choice.style.opacity = 1;
    size_choice.addEventListener('change', () => {
        console.log(size_choice.value);
        new_size = 'card_'+size_choice.value;
        size = size_choice.parentElement.parentElement.parentElement.classList[1];
        size_choice.parentElement.parentElement.parentElement.classList.remove(size);
        size_choice.parentElement.parentElement.parentElement.classList.add(new_size);
    });

});



function add_comment(){
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            /*ADD the code to add a comment*/
            new_comment = document.querySelector('#new_comment').value;
            const com = document.createElement('SPAN');
            com.innerHTML = `"${new_comment}"<br>`
            document.querySelector('.comments').appendChild(com);
        }
    });
}


    
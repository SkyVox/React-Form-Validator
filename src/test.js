import $ from 'jquery';

$(document).ready(function() {
    console.log('Ypo');
    $("form").on('submit', (event) => {
        event.preventDefault();
        console.log("Hey, you just called me");

        test("Den");
    });
});


export let test = (name) => {
    console.log("Hey, your name is: " + name);
}

export let yolo = () => {
    return (
        <h6>Hey Dennis Colossal!!</h6>
    );
}
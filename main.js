var data = [];
var users = {};
var select_person_one = document.querySelector('#dropdown_one');
var select_person_two = document.querySelector('#dropdown_two');
var btn_nearest = document.querySelector('#btn_nearest');
var p_cosine_distance = document.querySelector('#p_cosine_distance');

btn_nearest.addEventListener("click", function () {
    euclideanSmimilarity();
});

function euclideanSmimilarity() {
    //this is just the name
    var name1 = select_person_one.value;
    var name2 = select_person_two.value;

    //This is the complete object
    var ratings1 = users[name1];
    var ratings2 = users[name2];

    //Array of all the keys that are part of person1
    var notes = Object.keys(ratings1);


    //Ignore the "name" and the "occupation" keys.
    var i = notes.indexOf('correo');
    notes.splice(i, 1);

    //Variables
    var dotproduct = 0;
    var pow_vector1_result = 0;
    var pow_vector2_result = 0;
    var magnitude = 0;
    var cosine_distance = 0;

    for (let i = 0; i < notes.length; i++) {
        if (users[name1] != users[name2]) {
            //People
            var note = notes[i];
            var rating1 = ratings1[note];
            var rating2 = ratings2[note];


            //-----------------------------------Dot product
            var mul = rating1 * rating2;
            dotproduct += mul;


            //Pow vector 1 
            var pow_vector1 = Math.pow(rating1, 2);
            pow_vector1_result += pow_vector1;
            var root_vector1 = Math.sqrt(pow_vector1_result);

            //Pow vector 2
            var pow_vector2 = Math.pow(rating2, 2);
            pow_vector2_result += pow_vector2;
            var root_vector2 = Math.sqrt(pow_vector2_result);


            //----------------------------------Magnitud
            magnitude = root_vector1 * root_vector2;


            //----------------------------------Cosine Distance
            cosine_distance = dotproduct / magnitude;


            p_cosine_distance.innerHTML = " ";
            p_cosine_distance.innerHTML = cosine_distance.toFixed(2);
            p_cosine_distance.style.fontSize = "50px";
        } else {
            p_cosine_distance.innerHTML = "Estás comparando la misma persona";
            p_cosine_distance.style.fontSize = "12px";
        }
    }
    console.log(cosine_distance);
}

getData();

async function getData() {
    const response = await fetch('data.csv');
    const info = await response.text();
    const table = info.split('\n').slice(1);

    for (let i = 0; i < table.length; i++) {
        const columns = table[i].split(',');
        const correo = columns[0];
        const participaciones = columns[1];
        const a = columns[2];
        const b = columns[3];

        data.push({ correo: correo, participaciones: participaciones, a: a, b: b });

        //Create a select_person_one's options and add it
        var user_name = data[i].correo;
        let option_person_one = document.createElement("option");
        option_person_one.innerHTML = user_name;
        select_person_one.appendChild(option_person_one);

        //Create a select_person_two's options and add it
        let option_person_two = document.createElement("option");
        option_person_two.innerHTML = user_name;
        select_person_two.appendChild(option_person_two);

        //Lookup - This's better for the search 
        users[correo] = data[i];
    }
}
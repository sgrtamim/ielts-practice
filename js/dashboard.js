async function loadTests() {

    try {

        const response =
            await fetch("data/reading/tests.json");

        const tests =
            await response.json();

        const list =
            document.getElementById("testList");

        list.innerHTML = "";

        tests.forEach(test => {

            list.innerHTML += `

            <div class="testCard">

                <h2>${test.title}</h2>

                <p>${test.time} Minutes</p>

                <button
                onclick="startTest('${test.id}')">

                Start Test

                </button>

            </div>

            `;

        });

    }

    catch (err) {

        console.error(err);

    }

}

function startTest(id) {

    window.location.href =
        `reading.html?id=${id}`;

}

loadTests();

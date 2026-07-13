// ======================================
// QUESTIONS
// ======================================

function buildQuestions(){

    questionContent.innerHTML = "";
    navigatorBox.innerHTML = "";

    app.testData.questions.forEach(q=>{

        navigatorBox.innerHTML += `
            <button
                class="navBtn"
                id="nav${q.number}"
                onclick="goQuestion(${q.number})">

                ${q.number}

            </button>
        `;

        let html = "";

        // ---------------- TFNG ----------------

        if(q.type==="tfng"){

            html=`

            <div class="question">

                <p>

                    <b>${q.number}.</b>

                    ${q.question}

                </p>

                <div class="btnGroup">

                    <button class="tfng">
                        TRUE
                    </button>

                    <button class="tfng">
                        FALSE
                    </button>

                    <button class="tfng">
                        NOT GIVEN
                    </button>

                </div>

            </div>

            `;

        }

        // ---------------- GAP ----------------

        if(q.type==="gap"){

            html=`

            <div class="question">

                <p>

                    <b>${q.number}.</b>

                    ${
                        q.question.replace(

                            "________",

                            `<input
                                class="gapInput"
                                type="text"
                                autocomplete="off">`

                        )
                    }

                </p>

            </div>

            `;

        }

        questionContent.innerHTML += html;

    });

    restoreAnswers();

}

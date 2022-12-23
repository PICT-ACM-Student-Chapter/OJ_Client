export function addRestrictions(contestId) {
    // Disable right click
    window.document.addEventListener("contextmenu", rightClickHandler);
    // Disable ctrl+c ctrl+v
    window.document.addEventListener("keydown", keystrokesHandler);
}

export function removeRestrictions(contestId) {
    // Disable right click
    window.document.removeEventListener("contextmenu", rightClickHandler);
    // Disable ctrl+c ctrl+v
    window.document.removeEventListener("keydown", keystrokesHandler);
}

function rightClickHandler(e) {
    e.preventDefault();
}

function keystrokesHandler(e) {
    if (
        e.key &&
        ["c", "x", "v", "u", "i"].includes(e.key.toLowerCase()) &&
        e.ctrlKey
    )
        e.preventDefault();
}

// function tabExitHandler(contestId) {
//     setTimeout(() => {
//
//
//         let warningNo = parseInt(localStorage.getItem(`${contestId}_warnings`)) || 0
//         if (warningNo === 5) {
//             alert("You are disqualified as you have attempted to exit the MCQ platform more that 5 times.")
//             window.location.pathname = "/contests"
//             return
//         }
//         warningNo++;
//         alert(`Please don't exit the MCQ Platform. Warning ${warningNo} of 5. You will be disqualified after 5 such attempts`)
//         localStorage.setItem(`${contestId}_warnings`, warningNo)
//     }, 500)
// }

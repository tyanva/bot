
let selectedContract = null;

function selectContract(contractId) {
    selectedContract = contractId;
    console.log(`Contract ${contractId} selected`);
    document.getElementById('start-game').disabled = false;
}

function startGame(contractId) {
    if (selectedContract !== null) {
        window.location.href = `/game?contract=${selectedContract}`;
    } else {
        console.log('No contract selected');
    }
}

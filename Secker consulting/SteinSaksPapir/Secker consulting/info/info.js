document.getElementById('stein').addEventListener('click', function() {
    displayInfo('Stein knuser saks.');
});

document.getElementById('saks').addEventListener('click', function() {
    displayInfo('Saks klipper papir.');
});

document.getElementById('papir').addEventListener('click', function() {
    displayInfo('Papir dekker stein.');
});

function displayInfo(text) {
    document.getElementById('choice-text').innerText = text;
    document.getElementById('choice-info').classList.remove('choice-info-hidden');
}

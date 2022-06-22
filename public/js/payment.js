// pagamento
const payment = document.querySelector('#payment');
const res  = document.querySelector('#res');
const pixOpt = document.querySelector('#pixOpt');
const moneyOpt = document.querySelector('#moneyOpt');
const cardOpt = document.querySelector('#cardOpt');
const trocoLabel = document.querySelector('#trocoLabel');
const trocoValue = document.querySelector('#trocoValue');
const moneyRecived = document.querySelector('#moneyRecived');
const totall = document.querySelector('#totall');

moneyRecived.addEventListener('input', (e) => {

    let total = totall.textContent;
    total = total.replace(',', '.');
    let troco = eval(moneyRecived.value - total).toFixed(2).toString();

    trocoValue.textContent = troco.replace('.', ',');
});



payment.addEventListener('change', (e) => {

    if (e.target.value == '0') {

        pixOpt.setAttribute('hidden', 'hidden');
        moneyOpt.setAttribute('hidden', 'hidden');
        cardOpt.setAttribute('hidden', 'hidden');
        trocoLabel.setAttribute('hidden', 'hidden');

    } else if (e.target.value === 'Pix') {

        pixOpt.removeAttribute('hidden');
        moneyOpt.setAttribute('hidden', 'hidden');
        cardOpt.setAttribute('hidden', 'hidden');
        trocoLabel.setAttribute('hidden', 'hidden');

    } else if (e.target.value == 'Débito/Crédito') {

        cardOpt.removeAttribute('hidden');
        moneyOpt.setAttribute('hidden', 'hidden');
        pixOpt.setAttribute('hidden', 'hidden');
        trocoLabel.setAttribute('hidden', 'hidden');

    } else if (e.target.value == 'Dinheiro') {

        moneyOpt.removeAttribute('hidden');
        trocoLabel.removeAttribute('hidden');
        cardOpt.setAttribute('hidden', 'hidden');
        pixOpt.setAttribute('hidden', 'hidden');

    } else {

        pixOpt.setAttribute('hidden', 'hidden');
        moneyOpt.setAttribute('hidden', 'hidden');
        cardOpt.setAttribute('hidden', 'hidden');
        trocoLabel.setAttribute('hidden', 'hidden');

    }

});
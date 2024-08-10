//CONVERTER

async function setupCurrencyConverter() {
    const som = document.querySelector('#som');
    const usd = document.querySelector('#usd');
    const eur = document.querySelector('#eur');
    try {
        const response = await fetch("../data/convertor.json");
        const data = await response.json();
        const usdExchangeRate = data.usd;
        const eurExchangeRate = data.eur;

        function updateSomValue(inputValue) {
            if (!isNaN(inputValue)) {
                usd.value = (inputValue / usdExchangeRate).toFixed(2);
                eur.value = (inputValue / eurExchangeRate).toFixed(2);
            } else {
                usd.value = "";
                eur.value = "";
            }
        }

        function updateUsdValue(inputValue) {
            if (!isNaN(inputValue)) {
                som.value = (inputValue * usdExchangeRate).toFixed(2);
                eur.value = (inputValue * (usdExchangeRate / eurExchangeRate)).toFixed(2);
            } else {
                som.value = "";
                eur.value = "";
            }
        }

        function updateEurValue(inputValue) {
            if (!isNaN(inputValue)) {
                som.value = (inputValue * eurExchangeRate).toFixed(2);
                usd.value = (inputValue * (eurExchangeRate / usdExchangeRate)).toFixed(2);
            } else {
                som.value = "";
                usd.value = "";
            }
        }

        som.oninput = () => {
            const inputValue = parseFloat(som.value);
            updateSomValue(inputValue);
        };

        usd.oninput = () => {
            const inputValue = parseFloat(usd.value);
            updateUsdValue(inputValue);
        };

        eur.oninput = () => {
            const inputValue = parseFloat(eur.value);
            updateEurValue(inputValue);
        };
    } catch (error) {
        console.log('Fetch error:', error);
    }
}

setupCurrencyConverter();


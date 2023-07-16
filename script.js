//Selectors
const currencyOne = document.querySelector("#currencyOne");
const currencyOneAmount = document.querySelector("#currencyOneAmount");
const secondCurrency = document.querySelector("#secondCurrency");
const currencyTwoAmount = document.querySelector("#currencyTwoAmount");
const swap = document.querySelector("#swap");
const exchangeResult = document.querySelector("#exchangeResult");
const moneyExchangeContainer = document.querySelector(
  ".moneyExchangeContainer__currencies"
);

function interchangeOption() {
  let temporary = "";
  temporary = currencyOne.value;
  currencyOne.value = secondCurrency.value;
  secondCurrency.value = temporary;
  getConversions();
}

async function getConversions() {
  try {
    let firstCurrencyCode = "",
      secondCurrencyCode = "",
      total = 0,
      pricePerDollar = 0;

    firstCurrencyCode = currencyOne.value;
    const responseObj = await fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${firstCurrencyCode.toLocaleLowerCase()}.json`
    );
    let { date: _, ...conversionRates } = await responseObj.json();

    secondCurrencyCode = secondCurrency.value;
    pricePerDollar =
      conversionRates[`${firstCurrencyCode.toLocaleLowerCase()}`][
        `${secondCurrencyCode.toLocaleLowerCase()}`
      ] || null;
    if (!pricePerDollar) {
      throw new Error("The country code doesnot exisit in our database.");
    }
    total = Number(currencyOneAmount.value) * pricePerDollar;
    currencyTwoAmount.textContent = total;
    exchangeResult.textContent = `${
      currencyOneAmount.value
    } ${firstCurrencyCode.toLocaleUpperCase()} = ${total} ${secondCurrencyCode.toLocaleUpperCase()}`;
  } catch (error) {
    console.log(error);
  }
}

moneyExchangeContainer.addEventListener("change", getConversions);
swap.addEventListener("click", interchangeOption);

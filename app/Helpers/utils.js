/* Utility properties and methods */
var Utils = {
	currency : [
		{ "key" : "AUD", "name" : "Australian Dollar(AUD)" },
		{ "key" : "BGN", "name" : "Bulgarian Lev(BGN)" },
		{ "key" : "BRL", "name" : "Brazil Real(BRL)" },
		{ "key" : "CAD", "name" : "Canadian Dollar(CAD)" },
		{ "key" : "CHF", "name" : "Swiss Franc(CHF)" },
		{ "key" : "CNY", "name" : "Chinese Yuan(CNY)" },
		{ "key" : "CZK", "name" : "Czech Republic Koruna(CZK)" },
		{ "key" : "DKK", "name" : "Danish Krone(DKK)" },
		{ "key" : "EUR", "name" : "Euro(EUR)" },
		{ "key" : "GBP", "name" : "British Pound(GBP)" },
		{ "key" : "HKD", "name" : "Hong Kong Dollar(HKD)" },
		{ "key" : "HRK", "name" : "Croatian Kuna(HRK)" },
		{ "key" : "HUF", "name" : "Hungarian Forint(HUF)" },
		{ "key" : "IDR", "name" : "Indonesian Rupiah(IDR)" },
		{ "key" : "ILS", "name" : "Israeli New Sheqel(ILS)" },
		{ "key" : "INR", "name" : "Indian Rupee(INR)" },
		{ "key" : "JPY", "name" : "Japanese Yen(JPY)" },
		{ "key" : "KRW", "name" : "South Korean Won(KRW)" },
		{ "key" : "MXN", "name" : "Mexican Peso(MXN)" },
		{ "key" : "MYR", "name" : "Malaysian Ringgit(MYR)" },
		{ "key" : "NOK", "name" : "Norwegian Krone(NOK)" },
		{ "key" : "NZD", "name" : "New Zealand Dollar(NZD)" },
		{ "key" : "PHP", "name" : "Philippine Peso(PHP)" },
		{ "key" : "PLN", "name" : "Polish Zloty(PLN)" },
		{ "key" : "RON", "name" : "Romanian Leu(RON)" },
		{ "key" : "RUB", "name" : "Russian Ruble(RUB)" },
		{ "key" : "SEK", "name" : "Swedish Krona(SEK)" },
		{ "key" : "SGD", "name" : "Singapore Dollar(SGD)" },
		{ "key" : "THB", "name" : "Thai Baht(THB)" },
		{ "key" : "TRY", "name" : "Turkish Lira(TRY)" },
		{ "key" : "ZAR", "name" : "South African Rand(ZAR)" }
		
	],
	symbol : {
		"AUD" : '$;',
		"BGN" : 'лв',
		"BRL" : 'R$',
		"CAD" : '$',
		"CHF" : 'CHF',
		"CNY" : '¥',
		"CZK" : 'Kč',
		"DKK" : 'kr',
		"EUR" : '€',
		"GBP" : '£',
		"HKD" : '$',
		"HRK" : 'kn',
		"HUF" : 'Ft',
		"IDR" : 'Rp',
		"ILS" : '₪',
		"INR" : '₹₹',
		"JPY" : '¥',
		"KRW" : '₩',
		"MXN" : '₱',
		"MYR" : 'RM',
		"NOK" : 'kr',
		"NZD" : '$',
		"PHP" : '₱',
		"PLN" : 'zł',
		"RON" : 'RON',
		"RUB" : '₽₽',
		"SEK" : 'kr',
		"SGD" : '$',
		"TRY" : '₺₺',
		"THB" : '฿',
		"ZAR" : 'R'		
	},
	getIconUrl: function(icon) {
		//icon .pngs placed in github io repo
		return "http://jsphkhan.github.io/ReactNativeWeatherApp/assets/icons/10d.png";
	}
};

module.exports = Utils;

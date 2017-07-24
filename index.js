var token = '423962643:AAGl9yuL2oBGKY5GocQXpVQhpRWckc2FCdg';
//var Player = require('./player.js');
var Bot = require('node-telegram-bot-api');
var bot = new Bot(token, {
		polling: true
	});
	


module.exports = () => 'I am alive!';

console.log('Bot server started ...');

var default_message = 
`\t*****************************************
\t\t\t\tOn:\t{{Day}}
\t\t\t\tTime:\t7-9
\t\t\t\tVenue:\tTBA (Ampang Sport Planet)
*****************************************\n`;

var session_message = default_message;
var isSessionOpen = false;
var attendants = [];
var admins = ["amingram", "Echabok", "alirezamgt"];

var isAdmin = function (username) {
	if (admins.indexOf(username) >= 0)
		return true;
	else
		return false;
};

var openFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (!isSessionOpen) {
			session_message = default_message;
			attendants = [];
			bot.sendMessage(msg.chat.id, session_message + "\n=> To attend: /in" + "\n=> To cancel: /out");
			isSessionOpen = true;
		} else {
			bot.sendMessage(msg.chat.id, "اول تکلیف جلسه قبلی رو مشخص کن بعدا");
		}
	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var inFunc = function (msg) {
	if (!isSessionOpen || attendants.length >= 12) {
		bot.sendMessage(msg.chat.id, "This session is closed, please try next week! \n" + "دیگه خیلی دیر شده، ایشالا هفته بعد");
	} else {

		var player = msg.from.first_name + "-" + msg.from.last_name;

		if (attendants.indexOf(player) === -1) {
			attendants.push(player);

			var list = session_message;

			for (i = 0; i < attendants.length; i++) {
				list += i + 1 + " - " + attendants[i] + "\n";
			};

			list += "\n=> To attend: /in";
			list += "\n=> To cancel: /out";

			bot.sendMessage(msg.chat.id, list)
		} else
			bot.sendMessage(msg.chat.id, "چند بار میخوای اضافه کنی دوست عزیز؟" + "\n You are already in the list");
	}
};

var inValaFunc = function (msg) {

	if (isAdmin(msg.from.username)) {
		if (!isSessionOpen || attendants.length >= 12) {
			bot.sendMessage(msg.chat.id, "This session is closed, please try next week! \n" + "دیگه خیلی دیر شده، ایشالا هفته بعد");
		} else {

			var player = "Vala";

			if (attendants.indexOf(player) === -1) {
				attendants.push(player);

				var list = session_message;

				for (i = 0; i < attendants.length; i++) {
					list += i + 1 + " - " + attendants[i] + "\n";
				};

				list += "\n=> To attend: /in";
				list += "\n=> To cancel: /out";

				bot.sendMessage(msg.chat.id, list)
			} else
				bot.sendMessage(msg.chat.id, "چند بار میخوای اضافه کنی دوست عزیز؟" + "\n You are already in the list");
		}
	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var outFunc = function (msg) {

	if (!isSessionOpen) {
		bot.sendMessage(msg.chat.id, "آقا لیست آلردی بسته شده، راه نداره الان کنسل کنی، اگه خیلی مورد اورژانسیه با علیرضا یا احسان تماس بگیر؛ کاری از دست من ساخته نیست" + "\nThe session has been alrady closed and you cannot cancel, contact alireza in emergency cases!");

	} else {

		var player = msg.from.first_name + "-" + msg.from.last_name;
		var index = attendants.indexOf(player);

		if (index >= 0) {
			attendants.splice(index, 1);
			var list = session_message;

			for (i = 0; i < attendants.length; i++) {
				list += i + 1 + " - " + attendants[i] + "\n";
			};

			list += "\n=> To attend: /in";
			list += "\n=> To cancel: /out";

			bot.sendMessage(msg.chat.id, "ای بابا :-|")

			bot.sendMessage(msg.chat.id, list)
		} else
			bot.sendMessage(msg.chat.id, "اخوی! شما قبلا هم تو لیست نبودی نیاز به این کارا هم نیست" + "\n You have never been in the list anyhow!");
	}
};

var outValaFunc = function (msg) {

	if (isAdmin(msg.from.username)) {
		var player = "Vala";
		var index = attendants.indexOf(player);

		if (index >= 0) {
			attendants.splice(index, 1);
			var list = session_message;

			for (i = 0; i < attendants.length; i++) {
				list += i + 1 + " - " + attendants[i] + "\n";
			};

			list += "\n=> To attend: /in";
			list += "\n=> To cancel: /out";

			bot.sendMessage(msg.chat.id, "ای بابا :-|")

			bot.sendMessage(msg.chat.id, list)
		} else
			bot.sendMessage(msg.chat.id, "اخوی! شما قبلا هم تو لیست نبودی نیاز به این کاراوهم نیست" + "\n You have never been in the list anyhow!");
	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var closeFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (isSessionOpen) {
			isSessionOpen = false;
		}
		var list = session_message;

		for (i = 0; i < attendants.length; i++) {
			list += i + 1 + " - " + attendants[i] + "\n";
		};

		list += "\n\n This session has been closed, please attend on time!\n" + "لیست کامل شده، برادرا لطفا به موقع تشریف بیارید";
		bot.sendMessage(msg.chat.id, list)

	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var reopenFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (!isSessionOpen) {
			isSessionOpen = true;

			var list = session_message;

			for (i = 0; i < attendants.length; i++) {
				list += i + 1 + " - " + attendants[i] + "\n";
			};

			list += "\n=> To attend: /in";
			list += "\n=> To cancel: /out";

			bot.sendMessage(msg.chat.id, list)
		}

	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var setMondayFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (isSessionOpen) {
			session_message = session_message.replace("{{Day}}", "Monday")
				bot.sendMessage(msg.chat.id, "دوشنبه Monday")
		}
	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var setTuesdayFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (isSessionOpen) {
			session_message = session_message.replace("{{Day}}", "Tuesday")
				bot.sendMessage(msg.chat.id, "سه شنبه Tuesday")
		}

	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var setWedenesdayFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (isSessionOpen) {
			session_message = session_message.replace("{{Day}}", "Wednesday")
				bot.sendMessage(msg.chat.id, "چهارشنبه Wednesday")
		}
	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var setThursdayFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (isSessionOpen) {
			session_message = session_message.replace("{{Day}}", "Thursday")
				bot.sendMessage(msg.chat.id, "پنج شنبه Thursday")
		}
	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var setFridayFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (isSessionOpen) {
			session_message = session_message.replace("{{Day}}", "Friday")
				bot.sendMessage(msg.chat.id, "جمعه Friday")
		}

	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var resetFunc = function (msg) {
	if (isAdmin(msg.from.username)) {
		if (isSessionOpen) {
			session_message = default_message;
			bot.sendMessage(msg.chat.id, "روز بازی رو دوباره مشخص کن ردیفه")
		}
	} else
		bot.sendMessage(msg.chat.id, "واللا به ما گفتن فقط علیرضا اینا میتونن از این کار مارا کنن" + "\n Admin only!");
};

var listFunc = function (msg) {
	var player = msg.from.first_name + "-" + msg.from.last_name;

	var list = session_message;

	for (i = 0; i < attendants.length; i++) {
		list += i + 1 + " - " + attendants[i] + "\n";
	}

	if (isSessionOpen) {
		list += "\n=> To attend: /in";
		list += "\n=> To cancel: /out";
	}
	bot.sendMessage(msg.chat.id, list);
};

bot.onText(/^\/open$/, (msg, match) => {
	openFunc(msg);
});

bot.onText(/^\/in$/, (msg, match) => {
	inFunc(msg)
});

bot.onText(/^\/out$/, (msg, match) => {
	outFunc(msg);
});

bot.onText(/^\/inv$/, (msg, match) => {
	inValaFunc(msg)
});

bot.onText(/^\/outv$/, (msg, match) => {
	outValaFunc(msg);
});

bot.onText(/^\/close$/, (msg, match) => {
	closeFunc(msg);
});

bot.onText(/^\/reopen$/, (msg, match) => {
	reopenFunc(msg);
});

bot.onText(/^\/reset$/, (msg, match) => {
	resetFunc(msg);
});

bot.onText(/^\/monday$/, (msg, match) => {
	setMondayFunc(msg);
});

bot.onText(/^\/tuesday$/, (msg, match) => {
	setTuesdayFunc(msg);
});

bot.onText(/^\/wednesday$/, (msg, match) => {
	setWedenesdayFunc(msg);
});

bot.onText(/^\/thursday$/, (msg, match) => {
	setThursdayFunc(msg);
});

bot.onText(/^\/friday$/, (msg, match) => {
	setFridayFunc(msg);
});

bot.onText(/^\/list$/, (msg, match) => {
	listFunc(msg);
});

bot.onText(/^\/open@KLFootballBot$/, (msg, match) => {
	openFunc(msg);
});

bot.onText(/^\/in@KLFootballBot$/, (msg, match) => {
	inFunc(msg)
});

bot.onText(/^\/close@KLFootballBot$/, (msg, match) => {
	closeFunc(msg);
});

bot.onText(/^\/reopen@KLFootballBot$/, (msg, match) => {
	reopenFunc(msg);
});

bot.onText(/^\/out@KLFootballBot$/, (msg, match) => {
	outFunc(msg);
});

bot.onText(/^\/reset@KLFootballBot$/, (msg, match) => {
	resetFunc(msg);
});

bot.onText(/^\/monday@KLFootballBot$/, (msg, match) => {
	setMondayFunc(msg);
});

bot.onText(/^\/tuesday@KLFootballBot$/, (msg, match) => {
	setTuesdayFunc(msg);
});

bot.onText(/^\/wednesday@KLFootballBot$/, (msg, match) => {
	setWedenesdayFunc(msg);
});

bot.onText(/^\/thursday@KLFootballBot$/, (msg, match) => {
	setThursdayFunc(msg);
});

bot.onText(/^\/friday@KLFootballBot$/, (msg, match) => {
	setFridayFunc(msg);
});

bot.onText(/^\/list@KLFootballBot$/, (msg, match) => {
	listFunc(msg);
});

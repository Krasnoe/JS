const filterByType = (type, ...values) => values.filter(value => typeof value === type), // функция с фильтрацией типа value по type

	hideAllResponseBlocks = () => { // объявление функции скрывания элементов
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // объявление переменной, массива из верстки с сообщениями
		responseBlocksArray.forEach(block => block.style.display = 'none'); // скрывание всех элементов с помощью дисплей нан
	}, // окончание функции

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // объявление функции с тремя параметрами
		hideAllResponseBlocks(); // вызов функции скрывания элементов
		document.querySelector(blockSelector).style.display = 'block'; // для блока с выбранным селектором blockSelector дисплей блок
		if (spanSelector) { // если есть spanSelector
			document.querySelector(spanSelector).textContent = msgText; // то у этого spanSelector текст в верстке msgText
		} // окончание условия
	}, // окончание функции

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // функция вывода ошибки

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // функция вывода результата

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // функция вывода отсутствия результата

	tryFilterByType = (type, values) => { // объявление функции фильтрования по типу
		try { // начало конструкции try...catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // объявление переменной, преобразовывающей и объединяющей все элементы массива в одно строковое значение
			const alertMsg = (valuesArray.length) ? // объявление переменной с условием, если у valuesArray есть длина, то 
				`Данные с типом ${type}: ${valuesArray}` : // то alertMsg равен этому сообщению
				`Отсутствуют данные типа ${type}`; // если нет, то этому
			showResults(alertMsg); // вызов функции вывода результата с сообщением переменной alertMsg
		} catch (e) { // конец конструкции try...catch
			showError(`Ошибка: ${e}`); // вызов функции вывода ошибки с параметром ошибки если не отработает try
		} // окончание конструкции try...catch
	}; // окончание функции фильтрования по типу

const filterButton = document.querySelector('#filter-btn'); // объявление кнпки фильтрации

filterButton.addEventListener('click', e => { // навешивание слушателя событий на кнопку фильтрации
	const typeInput = document.querySelector('#type'); // переменная селект
	const dataInput = document.querySelector('#data'); // переменая инпут

	if (dataInput.value === '') { // если значение переменной инпута пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // метод, устанавливающий специальное сообщение
		showNoResults(); // вызов функции вывода отсутствия результата
	} else { // так же
		dataInput.setCustomValidity(''); // пустое специальное сообщение 
		e.preventDefault(); // отключение действия по умолчанию
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); // вызов функции фильтрования по типу, с переменными, без пробелов
	} // окончание условий
}); // окончание функции


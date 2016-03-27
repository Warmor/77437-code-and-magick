var getMessage = function(a, b) {

	var mesage = '';
	var length = 0;
	var sum = 0;

	if (typeof a === 'boolean') {
		if (a) {
			mesage = ('Я попал в ' + b);
		} else {
			mesage = ('Я никуда не попал');
		}
	} else if (typeof a === 'number') {
		mesage = ('Я прыгнул на ' + a * 100 + ' сантиметров');
	} else if (Array.isArray(a) && Array.isArray(b)) {
			for (var i = 0; i < a.length; i++) {
				length = length + a[i] + b[i];
			}
			mesage = 'Я прошёл ' + length + ' метров';
		} else if (Array.isArray(a) && !Array.isArray(b)){
			for (var i = 0; i < a.length; i++) {
				sum += a[i];
			}
			mesage = 'Я прошёл ' + sum + ' шагов';
		}
	}
	return mesage;
};

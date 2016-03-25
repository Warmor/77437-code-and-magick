var getMessage = function(a, b) {
	if (typeof a === 'boolean') {
		if (a) {
			var mesage = ('Я попал в ' + b);
			return mesage;
		} else {
			var mesage = ('Я никуда не попал');
			return mesage;
		}
	} else if (typeof a === 'number') {
			var mesage = ('Я прыгнул на ' + a * 100 + ' сантиметров');
			return mesage;

	} else if (typeof a === 'object') {
			if (typeof b !== 'object') {
				var sum = 0;
				for (var i = a.length - 1; i >= 0; i--) {
					sum += a[i];
				}
				var mesage = 'Я прошёл ' + sum + ' шагов';
				return mesage;
			} else {
					var length = 0;
					for (var i = a.length - 1; i >= 0; i--) {
						length = length + a[i] + b[i];
					}
					var mesage = 'Я прошёл ' + length + ' метров';
					return mesage;
			}
	}
};
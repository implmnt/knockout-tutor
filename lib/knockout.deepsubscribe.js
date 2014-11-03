(function(ko){
	ko.subscribable.fn.deepSubscribe = function(func, event) {
		var f = function(target, func) {
			if (typeof target === 'function') {
				target.deepSubscribe(func, event);
			} else if (typeof target === 'object') {
				var keys = Object.keys(target);
				for (var i in keys) {
					f(target[keys[i]], func);
				}
			}
		};
		this.subscribe && this.subscribe(func, event) 
			&& (this() !== null && f(this(), func));
	}
})(ko);
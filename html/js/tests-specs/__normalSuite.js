describe("$di normal use", function() {
	var EmptyObject = function() {return {a:0,b:0,c:0};};

	/*Dependencies injections specs
	 *Value SHOULD NOT be functions, we do not deals with binding the function call to the object.
	 */
	var sampleSpecs = {
		toto:{
			factory:EmptyObject,
			setup:{
				a:{value:10},
				b:{ref:"titi"}
			}
		},
		titi:{
			factory:EmptyObject,
			setup:{
				a:{value:15},
				c:{value:20},
				d:{ref:"toto"}
			}
		},
		tata:{
			factory:EmptyObject,
			setup:{
				a:[
					{value:15},
					{ref:"titi"},
					{ref:"toto"},
					{value:"Whatever"}
				]
			}
		}
	};
	
	$di().followSpecs(sampleSpecs);

	it("Described object exists", function(){
		expect($di("toto")).not.toBe(undefined);
		expect($di("titi")).not.toBe(undefined);
	});

	it("Value assignation overwrite initialized values", function(){
		expect($di("toto").a).toBe(10);
		expect($di("toto").c).toBe(0);
		expect($di("titi").a).toBe(15);
		expect($di("titi").b).toBe(0);
		expect($di("titi").c).toBe(20);
	});

	it("Reference assignation works", function(){
		expect($di("toto").b).toBe($di("titi"));
		expect($di("titi").d).toBe($di("toto"));
	});

	it("A setup Attribute can be a list (array)", function(){
		var vals = $di("tata").a;
		expect(Array.isArray(vals)).toBe(true);
		expect(typeof(vals)).not.toBe("string");
		expect(vals.length).toBe(4);
		expect(vals[0]).toBe(15);
		expect(vals[1]).toBe($di("titi"));
		expect(vals[2]).toBe($di("toto"));
		expect(vals[3]).toBe("Whatever");
	});
});
/*
$di.js : Sporniket Dependency Injection
***************************************

Usage :
$di().followSpecs(specs)
	Create and wire objects according to the specs.
	
	specs is an object where each property is a spec. The property name will be the object refId.
	
	The specs is an object having the following properties :
	- factory : function to call to instanciate the object.
	- setup : object where each property refers to a property of the object to create.
		The value is an object having either a "value" property for assigning a value, or a 
		"ref" property for referencing another object from the specs.
		For a property that is a list (array), the value is an array of objects (with either "value" or "ref")
		
	Sample (with a sample factory named "EmptyObject")
		function EmptyObject() {return {a:0,b:0,c:0};};

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
	
	
$di(refId)
	Retrieve the referenced object previously created by followSpecs.
	return null if the property does not exists.

DISCLAIMER : this library is not hardened against malicious use !!

*/

var $di__instance = {
	followSpecs:function(specs){
		for(var refId in specs) if (specs.hasOwnProperty(refId)) {
			var objSpec = specs[refId];
			var objSetup = objSpec.setup ;
			var obj = this._retrieveOrCreate(refId, objSpec.factory);
			for (var attribute in objSetup) if (objSetup.hasOwnProperty(attribute)) {
				var attrSpec = objSetup[attribute];
				if ("string" != typeof(attrSpec) && Array.isArray(attrSpec)){
					var list = [] ;
					for(var idx = 0 ; idx < attrSpec.length ; idx++) {
						list[idx] = this._processAttributeSpec(attrSpec[idx], specs);
					}
					obj[attribute] = list ;
				} else {
					obj[attribute] = this._processAttributeSpec(attrSpec, specs);
				}
			}
		}
	},
	_context:{},
	_processAttributeSpec:function(attrSpec, specs){
		if(typeof(attrSpec.ref) != 'undefined') {
			var ref = attrSpec.ref ;
			return this._retrieveOrCreate(ref, specs[ref].factory);
		}
		else if (typeof(attrSpec.value) != 'undefined') {
			return attrSpec.value ;
		}
	},
	_retrieveOrCreate:function(refid,factory) {
		if(typeof(this._context[refid]) == 'undefined') this._context[refid] = factory();
		return this._context[refid];
	}
};

var $di = function() {
	var result = $di__instance ;
	if (0 < arguments.length && (typeof arguments[0] == 'string' || arguments[0] instanceof String)) {
		if ($di__instance._context.hasOwnProperty(arguments[0])) {
			result = $di__instance._context[arguments[0]] ;
		} else {
			result = null ;
		}
	} 
	return result ;
};



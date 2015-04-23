# sdi.js : Sporniket Dependency Injection Javascript library

This implementation use the same principles than the SpringFramework.

```
    Sporniket Dependency Injection Javascript library is free software: 
	you can redistribute it and/or modify it under the terms of the Lesser 
	GNU General Public License as published by the Free Software Foundation, 
	either version 3 of the License, or (at your option) any later version.

    This project is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with this project.  If not, see <http://www.gnu.org/licenses/>.
```

## Usage

Typical usage will looks like the following (assuming the library has already been included) :

```javascript
//...
$di().followSpecs({/*Specifications*/});
//...
$di("myObjectA").doSomething($di("myObjectB").foo, ...) ;
```

## Specification object

### Sample

```javascript
//dummy object factory to give an idea
var EmptyObject = function() {return {a:0,b:0,c:0};};

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
```

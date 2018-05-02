function createJavaObject(jsonData) {
	var convert = {};
	indent = "  ";
	classesArray = [];
	classObj = {};
	try {
		convert = $.parseJSON(jsonData);
		classes = createClasses(convert, "Codebeautify", indent);
		var code = js_beautify(classes, {
			'indent_size' : 1,
			'indent_char' : ' '
		});
		code = code.split("- >").join("->");
		editorResult.setValue(code);
		
	} catch (e) {
		console.log(e);
		editorResult.setValue("Codebeautify Convert to Java Error : \n" + e);
	}
}

function createClass(obj, label, indent) {
	var classText = "public" + " " + "class " + label + " {\n";
	classText = classText + parser(obj, indent) + "\n}";
	classesArray.push(classText);
}

function createClasses(obj, startingLabel, indent) {
	createClass(obj, startingLabel, indent);
	return classesArray.reverse().join("\n");
}

function parser(obj, indent) {
	var output = "";
	var keys = Object.keys(obj);
	var keyNames = [];
	var getterMethods = [];
	var setterMethods = [];
	for (i in keys) {
		keyNames[i] = keys[i][0].toUpperCase() + keys[i].slice(1);
		output += indent;
		switch (typeof obj[keys[i]]) {
		case 'string':
			output += 'private String ' + keys[i];
			output += ";\n";
			getterMethods.push(indent + "public String get" + keyNames[i]
					+ "() {\n" + indent + indent + "return " + keys[i] + ";\n"
					+ indent + "}");
			setterMethods.push(indent + "public void set" + keyNames[i]
					+ "( String " + keys[i] + " ) {\n" + indent + indent
					+ "this." + keys[i] + " = " + keys[i] + ";\n" + indent
					+ "}");
			break;
		case 'number':
			output += 'private float ' + keys[i];
			output += ";\n";
			getterMethods.push(indent + "public float get" + keyNames[i]
					+ "() {\n" + indent + indent + "return " + keys[i] + ";\n"
					+ indent + "}");
			setterMethods.push(indent + "public void set" + keyNames[i]
					+ "( float " + keys[i] + " ) {\n" + indent + indent
					+ "this." + keys[i] + " = " + keys[i] + ";\n" + indent
					+ "}");
			break;
		case 'boolean':
			output += 'private boolean ' + keys[i];
			output += ";\n";
			getterMethods.push(indent + "public boolean get" + keyNames[i]
					+ "() {\n" + indent + indent + "return " + keys[i] + ";\n"
					+ indent + "}");
			setterMethods.push(indent + "public void set" + keyNames[i]
					+ "( boolean " + keys[i] + " ) {\n" + indent + indent
					+ "this." + keys[i] + " = " + keys[i] + ";\n" + indent
					+ "}");
			break;
		default:
			if (obj[keys[i]] instanceof Array) {
				output += 'ArrayList<Object> ' + keys[i]
						+ " = new ArrayList<Object>()" + ";\n";
			} else if (obj[keys[i]] == null || obj[keys[i]] == undefined) {
				output += 'private String ' + keys[i] + " = null";
				output += ";\n";
				getterMethods.push(indent + "public String get" + keyNames[i]
						+ "() {\n" + indent + indent + "return " + keys[i]
						+ ";\n" + indent + "}");
				setterMethods.push(indent + "public void set" + keyNames[i]
						+ "( String " + keys[i] + " ) {\n" + indent + indent
						+ "this." + keys[i] + " = " + keys[i] + ";\n" + indent
						+ "}");
			} else {
				classObj[keyNames[i]] = keyNames[i] + "Object";
				output += keyNames[i] + " " + classObj[keyNames[i]] + ";\n";  
				getterMethods.push(indent + "public " + keyNames[i] + " get"
						+ keyNames[i] + "() {\n" + indent + indent + "return "
						+ classObj[keyNames[i]] + ";\n" + indent + "}");
				setterMethods.push(indent + "public void set" + keyNames[i]
						+ "( " + keyNames[i] + " " + keys[i] + "Object ) {\n"
						+ indent + indent + "this." + classObj[keyNames[i]]
						+ " = " + keys[i] + "Object" + ";\n" + indent + "}");
				createClass(obj[keys[i]], keyNames[i], indent);
			}
		}
	}
	output += "\n\n // Getter Methods \n\n" + getterMethods.join("\n\n")
			+ "\n\n // Setter Methods \n\n" + setterMethods.join("\n\n");
	return output;
}


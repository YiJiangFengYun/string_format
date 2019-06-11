const stringFormat = require("../build")

const format1 = new stringFormat.StringFormat();
const str1 = "This is a %name%";
format1.setFormatValues({
    name: "Apple",
});

console.log(format1.format(str1));

const format2 = new stringFormat.StringFormat();
const str2 = "%a% + %b% = %a + b%";

format2.setFormatValues({
    a: 4,
    b: 5
});

console.log(format2.format(str2));

const format3 = new stringFormat.StringFormat();
const str3 = "%a% * %b% = %a * \\%%.";

format3.setFormatValues({
    a: 4,
    b: 5,
});

console.log(format3.format(str3));
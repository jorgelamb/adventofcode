input.split(",,").map(passport => { var fields = passport.split(/[ ,]/).map(fieldValue => fieldValue.split(":")); return fields.length > 7 || (fields.length == 7 && fields.map(fieldValue => fieldValue[0]).indexOf("cid")==-1) && fields}).reduce((accumulator, currentValue) => { return accumulator + (currentValue?1:0);}, 0);
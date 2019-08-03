function getInput(){
	line=readline();
	if(!line){
		return
	}
	lines=line.split(' ');
	return lines.map(item=>{
		return parseInt(item);
	})
	print(lines);
}

shouzhuoInfo=getInput();
print(shouzhuoInfo[0]+shouzhuo[1]);
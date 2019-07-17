1:[1],
2:[1,3,4],
3:[1,3,5],

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